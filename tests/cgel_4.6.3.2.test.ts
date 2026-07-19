/**
 * Test file for CGEL 4.6.3.2 (Chapter 4, §6.3.2):
 * "Constructions containing verb + intransitive preposition idioms"
 * (pp. 286–288).
 *
 * CGEL [44] distinguishes seven structures:
 *   I.   verb – prep                         He gave in.
 *   II.  verb – prep – O                     She mixed up [the tickets].
 *   III. verb – Oi – prep – Od               I ran [him] off [another copy].
 *   IV.  verb – prep – transitive PP         We look forward [to your visit].
 *   V.   verb – O – prep – transitive PP     I let [her] in [on a little secret].
 *   VI.  verb – prep – (as) PC               She ended up [(as) captain].
 *   VII. verb – O – prep – [as + PC]         This showed [him] up [as spineless].
 *
 * The tests below use the labeled examples and syntactic contrasts from the
 * PDF. The lexical inventories in [45]–[47] and [49]–[52] are represented by
 * their section samples rather than by a generated test for every listed idiom.
 * NP-only relative examples are embedded in a minimal copular frame. Parser
 * behavior that does not yet match CGEL is recorded with `knownLimitation`.
 */

import { describe, test } from 'vitest';
import { knownLimitation, parse } from './matchers';

// =============================================================================
// [45] Structure I: verb – prep, as in "give in"
// =============================================================================

describe('CGEL 4.6.3.2 [45] Structure I: verb – prep', () => {
  test('He gave in.', ({ expect, task }) => {
    expect(parse(task.name)).toBeGrammatical();
  });
});

// =============================================================================
// [46] Structure II: verb – prep – O, as in "mix up [the tickets]"
// =============================================================================

describe('CGEL 4.6.3.2 [46] Structure II: verb – prep – O', () => {
  // Every idiom in [46] allows both particle positions.
  test('She mixed up the tickets.', ({ expect, task }) => {
    expect(parse(task.name)).toBeGrammatical();
  });

  test('She mixed the tickets up.', ({ expect, task }) => {
    expect(parse(task.name)).toBeGrammatical();
  });

  // Some verb + particle idioms have dual transitivity.
  test('I gave up the attempt.', ({ expect, task }) => {
    expect(parse(task.name)).toBeGrammatical();
  });

  test('I gave up.', ({ expect, task }) => {
    expect(parse(task.name)).toBeGrammatical();
  });

  describe('Footnote 49: motion permits an order that state excludes', () => {
    knownLimitation('She put her hat on.', ({ expect, task }) => {
      expect(parse(task.name)).toBeGrammatical();
    });

    knownLimitation('She put on her hat.', ({ expect, task }) => {
      expect(parse(task.name)).toBeGrammatical();
    });

    knownLimitation('She kept her hat on.', ({ expect, task }) => {
      expect(parse(task.name)).toBeGrammatical();
    });

    test('She kept on her hat.', ({ expect, task }) => {
      expect(parse(task.name)).not.toBeGrammatical();
    });
  });
});

// =============================================================================
// [47–48] Structure III: verb – Oi – prep – Od
// =============================================================================

describe('CGEL 4.6.3.2 [47–48] Structure III: verb – Oi – prep – Od', () => {
  test('I ran him off another copy.', ({ expect, task }) => {
    expect(parse(task.name)).toBeGrammatical();
  });

  describe('[47] Alternation with a to/for prepositional construction', () => {
    knownLimitation("I'll give you back your money.", ({ expect, task }) => {
      expect(parse(task.name)).toBeGrammatical();
    });

    test("I'll give your money back to you.", ({ expect, task }) => {
      expect(parse(task.name)).toBeGrammatical();
    });

    test("I'll get you in some food.", ({ expect, task }) => {
      expect(parse(task.name)).toBeGrammatical();
    });

    knownLimitation("I'll get some food in for you.", ({ expect, task }) => {
      expect(parse(task.name)).toBeGrammatical();
    });
  });

  describe('[48] The three possible particle positions', () => {
    test('I still have to pay back my father that loan.', ({ expect, task }) => {
      expect(parse(task.name)).toBeGrammatical();
    });

    test('I still have to pay my father back that loan.', ({ expect, task }) => {
      expect(parse(task.name)).toBeGrammatical();
    });

    test('I still have to pay my father that loan back.', ({ expect, task }) => {
      expect(parse(task.name)).toBeGrammatical();
    });
  });
});

