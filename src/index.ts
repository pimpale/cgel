// CGEL - Cambridge Grammar of English Language Parser
// Main entry point

// Export the lexer
export { lex } from './englishLexer';

// Export the grammar (compiled nearley grammar)
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - Generated JS file without type declarations
export { default as grammar } from './englishGrammar.js';

// Export the lexicon (word -> part-of-speech mappings)
import lexicon from './english.json';
export { lexicon };

// Type for the lexicon structure
export type Lexicon = Record<string, string[]>;

// ---------------------------------------------------------------------------
// Parse-tree identity
// ---------------------------------------------------------------------------

/** Minimal structural shape of a parse-tree node (matches the parser output). */
export interface ParseTreeNode {
  kind: string;
  children: ParseTreeNode[] | string | null;
}

/** Canonical, deterministic serialization of a parse tree. */
function serializeTree(node: ParseTreeNode): string {
  const { kind, children } = node;
  if (typeof children === 'string') return `${kind}=${children}`;
  if (children == null) return `${kind}~`;
  return `${kind}[${children.map(serializeTree).join('|')}]`;
}

/** cyrb53 string hash — fast, well-distributed, returns a 53-bit number. */
function cyrb53(str: string, seed = 0): number {
  let h1 = 0xdeadbeef ^ seed;
  let h2 = 0x41c6ce57 ^ seed;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}

/**
 * A stable identity for a parse tree: a short hash of its canonical
 * serialization. Structurally identical trees get the same id regardless of
 * their position in the parse list, so test-time survivors can be matched to
 * the playground's re-parsed trees by identity rather than by fragile index.
 */
export function treeId(node: ParseTreeNode): string {
  return cyrb53(serializeTree(node)).toString(36);
}
