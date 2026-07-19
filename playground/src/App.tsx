import { useState, useCallback, useMemo } from 'react';
import { Group, Panel, Separator, useDefaultLayout } from 'react-resizable-panels';
import nearley from 'nearley';
import { lex, grammar, treeId } from '@pimpale/cgel';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DragAndDropCard from './components/DragAndDropCard';
import testResultsJson from '../test-results.json';

import './style.scss';

/** Recorded assertion from vitest matchers */
interface RecordedAssertion {
  type: string;
  passed: boolean;
  details?: Record<string, unknown>;
}

/** Test result from vitest JSON output */
interface AssertionResult {
  ancestorTitles: string[];
  fullName: string;
  status: 'passed' | 'failed' | 'pending';
  title: string;
  duration: number;
  failureMessages: string[];
  meta?: {
    sentence?: string;
    parseCount?: number;
    assertions?: RecordedAssertion[];
    error?: string;
    /** True if this test is a documented known limitation (see knownLimitation()) */
    knownLimitation?: boolean;
    /** Total number of parses the sentence had at test time */
    treeCount?: number;
    /** Indices (into the test-time parse list) of parses satisfying every assertion */
    survivingIndices?: number[];
    /** Structural ids of the surviving parses (order-independent matching) */
    survivingTreeIds?: string[];
  };
}

interface TestFileResult {
  assertionResults: AssertionResult[];
  name: string;
}

interface VitestJsonOutput {
  numPassedTests: number;
  numFailedTests: number;
  numTotalTests: number;
  testResults: TestFileResult[];
}

const testResults = testResultsJson as VitestJsonOutput;

type TreeNode = {
  kind: string;
  children: TreeNode[] | string;
};

function parseEnglish(input: string): TreeNode[] {
  try {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
    const tokens = lex(input);
    parser.feed(tokens as unknown as string);
    return parser.results as TreeNode[];
  } catch (error) {
    console.error('Error parsing sentence:', error);
    return [];
  }
}

// Sentence item with assertions
interface SentenceItem {
  sentence: string;
  assertions?: RecordedAssertion[];
  passedCount: number;
  totalCount: number;
  /** True if testing for ungrammaticality (sentence should NOT parse) */
  isUngrammatical?: boolean;
  /** Parse error message if parsing failed */
  error?: string;
  /** True if this is a documented known limitation (rendered blue when passing, yellow when failing) */
  knownLimitation?: boolean;
  /** Total parses at test time */
  treeCount?: number;
  /** Structural ids of parses that satisfied every assertion (the "surviving" set) */
  survivingTreeIds?: string[];
}

/** Extract sentences from test results */
function getSentencesFromTests(): SentenceItem[] {
  const sentences: SentenceItem[] = [];
  
  for (const file of testResults.testResults) {
    for (const test of file.assertionResults) {
      const sentence = test.meta?.sentence ?? test.title;
      const assertions = test.meta?.assertions ?? [];
      const passedCount = assertions.filter(a => a.passed).length;
      const totalCount = assertions.length;
      const error = test.meta?.error;
      
      // Detect ungrammaticality test: grammatical assertion passes with parseCount: 0
      const grammaticalAssertion = assertions.find(a => a.type === 'grammatical');
      const isUngrammatical = grammaticalAssertion?.passed && 
        grammaticalAssertion?.details?.parseCount === 0;
      
      sentences.push({
        sentence,
        assertions,
        passedCount,
        totalCount,
        isUngrammatical,
        error,
        knownLimitation: test.meta?.knownLimitation,
        treeCount: test.meta?.treeCount,
        survivingTreeIds: test.meta?.survivingTreeIds,
      });
    }
  }
  
  return sentences;
}

// Tree visualization
type AugmentedTreeNode = {
  kind: string;
  width: number;
  this_width: number;
  l_offset: number;
  depth: number;
  children: AugmentedTreeNode[];
};

function pruneTree(node: TreeNode, showNulls: boolean): TreeNode | null {
  if (typeof node.children === 'string') {
    return node;
  }
  if (node.children == null) {
    if (showNulls) {
      return { kind: node.kind, children: '<null>' };
    }
    return null;
  }
  const children = node.children
    .map((child) => pruneTree(child, showNulls))
    .filter((child): child is TreeNode => child !== null);
  if (children.length === 0) {
    if (showNulls) {
      return { kind: node.kind, children: '<empty list>' };
    }
    return null;
  }
  return { kind: node.kind, children };
}

