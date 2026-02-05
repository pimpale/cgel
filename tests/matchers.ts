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
  error?: string;
}

/** Recorded assertion for a test */
export interface RecordedAssertion {
  type: 'grammatical' | 'constituency' | 'pos';
  passed: boolean;
  details?: Record<string, unknown>;
}

/** Constituent Test */
export interface ConstituentTest {
  in: [string, string];
  out: string;
}

/** Has POS Test */
export interface HasPOSTest {
  word: string;
  pos: string;
}

/**
 * Type guard to check if a filter is a ConstituentTest.
 */
function isConstituentTest(filter: ConstituentTest | HasPOSTest): filter is ConstituentTest {
  return 'in' in filter && 'out' in filter;
}

/**
 * Type guard to check if a filter is a HasPOSTest.
 */
function isHasPOSTest(filter: ConstituentTest | HasPOSTest): filter is HasPOSTest {
  return 'word' in filter && 'pos' in filter;
}

/**
 * Parse a sentence and return a result object suitable for matchers.
 * If filters are provided, only trees matching ALL filters are returned.
 */
export function parse(sentence: string, filters?: Array<ConstituentTest | HasPOSTest>): ParseResult {

  try {
    let trees = parseInternal(sentence);

    // Apply filters if provided - keep only trees that match ALL filters
    if (filters && filters.length > 0) {
      trees = trees.filter(tree => {
        return filters.every(filter => {
          if (isConstituentTest(filter)) {
            return checkConstituency(tree, filter.in[0], filter.in[1], filter.out);
          } else if (isHasPOSTest(filter)) {
            return checkPartOfSpeech(tree, filter.word, filter.pos);
          }
          return true;
        });
      });
    }

    return {
      sentence,
      trees,
    };
  } catch (error: any) {
    return {
      sentence,
      trees: [],
      error: error.message,
    };
  }
}

/**
 * Record an assertion to task.meta, accumulating multiple assertions per test.
 */
function recordAssertion(
  task: { meta: Record<string, unknown> } | undefined,
  sentence: string,
  assertion: RecordedAssertion,
  error?: string
) {
  if (!task) return;

  // Set sentence (same for all assertions in a test)
  task.meta.sentence = sentence;
  task.meta.parseCount = assertion.details?.parseCount;

  // Record parse error if present
  if (error) {
    task.meta.error = error;
  }

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
    const { sentence, trees, error } = received;
    const pass = trees.length > 0;

    recordAssertion(this.task as any, sentence, {
      type: 'grammatical',
      passed: this.isNot ? !pass : pass,
      details: { parseCount: trees.length },
    }, error);

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
    { in: constituent, out: excludes }: ConstituentTest
  ) {
    const { sentence, trees, error } = received;

    if (trees.length === 0) {
      recordAssertion(this.task as any, sentence, {
        type: 'constituency',
        passed: false,
        details: { constituent, excludes, parseCount: 0, error: 'no parse' },
      }, error);

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
    }, error);

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
    { word, pos }: HasPOSTest
  ) {
    const { sentence, trees, error } = received;

    if (trees.length === 0) {
      recordAssertion(this.task as any, sentence, {
        type: 'pos',
        passed: false,
        details: { word, pos, parseCount: 0, error: 'no parse' },
      }, error);

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
    }, error);

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
