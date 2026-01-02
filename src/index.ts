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