function augmentNode(node: TreeNode | string, depth: number, l_offset: number): AugmentedTreeNode {
  if (typeof node === 'string') {
    return {
      kind: node,
      width: node.length,
      this_width: node.length,
      children: [],
      depth,
      l_offset,
    };
  }
  const children: AugmentedTreeNode[] = [];
  let curr_child_width = 0;
  const node_children = typeof node.children === 'string' ? [node.children] : node.children;
  for (const child of node_children) {
    const child_node = augmentNode(child, depth + 1, l_offset + curr_child_width);
    children.push(child_node);
    curr_child_width += child_node.width;
  }
  const this_width = node.kind.length;
  const width = Math.max(curr_child_width, this_width);
  const maxdepth = children.reduce((acc, child) => Math.max(acc, child.depth), depth);
  return { kind: node.kind, width, this_width, children, depth: maxdepth, l_offset };
}

const LEVEL_DEPTH = 50;
const CHAR_WIDTH = 10;

type SyntaxTreeSvgProps = {
  depth: number;
  maxdepth: number;
  node: AugmentedTreeNode;
  parent_loc: { x: number; y: number } | null;
};

function SyntaxTreeSvg({ depth, maxdepth, node, parent_loc }: SyntaxTreeSvgProps) {
  const { kind, this_width, width, children, l_offset } = node;
  const center_x = l_offset + width / 2 - this_width / 2;
  const this_depth = children.length === 0 ? maxdepth : depth;
  const x = center_x * CHAR_WIDTH;
  const y = this_depth * LEVEL_DEPTH;
  const line_x = (l_offset + width / 2) * CHAR_WIDTH;
  const line_y = this_depth * LEVEL_DEPTH + 20;

  return (
    <>
      {children.length === 0 ? (
        <rect x={x} y={y} width={this_width * CHAR_WIDTH} height="40" fill="var(--bs-blue)" />
      ) : (
        children.map((child, i) => (
          <SyntaxTreeSvg key={i} node={child} depth={depth + 1} maxdepth={maxdepth} parent_loc={{ x: line_x, y: line_y }} />
        ))
      )}
      <text x={x} y={y + 30} fill="currentColor">{kind}</text>
      {parent_loc && (
        <line x1={line_x} y1={line_y - 10} x2={parent_loc.x} y2={parent_loc.y + 15} stroke="var(--bs-blue)" />
      )}
    </>
  );
}

function SyntaxTree({ showNulls, tree }: { showNulls: boolean; tree: TreeNode }) {
  const prunedTree = pruneTree(tree, showNulls);
  if (prunedTree === null) {
    return <div>Empty tree</div>;
  }
  const augmentedTree = augmentNode(prunedTree, 0, 0);
  return (
    <div style={{ paddingTop: '2em', overflowX: 'auto' }}>
      <svg width={(augmentedTree.width + 1) * CHAR_WIDTH} height={(augmentedTree.depth + 1) * LEVEL_DEPTH}>
        <SyntaxTreeSvg node={augmentedTree} depth={0} maxdepth={augmentedTree.depth} parent_loc={null} />
      </svg>
    </div>
  );
}

/**
 * Styled resize separator. `orientation` is the parent Group's orientation:
 * a horizontal group needs a vertical bar (col-resize), and vice versa.
 */
function ResizeHandle({ orientation }: { orientation: 'horizontal' | 'vertical' }) {
  const isHorizontal = orientation === 'horizontal';
  return (
    <Separator
      className="cgel-resize-handle"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: isHorizontal ? 'col-resize' : 'row-resize',
        ...(isHorizontal ? { width: 12, alignSelf: 'stretch' } : { height: 12, width: '100%' }),
      }}
    >
      <div className="cgel-resize-grip" style={isHorizontal ? { width: 3, height: 32 } : { height: 3, width: 32 }} />
    </Separator>
  );
}

