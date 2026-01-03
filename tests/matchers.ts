/**
 * Custom Vitest matchers for CGEL grammar testing.
 * 
 * These matchers provide semantic assertions and record metadata
 * via task.meta for visualization in the playground.
 */

import { expect } from 'vitest';
import { 
  parse as parseInternal, 
  checkConstituency, 
  checkPartOfSpeech,
  type TreeNode 
} from './helpers';

/** Result of parsing a sentence, including the original sentence for metadata */
export interface ParseResult {
  sentence: string;
  trees: TreeNode[];
}

/** Recorded assertion for a test */
export interface RecordedAssertion {
  type: 'grammatical' | 'constituency' | 'pos';
  passed: boolean;
  details?: Record<string, unknown>;
}

/**
 * Parse a sentence and return a result object suitable for matchers.
 */
export function parse(sentence: string): ParseResult {
  return {
    sentence,
    trees: parseInternal(sentence),
  };
}

/**
 * Record an assertion to task.meta, accumulating multiple assertions per test.
 */
function recordAssertion(
  task: { meta: Record<string, unknown> } | undefined,
  sentence: string,
  assertion: RecordedAssertion
) {
  if (!task) return;
  
  // Set sentence (same for all assertions in a test)
  task.meta.sentence = sentence;
  task.meta.parseCount = assertion.details?.parseCount;
  
  // Accumulate assertions in an array
  if (!task.meta.assertions) {
    task.meta.assertions = [];
  }
  (task.meta.assertions as RecordedAssertion[]).push(assertion);
}

// Extend Vitest's expect with custom matchers
expect.extend({
  /**
   * Assert that the sentence parses successfully (is grammatical).
   * Use `.not.toBeGrammatical()` to assert ungrammaticality.
   */
  toBeGrammatical(received: ParseResult) {
    const { sentence, trees } = received;
    const pass = trees.length > 0;

    recordAssertion(this.task as any, sentence, {
      type: 'grammatical',
      passed: this.isNot ? !pass : pass,
      details: { parseCount: trees.length },
    });

    return {
      pass,
      message: () => pass
        ? `Expected "${sentence}" not to parse, but got ${trees.length} parse(s)`
        : `Expected "${sentence}" to parse, but it didn't`,
      actual: trees.length,
      expected: '>0 parses',
    };
  },

  /**
   * Assert that two words form a constituent that excludes a third word.
   * 
   * @example
   * expect(result).toHaveConstituent({ in: ['the', 'book'], out: 'read' })
   */
  toHaveConstituent(
    received: ParseResult, 
    { in: constituent, out: excludes }: { in: [string, string]; out: string }
  ) {
    const { sentence, trees } = received;

    if (trees.length === 0) {
      recordAssertion(this.task as any, sentence, {
        type: 'constituency',
        passed: false,
        details: { constituent, excludes, parseCount: 0, error: 'no parse' },
      });

      return {
        pass: false,
        message: () => `Cannot check constituency: "${sentence}" did not parse`,
        actual: 'no parse',
        expected: `"${constituent[0]}" and "${constituent[1]}" form constituent excluding "${excludes}"`,
      };
    }

    // Check if ANY parse satisfies the constituency requirement
    const pass = trees.some(tree =>
      checkConstituency(tree, constituent[0], constituent[1], excludes)
    );

    recordAssertion(this.task as any, sentence, {
      type: 'constituency',
      passed: this.isNot ? !pass : pass,
      details: { constituent, excludes, parseCount: trees.length },
    });

    return {
      pass,
      message: () => pass
        ? `Expected "${constituent[0]}" and "${constituent[1]}" NOT to form a constituent excluding "${excludes}"`
        : `Expected "${constituent[0]}" and "${constituent[1]}" to form a constituent excluding "${excludes}"`,
      actual: pass ? 'forms constituent' : 'does not form constituent',
      expected: `"${constituent[0]}" + "${constituent[1]}" excluding "${excludes}"`,
    };
  },

  /**
   * Assert that a word in the sentence has a specific part of speech.
   * 
   * @example
   * expect(result).toHavePOS({ word: 'ran', pos: 'V' })
   */
  toHavePOS(
    received: ParseResult,
    { word, pos }: { word: string; pos: string }
  ) {
    const { sentence, trees } = received;

    if (trees.length === 0) {
      recordAssertion(this.task as any, sentence, {
        type: 'pos',
        passed: false,
        details: { word, pos, parseCount: 0, error: 'no parse' },
      });

      return {
        pass: false,
        message: () => `Cannot check POS: "${sentence}" did not parse`,
        actual: 'no parse',
        expected: `"${word}" to be "${pos}"`,
      };
    }

    // Check if ANY parse has the expected POS
    const pass = trees.some(tree => checkPartOfSpeech(tree, word, pos));

    recordAssertion(this.task as any, sentence, {
      type: 'pos',
      passed: this.isNot ? !pass : pass,
      details: { word, pos, parseCount: trees.length },
    });

    return {
      pass,
      message: () => pass
        ? `Expected "${word}" NOT to be parsed as "${pos}"`
        : `Expected "${word}" to be parsed as "${pos}"`,
      actual: pass ? pos : 'different POS',
      expected: pos,
    };
  },
});
