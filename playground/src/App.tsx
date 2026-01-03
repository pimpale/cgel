import React, { useState, useCallback } from 'react';
import nearley from 'nearley';
import { lex, grammar } from '@pimpale/cgel';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DragAndDropCard from './components/DragAndDropCard';

type TreeNode = {
  kind: string;
  children: TreeNode[] | string;
};

function parseEnglish(input: string): TreeNode[] {
  try {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
    const tokens = lex(input);
    console.log('Tokens:', tokens);
    parser.feed(tokens as unknown as string);
    console.log('Parse results:', parser.results);
    return parser.results as TreeNode[];
  } catch (error) {
    console.error('Error parsing sentence:', error);
    return [];
  }
}

const INITIAL_EXAMPLE_SENTENCES = [
  "Who are you?",
  "I know that you like cheese.",
  "She walked to the store.",
  "I went to the garden and played with the dog.",
  "John and Mary went to the park yesterday.",
  "The book that I read was very interesting.",
  "Running through the forest, he felt free.",
  "The teacher explained the concept clearly to the students.",
  "After the rain stopped, the sun emerged.",
  "The old house on the hill looked mysterious.",
  "They were playing tennis when it started to rain.",
  "She hasn't yet contacted the people whose house she wants to rent.",
  "The horse raced past the barn fell.",
  "I was given a book by the old man.",
  "What I was mailed was quite interesting.",
  "Who was this letter sent to?",
  "The book that I was recommended by my professor turned out to be excellent.",
  "Which student was the scholarship awarded to?",
  "It was Mary who was chosen by the committee.",
  "The issue was talked about at length.",
];

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
        <rect x={x} y={y} width={this_width * CHAR_WIDTH} height="40" fill="#0d6efd" />
      ) : (
        children.map((child, i) => (
          <SyntaxTreeSvg key={i} node={child} depth={depth + 1} maxdepth={maxdepth} parent_loc={{ x: line_x, y: line_y }} />
        ))
      )}
      <text x={x} y={y + 30} fill="currentColor">{kind}</text>
      {parent_loc && (
        <line x1={line_x} y1={line_y - 10} x2={parent_loc.x} y2={parent_loc.y + 15} stroke="#0d6efd" />
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

// Main App
export default function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<TreeNode[]>([]);
  const [showNulls, setShowNulls] = useState(false);
  const [exampleSentences, setExampleSentences] = useState<string[]>(INITIAL_EXAMPLE_SENTENCES);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey && e.key === 'Enter') {
      setOutput(parseEnglish(input));
    }
  };

  const handleExampleClick = (sentence: string) => {
    setInput(sentence);
    setOutput(parseEnglish(sentence));
  };

  const handleAddExample = () => {
    const trimmed = input.trim();
    if (trimmed !== '' && !exampleSentences.includes(trimmed)) {
      setExampleSentences([...exampleSentences, trimmed]);
    }
  };

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setExampleSentences((prevCards) => {
      const newCards = [...prevCards];
      const [removed] = newCards.splice(dragIndex, 1);
      newCards.splice(hoverIndex, 0, removed);
      return newCards;
    });
  }, []);

  const handleDeleteCurrentExample = () => {
    const trimmed = input.trim();
    if (trimmed !== '' && exampleSentences.includes(trimmed)) {
      setExampleSentences(exampleSentences.filter((s) => s !== trimmed));
    }
  };

  const handleResetExamples = () => {
    setExampleSentences(INITIAL_EXAMPLE_SENTENCES);
  };

  const isModified =
    exampleSentences.length !== INITIAL_EXAMPLE_SENTENCES.length ||
    exampleSentences.some((s, i) => s !== INITIAL_EXAMPLE_SENTENCES[i]);

  const canDeleteCurrent = input.trim() !== '' && exampleSentences.includes(input.trim());

  return (
    <div className="container-fluid py-4">
      <h1 className="mb-4">🌳 CGEL Playground</h1>
      <p className="text-muted mb-4">
        Parse English sentences using the Cambridge Grammar of English Language. 
        Press <kbd>Ctrl+Enter</kbd> or click Parse.
      </p>

      <div className="row">
        <div className="col-md-3">
          <h5 className="mb-3 d-flex justify-content-between align-items-center">
            <span>Example Sentences</span>
            {isModified && (
              <button className="btn btn-sm btn-secondary" onClick={handleResetExamples}>
                Reset
              </button>
            )}
          </h5>
          <div style={{ maxHeight: '70vh', overflowY: 'auto' }}>
            <div className="list-group">
              <DndProvider backend={HTML5Backend}>
                {exampleSentences.map((sentence, index) => (
                  <DragAndDropCard
                    key={sentence}
                    id={sentence}
                    index={index}
                    text={sentence}
                    moveCard={moveCard}
                    onClick={() => handleExampleClick(sentence)}
                    isActive={sentence === input}
                  />
                ))}
              </DndProvider>
            </div>
          </div>
        </div>

        <div className="col-md-9">
          <textarea
            className="form-control"
            style={{ width: '100%', height: '150px', fontFamily: 'monospace' }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter a sentence to parse..."
          />

          <div className="mt-2 d-flex align-items-start gap-2">
            <button className="btn btn-primary" onClick={() => setOutput(parseEnglish(input))}>
              Parse
            </button>
            {input.trim() !== '' && !exampleSentences.includes(input.trim()) && (
              <button className="btn btn-outline-secondary" onClick={handleAddExample}>
                Add to Examples
              </button>
            )}
            {canDeleteCurrent && (
              <button className="btn btn-outline-danger ms-auto" onClick={handleDeleteCurrentExample}>
                Delete Example
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
                No parse results yet. Enter a sentence and click Parse.
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
