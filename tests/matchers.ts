/**
 * Custom Vitest matchers for CGEL grammar testing.
 * 
 * These matchers provide semantic assertions and record metadata
 * via task.meta for visualization in the playground.
 */

import { expect, test } from 'vitest';
import type { TestContext } from 'vitest';
import { treeId } from '../src/index';
import {
  parse as parseInternal,
  checkConstituency,
  checkPartOfSpeech,
  type TreeNode
} from './helpers';

/**
 * Result of parsing a sentence, including the original sentence for metadata.
 *
 * `trees` is the full, immutable list of parses. `surviving` holds the indices
 * (into `trees`) of the parses still consistent with every assertion made so
 * far: structural matchers narrow it and assert it stays non-empty, so all
 * assertions in a test provably hold of one common parse (the "same parse"
 * guarantee). It starts as every index.
 */
export interface ParseResult {
  sentence: string;
  trees: TreeNode[];
  surviving: number[];
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
      surviving: trees.map((_, i) => i),
    };
  } catch (error: any) {
    return {
      sentence,
      trees: [],
      surviving: [],
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

/**
 * Record the current surviving-parse set to task.meta, so the playground can
 * highlight exactly which of a sentence's parses satisfy every assertion.
 * `survivingTreeIds` identifies survivors by structural hash (see treeId), so
 * the playground can match them to its own re-parsed trees regardless of order.
 */
function recordSurviving(
  task: { meta: Record<string, unknown> } | undefined,
  received: ParseResult
) {
  if (!task) return;
  task.meta.treeCount = received.trees.length;
  task.meta.survivingIndices = [...received.surviving];
  task.meta.survivingTreeIds = received.surviving.map(i => treeId(received.trees[i]));
}

// Extend Vitest's expect with custom matchers
expect.extend({
  /**
   * Assert that the sentence parses successfully (is grammatical).
   * Use `.not.toBeGrammatical()` to assert ungrammaticality.
   */
  toBeGrammatical(received: ParseResult) {
    const { sentence, trees, error } = received;
    // Grammaticality is about existence of any parse; it does not narrow the
    // surviving set (every parse is still a candidate for later constraints).
    const pass = trees.length > 0;

    recordAssertion(this.task as any, sentence, {
      type: 'grammatical',
      passed: this.isNot ? !pass : pass,
      details: { parseCount: trees.length },
    }, error);
    recordSurviving(this.task as any, received);

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
      recordSurviving(this.task as any, received);

      return {
        pass: false,
        message: () => `Cannot check constituency: "${sentence}" did not parse`,
        actual: 'no parse',
        expected: `"${constituent[0]}" and "${constituent[1]}" form constituent excluding "${excludes}"`,
      };
    }

    // Keep only surviving parses in which the constituency holds. `pass` is the
    // raw positive condition (some survivor satisfies it); vitest inverts it for
    // `.not`. We narrow the surviving set for positive assertions only, so every
    // later assertion applies to the *same* parse.
    const keep = received.surviving.filter(i =>
      checkConstituency(trees[i], constituent[0], constituent[1], excludes)
    );
    const pass = keep.length > 0;
    if (pass && !this.isNot) received.surviving = keep;

    recordAssertion(this.task as any, sentence, {
      type: 'constituency',
      passed: this.isNot ? !pass : pass,
      details: { constituent, excludes, parseCount: trees.length, survivingCount: received.surviving.length },
    }, error);
    recordSurviving(this.task as any, received);

    return {
      pass,
      message: () => pass
        ? `Expected "${constituent[0]}" and "${constituent[1]}" NOT to form a constituent excluding "${excludes}"`
        : `Expected "${constituent[0]}" and "${constituent[1]}" to form a constituent excluding "${excludes}" in a parse consistent with the other assertions (checked ${received.surviving.length} surviving parse(s))`,
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
      recordSurviving(this.task as any, received);

      return {
        pass: false,
        message: () => `Cannot check POS: "${sentence}" did not parse`,
        actual: 'no parse',
        expected: `"${word}" to be "${pos}"`,
      };
    }

    // Keep only surviving parses in which the word has the expected POS, so this
    // and every other assertion apply to the same parse. Narrow for positive
    // assertions only; vitest inverts `pass` for `.not`.
    const keep = received.surviving.filter(i => checkPartOfSpeech(trees[i], word, pos));
    const pass = keep.length > 0;
    if (pass && !this.isNot) received.surviving = keep;

    recordAssertion(this.task as any, sentence, {
      type: 'pos',
      passed: this.isNot ? !pass : pass,
      details: { word, pos, parseCount: trees.length, survivingCount: received.surviving.length },
    }, error);
    recordSurviving(this.task as any, received);

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

/**
 * Register a test as a KNOWN LIMITATION: a case that CGEL says should hold (or
 * not hold) but that the grammar does not yet handle. These are documented gaps,
 * not regressions.
 *
 * Built on vitest's `test.fails`, so the assertion body is expected to fail:
 *   - While the limitation stands (the assertion fails), vitest counts the test
 *     as PASSED — it does not turn the suite red — and the playground renders it
 *     YELLOW.
 *   - Once the grammar is fixed (the assertion now passes), `test.fails` flips the
 *     result to FAILED, nagging you to promote it to a plain `test`; the playground
 *     renders it BLUE.
 *
 * The body still runs, so `task.meta` (sentence, assertions) is recorded for the
 * playground exactly as with a normal test; we additionally tag `knownLimitation`.
 *
 * Usage mirrors `test`:
 *   knownLimitation('It was to her book that I referred.', ({ expect, task }) => {
 *     expect(parse(task.name)).toBeGrammatical();
 *   });
 */
export function knownLimitation(
  name: string,
  fn: (context: TestContext) => void | Promise<void>,
): void {
  test.fails(name, async (context) => {
    (context.task.meta as Record<string, unknown>).knownLimitation = true;
    await fn(context);
  });
}