// Main App
export default function App() {
  // Initialize sentences from test results
  const initialSentences = useMemo(() => getSentencesFromTests(), []);
  
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<TreeNode[]>([]);
  const [showNulls, setShowNulls] = useState(false);
  const [sentences, setSentences] = useState<SentenceItem[]>(initialSentences);

  // Find the active sentence item (for showing assertions)
  const activeSentenceItem = useMemo(() => {
    return sentences.find(s => s.sentence === input);
  }, [sentences, input]);

  // Structural ids of the parses that satisfied every test assertion, so we can
  // highlight exactly those in the tree list below. Null when the sentence has
  // no recorded test (e.g. a user-typed one), in which case nothing is dimmed.
  const survivingSet = useMemo(
    () => activeSentenceItem?.survivingTreeIds
      ? new Set(activeSentenceItem.survivingTreeIds)
      : null,
    [activeSentenceItem]
  );

  const handleExampleClick = (sentence: string) => {
    setInput(sentence);
    setOutput(parseEnglish(sentence));
  };

  const handleAddExample = () => {
    const trimmed = input.trim();
    if (trimmed !== '' && !sentences.some(s => s.sentence === trimmed)) {
      setSentences([...sentences, { sentence: trimmed, passedCount: 0, totalCount: 0 }]);
    }
  };

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setSentences((prevCards) => {
      const newCards = [...prevCards];
      const [removed] = newCards.splice(dragIndex, 1);
      newCards.splice(hoverIndex, 0, removed);
      return newCards;
    });
  }, []);

  const handleDeleteCurrentExample = () => {
    const trimmed = input.trim();
    if (trimmed !== '') {
      setSentences(sentences.filter((s) => s.sentence !== trimmed));
    }
  };

  const handleResetExamples = () => {
    setSentences(initialSentences);
  };

  const isModified = useMemo(() => {
    if (sentences.length !== initialSentences.length) return true;
    return sentences.some((s, i) => s.sentence !== initialSentences[i]?.sentence);
  }, [sentences, initialSentences]);

  const canDeleteCurrent = input.trim() !== '' && sentences.some(s => s.sentence === input.trim());

  // Persist each split's layout in localStorage across reloads.
  const mainLayout = useDefaultLayout({ id: 'cgel-main', panelIds: ['sidebar', 'main'], storage: localStorage });
  const sidebarLayout = useDefaultLayout({ id: 'cgel-sidebar', panelIds: ['sentences', 'assertions'], storage: localStorage });

  // Summary stats. Known-limitation tests use `test.fails`, so a *standing*
  // limitation reports as vitest-"passed" (its assertion still fails) while a
  // *fixed* one reports as vitest-"failed" (nagging you to promote it). We pull
  // standing limitations out of the passed count and surface them separately.
  const summary = useMemo(() => {
    let knownLimitations = 0;
    for (const file of testResults.testResults) {
      for (const test of file.assertionResults) {
        if (test.meta?.knownLimitation && test.status === 'passed') {
          knownLimitations += 1;
        }
      }
    }
    return {
      passed: testResults.numPassedTests - knownLimitations,
      failed: testResults.numFailedTests,
      knownLimitations,
      total: testResults.numTotalTests,
    };
  }, []);

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="mb-0">🌳 CGEL Playground</h1>
        <div>
          <span className="badge bg-success me-1">{summary.passed}</span> passed
          <span className="badge bg-danger mx-1">{summary.failed}</span> failed
          <span className="badge bg-warning text-dark ms-1">{summary.knownLimitations}</span> known limitations
        </div>
      </div>
      
      <p className="text-muted mb-4">
        Parse English sentences using the Cambridge Grammar of English Language. 
        Press <kbd>Ctrl+Enter</kbd> or click Parse.
      </p>

      <Group
        orientation="horizontal"
        id="cgel-main"
        style={{ height: 'calc(100vh - 180px)' }}
        defaultLayout={mainLayout.defaultLayout}
        onLayoutChanged={mainLayout.onLayoutChanged}
      >
        {/* Left sidebar - itself a vertical split of sentences / assertions */}
        <Panel id="sidebar" defaultSize="33%" minSize="15%">
          <Group
            orientation="vertical"
            id="cgel-sidebar"
            style={{ height: '100%' }}
            defaultLayout={sidebarLayout.defaultLayout}
            onLayoutChanged={sidebarLayout.onLayoutChanged}
          >
            {/* Top: Sentence list */}
            <Panel id="sentences" defaultSize="60%" minSize="15%">
              <div className="d-flex flex-column h-100" style={{ minHeight: 0, paddingRight: '0.5rem' }}>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="mb-0">Sentences</h5>
                {isModified && (
                  <button className="btn btn-sm btn-secondary" onClick={handleResetExamples}>
                    Reset
                  </button>
                )}
              </div>
              <div 
                className="list-group flex-grow-1"
                style={{ overflowY: 'auto', minHeight: 0 }}
              >
                <DndProvider backend={HTML5Backend}>
                  {sentences.map((item, index) => (
                    <DragAndDropCard
                      key={`${item.sentence}-${index}`}
                      id={item.sentence}
                      index={index}
                      text={item.sentence}
                      moveCard={moveCard}
                      onClick={() => handleExampleClick(item.sentence)}
                      isActive={item.sentence === input}
                      passedCount={item.passedCount}
                      totalCount={item.totalCount}
                      isUngrammatical={item.isUngrammatical}
                      knownLimitation={item.knownLimitation}
                    />
                  ))}
                </DndProvider>
              </div>
              </div>
            </Panel>

            <ResizeHandle orientation="vertical" />

            {/* Bottom: Assertions for active sentence */}
            <Panel id="assertions" defaultSize="40%" minSize="10%">
              <div className="d-flex flex-column h-100" style={{ minHeight: 0, paddingTop: '0.5rem', paddingRight: '0.5rem' }}>
                <h6 className="mb-2">Assertions</h6>
                <div
                  className="rounded p-2 border flex-grow-1"
                  style={{
                    overflowY: 'auto',
                    minHeight: 0,
                    fontSize: '0.8em',
                  }}
                >
                {activeSentenceItem?.error && (
                  <div className="alert alert-danger mb-2 p-2" style={{ fontSize: '0.9em' }}>
                    <strong>Parse Error:</strong>
                    <div style={{ whiteSpace: 'pre-wrap' }}>{activeSentenceItem.error}</div>
                  </div>
                )}
                {activeSentenceItem?.assertions && activeSentenceItem.assertions.length > 0 ? (
                  <pre className="mb-0" style={{ whiteSpace: 'pre-wrap' }}>
                    {JSON.stringify(activeSentenceItem.assertions, null, 2)}
                  </pre>
                ) : (
                  <span className="text-muted">
                    {input ? 'No assertions for this sentence' : 'Select a sentence to see assertions'}
                  </span>
                )}
              </div>
            </div>
            </Panel>
          </Group>
        </Panel>

        <ResizeHandle orientation="horizontal" />

        {/* Main content */}
        <Panel id="main" minSize="30%">
          <div className="h-100" style={{ overflowY: 'auto', paddingLeft: '0.75rem' }}>
          <textarea
            className="form-control"
            style={{ width: '100%', height: '120px', fontFamily: 'monospace' }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.ctrlKey && e.key === 'Enter') {
                setOutput(parseEnglish(input));
              }
            }}
            placeholder="Enter a sentence to parse..."
          />

          <div className="mt-2 d-flex align-items-start gap-2">
            <button className="btn btn-primary" onClick={() => setOutput(parseEnglish(input))}>
              Parse
            </button>
            {input.trim() !== '' && !sentences.some(s => s.sentence === input.trim()) && (
              <button className="btn btn-secondary" onClick={handleAddExample}>
                Add to List
              </button>
            )}
            {canDeleteCurrent && (
              <button className="btn btn-danger ms-auto" onClick={handleDeleteCurrentExample}>
                Remove
              </button>
            )}
          </div>

          <div className="form-check mt-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="showNullsCheckbox"
              checked={showNulls}
              onChange={() => setShowNulls((prev) => !prev)}
            />
            <label className="form-check-label" htmlFor="showNullsCheckbox">
              Show Nulls
            </label>
          </div>

          <div className="mt-4">
            {output.length === 0 ? (
              <div className="alert alert-secondary">
                No parse results yet. Select a sentence or enter one and click Parse.
              </div>
            ) : (
              <>
                {output.length > 1 && (
                  <div className="alert alert-warning">
                    ⚠️ This sentence has {output.length} possible parses (ambiguous).
                    {survivingSet && survivingSet.size < output.length && (
                      <> {survivingSet.size} of them satisfy every test assertion (highlighted below).</>
                    )}
                  </div>
                )}
                {output.map((tree, i) => {
                  // Match this re-parsed tree to the test-time survivors by identity.
                  const surviving = survivingSet ? survivingSet.has(treeId(tree)) : null;
                  return (
                    <div
                      key={i}
                      className={`mt-3 p-2 rounded ${surviving === true ? 'border border-success border-2' : ''}`}
                      style={surviving === false ? { opacity: 0.45 } : undefined}
                    >
                      {output.length > 1 && (
                        <h5 className="mb-2 d-flex align-items-center gap-2">
                          <span>Parse {i + 1}</span>
                          {surviving === true && <span className="badge bg-success">satisfies assertions</span>}
                          {surviving === false && <span className="badge bg-secondary">excluded by assertions</span>}
                        </h5>
                      )}
                      <SyntaxTree showNulls={showNulls} tree={tree} />
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
        </Panel>
      </Group>
    </div>
  );
}
