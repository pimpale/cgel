/**
 * Test helper functions for CGEL grammar testing.
 */

import nearley from 'nearley';
import { lex, grammar } from '../src/index';

/** Tree node structure from the parser */
export type TreeNode = {
  kind: string;
  children: TreeNode[] | string | null;
};

/**
 * Parse a sentence and return all possible parse trees.
 */
export function parse(sentence: string): TreeNode[] {
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
  const tokens = lex(sentence);
  parser.feed(tokens as unknown as string);
  return parser.results as TreeNode[];
}

/**
 * Parse a word reference like "word" or "word:index" to extract word and optional index.
 */
function parseWordRef(ref: string): { word: string; index?: number } {
  const parts = ref.split(':');
  if (parts.length === 2) {
    return { word: parts[0].toLowerCase(), index: parseInt(parts[1], 10) };
  }
  return { word: ref.toLowerCase() };
}

/**
 * Find all leaf nodes (terminal words) in a parse tree.
 */
function findLeaves(node: TreeNode): { word: string; path: TreeNode[] }[] {
  const results: { word: string; path: TreeNode[] }[] = [];
  
  function traverse(n: TreeNode, path: TreeNode[]) {
    const currentPath = [...path, n];
    
    if (typeof n.children === 'string') {
      results.push({ word: n.children.toLowerCase(), path: currentPath });
    } else if (n.children) {
      for (const child of n.children) {
        traverse(child, currentPath);
      }
    }
  }
  
  traverse(node, []);
  return results;
}

/**
 * Find the lowest common ancestor of two paths in the tree.
 */
function findLCA(path1: TreeNode[], path2: TreeNode[]): TreeNode | null {
  let lca: TreeNode | null = null;
  const minLen = Math.min(path1.length, path2.length);
  
  for (let i = 0; i < minLen; i++) {
    if (path1[i] === path2[i]) {
      lca = path1[i];
    } else {
      break;
    }
  }
  
  return lca;
}

/**
 * Check if a node is an ancestor of another node in a given path.
 */
function isAncestorInPath(ancestor: TreeNode, path: TreeNode[]): boolean {
  return path.includes(ancestor);
}

/**
 * Test constituency: check if two words form a constituent that excludes a third.
 * Returns true if word1 and word2 have a lowest common ancestor that does NOT
 * include word3 as a descendant.
 */
export function checkConstituency(
  tree: TreeNode,
  word1Ref: string,
  word2Ref: string,
  excludesRef: string
): boolean {
  const leaves = findLeaves(tree);
  
  const word1 = parseWordRef(word1Ref);
  const word2 = parseWordRef(word2Ref);
  const excludes = parseWordRef(excludesRef);
  
  // Find matching leaves for each word
  const word1Leaves = leaves.filter((l, i) => 
    l.word === word1.word && (word1.index === undefined || 
      leaves.slice(0, i + 1).filter(x => x.word === word1.word).length - 1 === word1.index)
  );
  const word2Leaves = leaves.filter((l, i) => 
    l.word === word2.word && (word2.index === undefined ||
      leaves.slice(0, i + 1).filter(x => x.word === word2.word).length - 1 === word2.index)
  );
  const excludesLeaves = leaves.filter((l, i) => 
    l.word === excludes.word && (excludes.index === undefined ||
      leaves.slice(0, i + 1).filter(x => x.word === excludes.word).length - 1 === excludes.index)
  );
  
  if (word1Leaves.length === 0 || word2Leaves.length === 0 || excludesLeaves.length === 0) {
    return false;
  }
  
  // Check if there's any combination where the LCA of word1 and word2 
  // does NOT contain the excluded word
  for (const leaf1 of word1Leaves) {
    for (const leaf2 of word2Leaves) {
      const lca = findLCA(leaf1.path, leaf2.path);
      if (!lca) continue;
      
      // Check that none of the excluded word leaves are under this LCA
      const allExcluded = excludesLeaves.every(excludeLeaf => 
        !isAncestorInPath(lca, excludeLeaf.path)
      );
      
      if (allExcluded) {
        return true;
      }
    }
  }
  
  return false;
}

/**
 * Check if a word has a specific part of speech in the parse tree.
 * Looks at the parent node's `kind` to determine POS.
 */
export function checkPartOfSpeech(
  tree: TreeNode,
  wordRef: string,
  expectedPOS: string
): boolean {
  const leaves = findLeaves(tree);
  const { word, index } = parseWordRef(wordRef);
  
  // Find matching leaves
  const matchingLeaves = leaves.filter((l, i) => 
    l.word === word && (index === undefined ||
      leaves.slice(0, i + 1).filter(x => x.word === word).length - 1 === index)
  );
  
  // Check if any matching leaf has the expected POS as its immediate parent's kind
  for (const leaf of matchingLeaves) {
    // The path includes the leaf itself, so parent is path[path.length - 2]
    // But the leaf node itself has a kind, check that first
    const leafNode = leaf.path[leaf.path.length - 1];
    if (leafNode.kind === expectedPOS) {
      return true;
    }
    
    // Also check parent
    if (leaf.path.length >= 2) {
      const parent = leaf.path[leaf.path.length - 2];
      if (parent.kind === expectedPOS) {
        return true;
      }
    }
  }
  
  return false;
}
