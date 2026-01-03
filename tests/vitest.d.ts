import 'vitest';

interface CustomMatchers<R = unknown> {
  /**
   * Assert that the sentence parses successfully (is grammatical).
   * Use `.not.toBeGrammatical()` to assert ungrammaticality.
   */
  toBeGrammatical(): R;
  
  /**
   * Assert that two words form a constituent that excludes a third word.
   * @example expect(result).toHaveConstituent({ in: ['the', 'book'], out: 'read' })
   */
  toHaveConstituent(opts: { in: [string, string]; out: string }): R;
  
  /**
   * Assert that a word in the sentence has a specific part of speech.
   * @example expect(result).toHavePOS({ word: 'ran', pos: 'V' })
   */
  toHavePOS(opts: { word: string; pos: string }): R;
}

declare module 'vitest' {
  interface Matchers<T = unknown> extends CustomMatchers<T> {}
}
