import { useState, useCallback, useMemo } from 'react';
import nearley from 'nearley';
import { lex, grammar } from '@pimpale/cgel';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DragAndDropCard from './components/DragAndDropCard';
import testResultsJson from '../../test-results.json';

import './style.scss';

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
    assertions?: Array<{
      type: string;
      passed: boolean;
      details?: Record<string, unknown>;
    }>;
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

/** Extract sentences from test results */
function getSentencesFromTests(): Array<{ sentence: string; status: 'passed' | 'failed' }> {
  const sentences: Array<{ sentence: string; status: 'passed' | 'failed' }> = [];
  
  for (const file of testResults.testResults) {
    for (const test of file.assertionResults) {
      // Use meta.sentence if available, otherwise use title
      const sentence = test.meta?.sentence ?? test.title;
      sentences.push({
        sentence,
        status: test.status === 'passed' ? 'passed' : 'failed',
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

// Sentence item with status
interface SentenceItem {
  sentence: string;
  status?: 'passed' | 'failed';
}

// Main App
export default function App() {
  // Initialize sentences from test results
  const initialSentences = useMemo(() => getSentencesFromTests(), []);
  
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<TreeNode[]>([]);
  const [showNulls, setShowNulls] = useState(false);
  const [sentences, setSentences] = useState<SentenceItem[]>(initialSentences);

  const handleExampleClick = (sentence: string) => {
    setInput(sentence);
    setOutput(parseEnglish(sentence));
  };

  const handleAddExample = () => {
    const trimmed = input.trim();
    if (trimmed !== '' && !sentences.some(s => s.sentence === trimmed)) {
      setSentences([...sentences, { sentence: trimmed }]);
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

  // Summary stats
  const summary = useMemo(() => ({
    passed: testResults.numPassedTests,
    failed: testResults.numFailedTests,
    total: testResults.numTotalTests,
  }), []);

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="mb-0">🌳 CGEL Playground</h1>
        <div>
          <span className="badge bg-success me-1">{summary.passed}</span> passed
          <span className="badge bg-danger mx-1">{summary.failed}</span> failed
        </div>
      </div>
      
      <p className="text-muted mb-4">
        Parse English sentences using the Cambridge Grammar of English Language. 
        Press <kbd>Ctrl+Enter</kbd> or click Parse.
      </p>

      <div className="row">
        {/* Left sidebar - sticky sentence list */}
        <div className="col-md-4">
          <div 
            className="position-sticky"
            style={{ top: '1rem' }}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">Sentences</h5>
              {isModified && (
                <button className="btn btn-sm btn-outline-secondary" onClick={handleResetExamples}>
                  Reset
                </button>
              )}
            </div>
            <div 
              className="list-group"
              style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}
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
                    status={item.status}
                  />
                ))}
              </DndProvider>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="col-md-8">
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
              <button className="btn btn-outline-secondary" onClick={handleAddExample}>
                Add to List
              </button>
            )}
            {canDeleteCurrent && (
              <button className="btn btn-outline-danger ms-auto" onClick={handleDeleteCurrentExample}>
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
                  </div>
                )}
                {output.map((tree, i) => (
                  <div key={i} className="mt-3">
                    {output.length > 1 && <h5 className="mb-2">Parse {i + 1}</h5>}
                    <SyntaxTree showNulls={showNulls} tree={tree} />
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