// =============================================================================
// [49] Structure IV: verb – prep – transitive PP
// =============================================================================

describe('CGEL 4.6.3.2 [49] Structure IV: verb – prep – transitive PP', () => {
  knownLimitation('We look forward to your visit.', ({ expect, task }) => {
    expect(parse(task.name)).toBeGrammatical();
  });

  describe('Adjunct insertion and relative fronting', () => {
    knownLimitation('I was looking forward eagerly to her return.', ({ expect, task }) => {
      expect(parse(task.name)).toBeGrammatical();
    });

    knownLimitation("It's not the sort of event to which you'd expect him to be looking forward so eagerly.", ({ expect, task }) => {
      expect(parse(task.name)).toBeGrammatical();
    });
  });

  describe('Different degrees of fossilisation', () => {
    // CGEL gives NP fragments; the copular frame makes them parser inputs.
    knownLimitation('The difficulty which we had run up against was serious.', ({ expect, task }) => {
      expect(parse(task.name)).toBeGrammatical();
    });

    // CGEL marks the fronted version "?" (barely possible), not "*".
    knownLimitation('The difficulty against which we had run up was serious.', ({ expect, task }) => {
      expect(parse(task.name)).toBeGrammatical();
    });
  });

  knownLimitation('Her return had been eagerly looked forward to.', ({ expect, task }) => {
    expect(parse(task.name)).toBeGrammatical();
  });
});

// =============================================================================
// [50] Structure V: verb – O – prep – transitive PP
// =============================================================================

describe('CGEL 4.6.3.2 [50] Structure V: verb – O – prep – transitive PP', () => {
  test('I let her in on a little secret.', ({ expect, task }) => {
    expect(parse(task.name)).toBeGrammatical();
  });

  describe('Object position', () => {
    knownLimitation('She put his bad temper down to stress.', ({ expect, task }) => {
      expect(parse(task.name)).toBeGrammatical();
    });

    test('She put down his bad temper to stress.', ({ expect, task }) => {
      expect(parse(task.name)).not.toBeGrammatical();
    });

    // "Play off against" is one of the few items allowing prep before object.
    knownLimitation('He played off one against the other.', ({ expect, task }) => {
      expect(parse(task.name)).toBeGrammatical();
    });
  });

  describe('Passive subject selection', () => {
    knownLimitation('His bad temper was put down to stress.', ({ expect, task }) => {
      expect(parse(task.name)).toBeGrammatical();
    });

    test('Stress was put his bad temper down to.', ({ expect, task }) => {
      expect(parse(task.name)).not.toBeGrammatical();
    });
  });

  test('The shock for which he intended to let me in was severe.', ({ expect, task }) => {
    // The transitive preposition of fossilised "let in for" resists fronting.
    expect(parse(task.name)).not.toBeGrammatical();
  });
});

// =============================================================================
// [51] Structure VI: verb – prep – (as) PC
// =============================================================================

describe('CGEL 4.6.3.2 [51] Structure VI: verb – prep – (as) PC', () => {
  knownLimitation('It turned out better than we had expected.', ({ expect, task }) => {
    expect(parse(task.name)).toBeGrammatical();
  });

  knownLimitation('He came across as rather indecisive.', ({ expect, task }) => {
    expect(parse(task.name)).toBeGrammatical();
  });

  knownLimitation('He came over as rather indecisive.', ({ expect, task }) => {
    expect(parse(task.name)).toBeGrammatical();
  });

  describe('Distribution of optional as', () => {
    test('She ended up broken-hearted.', ({ expect, task }) => {
      expect(parse(task.name)).toBeGrammatical();
    });

    test('She ended up captain.', ({ expect, task }) => {
      expect(parse(task.name)).toBeGrammatical();
    });

    knownLimitation('She ended up as captain.', ({ expect, task }) => {
      expect(parse(task.name)).toBeGrammatical();
    });
  });
});

// =============================================================================
// [52] Structure VII: verb – O – prep – [as + PC]
// =============================================================================

describe('CGEL 4.6.3.2 [52] Structure VII: verb – O – prep – [as + PC]', () => {
  test('This showed him up as spineless.', ({ expect, task }) => {
    expect(parse(task.name)).toBeGrammatical();
  });

  // CGEL marks the unoblique make-out construction "?" (somewhat marginal).
  knownLimitation('They made it out worse than it was.', ({ expect, task }) => {
    expect(parse(task.name)).toBeGrammatical();
  });
});
