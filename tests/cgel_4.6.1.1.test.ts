/**
 * Test file for CGEL 4.6.1.1 (Chapter 4, §6.1.1):
 * "Comparison between constructions with specified and unspecified prepositions"
 * (pp. 275–277).
 *
 * CGEL contrasts clauses with prepositional verbs (specified prepositions, the [a]
 * examples) against free verb + PP combinations (unspecified prepositions, [b]).
 * Among specified prepositions it distinguishes two types by four diagnostics:
 *
 *     mobile (e.g. "refer to")  — behaves just like an unspecified preposition
 *     fixed / fossilised (e.g. "come across") — blocks those same processes
 *
 * The four diagnostics, each its own subsection below:
 *   (a) fronting of the preposition + its NP (relatives, interrogatives, it-clefts)
 *   (b) coordination of PPs (preposition repeated)
 *   (c) position of adjuncts (adjunct inserted before the preposition)
 *   (d) prepositional passives
 *
 * Each example is asserted with CGEL's own verdict. Where the grammar already
 * agrees, we use `test`; where it does not yet (a documented gap, not a
 * regression), we use `knownLimitation`, which renders yellow while the gap
 * stands and flips to a failure — nagging us to promote it — once it is fixed.
 *
 * NP-only examples ("the book to which I referred") are embedded in a minimal
 * copular frame, following the convention of cgel_4.6.1.2.test.ts.
 */

import { describe, test } from 'vitest';
import { parse, knownLimitation } from './matchers';

describe('CGEL 4.6.1.1 Specified vs Unspecified Prepositions', () => {

  // ===========================================================================
  // [4] Prepositional verbs (specified) alongside free combinations (unspecified)
  // ===========================================================================
  describe('[4] Prepositional verbs and free combinations', () => {
    // In each pair the [a] verb specifies its preposition (a prepositional verb,
    // so the preposition is parsed as `prp{prep}`), while the [b] verb takes a
    // free directional/locative PP (general `preposition_np`). Where the [a]/[b]
    // contrast is the *same* verb + preposition differing only in sense
    // (skate over, wade through), both readings are available, and the [a] test
    // asserts `prp` to select the idiomatic one while the [b] test only checks
    // grammaticality.

    // [4i] a. specified "refer to"  /  b. unspecified "fly to"
    test('I referred to her book.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'to', pos: 'prpto' });
    });
    test('I flew to Boston.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).not.toHavePOS({ word: 'to', pos: 'prpto' });
    });
    // [4ii] a. specified "come across"  /  b. unspecified "swim across"
    test('I came across some old letters.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'across', pos: 'prpacross' });
    });
    test('I swam across the river.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).not.toHavePOS({ word: 'across', pos: 'prpacross' });
    });
    // [4iii] a. idiomatic "skate over" (gloss over)  /  b. literal (same verb+prep)
    test('I skated over the problem.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'over', pos: 'prpover' });
    });
    test('I skated over the frozen pond.', ({ expect, task }) => {
      expect(parse(task.name)).toBeGrammatical();
    });
    // [4iv] a. idiomatic "wade through" (labour through)  /  b. literal (same verb+prep)
    test('I waded through my ironing.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'through', pos: 'prpthrough' });
    });
    test('I waded through the mud.', ({ expect, task }) => {
      expect(parse(task.name)).toBeGrammatical();
    });
  });

  // ===========================================================================
  // (a) Fronting of the preposition + NP
  // ===========================================================================
  describe('(a) Fronting of the preposition + NP', () => {

    // [5] Unspecified preposition: fronting is freely available.
    describe('[5] Unspecified preposition (baseline)', () => {
      // [5i] relative
      test('The city to which I flew was Boston.', ({ expect, task }) => {
        const result = parse(task.name);
        expect(result).toBeGrammatical();
        expect(JSON.stringify(result)).toContain('"kind":"relative_ip_pp_gen"');
      });
      // [5ii] open interrogative
      test('To which city did you fly?', ({ expect, task }) => {
        expect(parse(task.name)).toBeGrammatical();
      });
      // [5iii] it-cleft
      test('It was to Boston that I flew.', ({ expect, task }) => {
        const result = parse(task.name);
        expect(result).toBeGrammatical();
        expect(JSON.stringify(result)).toContain('"kind":"it"');
      });
    });

    // [6] Mobile ([a], grammatical) vs fixed ([b], ungrammatical).
    describe('[6] Mobile vs fixed specified preposition', () => {
      // [6i] a. mobile relative / b. *fixed relative
      test('The book to which I referred was helpful.', ({ expect, task }) => {
        const result = parse(task.name);
        expect(result).toBeGrammatical();
        expect(result).toHavePOS({ word: 'to', pos: 'prpto' });
        expect(JSON.stringify(result)).toContain('"kind":"relative_ip_ppto"');
      });
      knownLimitation('The letters across which I came were valuable.', ({ expect, task }) => {
        // *the letters across which I came — fixed preposition cannot be fronted
        // on its idiomatic reading. The grammar also finds the structurally valid
        // free-PP reading with intransitive "came".
        expect(parse(task.name)).not.toBeGrammatical();
      });
      // [6ii] a. mobile interrogative / b. *fixed interrogative
      test('To which book did you refer?', ({ expect, task }) => {
        const result = parse(task.name);
        expect(result).toBeGrammatical();
        expect(result).toHavePOS({ word: 'to', pos: 'prpto' });
        expect(JSON.stringify(result)).toContain('"kind":"ip_ppto"');
      });
      knownLimitation('Across which letters did you come?', ({ expect, task }) => {
        // *Across which letters did you come? — CGEL rejects the fronted fixed
        // preposition, but the grammar accepts it via the free motion reading of
        // "come across", so this currently over-generates.
        expect(parse(task.name)).not.toBeGrammatical();
      });
      // [6iii] a. mobile it-cleft / b. *fixed it-cleft
      test('It was to her book that I referred.', ({ expect, task }) => {
        const result = parse(task.name);
        expect(result).toBeGrammatical();
        expect(result).toHavePOS({ word: 'to', pos: 'prpto' });
      });
      knownLimitation('It was across these letters that I came.', ({ expect, task }) => {
        // *It was across these letters that I came on the fixed-preposition
        // reading; the parser also permits a free directional-PP reading.
        expect(parse(task.name)).not.toBeGrammatical();
      });

      // A fronted specified PP must match the preposition selected by the verb.
      test('The book for which I referred was helpful.', ({ expect, task }) => {
        expect(parse(task.name)).not.toBeGrammatical();
      });
      test('For which did you refer?', ({ expect, task }) => {
        expect(parse(task.name)).not.toBeGrammatical();
      });
    });

    // The fixed preposition is fine when STRANDED (CGEL, after [6]).
    describe('Stranded preposition (always admissible)', () => {
      test('The letters which I came across were valuable.', ({ expect, task }) => {
        const result = parse(task.name);
        expect(result).toBeGrammatical();
        expect(result).toHavePOS({ word: 'across', pos: 'prpacross' });
        expect(JSON.stringify(result)).toContain('"kind":"relative_ip_np_obj"');
      });
      test('Which letters did you come across?', ({ expect, task }) => {
        const result = parse(task.name);
        expect(result).toBeGrammatical();
        expect(result).toHavePOS({ word: 'across', pos: 'prpacross' });
      });
      test('It was these letters that I came across.', ({ expect, task }) => {
        const result = parse(task.name);
        expect(result).toBeGrammatical();
        expect(result).toHavePOS({ word: 'across', pos: 'prpacross' });
      });
    });
  });

  // ===========================================================================
  // (b) Coordination of PPs
  // ===========================================================================
  describe('(b) Coordination of PPs', () => {
    // [7] Unspecified prepositions readily repeat in coordination.
    test('I flew to Boston and to New York.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).not.toHavePOS({ word: 'to', pos: 'prpto' });
    });
    // [8] a. mobile (repetition OK) / b. *fixed (repetition blocked)
    test('I referred to her book and to several others.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'to', pos: 'prpto' });
    });
    knownLimitation('I came across these letters and across some family photographs.', ({ expect, task }) => {
      // *I came across these letters and across some family photographs on the
      // fossilised reading; the parser also admits intransitive "came" followed
      // by coordinated free PP adjuncts.
      expect(parse(task.name)).not.toBeGrammatical();
    });
  });

  // ===========================================================================
  // (c) Position of adjuncts
  // ===========================================================================
  describe('(c) Position of adjuncts', () => {
    // [9] Unspecified: adjunct freely inserted before the preposition.
    test('I flew regularly to Boston.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).not.toHavePOS({ word: 'to', pos: 'prpto' });
    });
    // [10] a. mobile (insertion OK) / b. *fixed (insertion blocked)
    test('I referred repeatedly to her book.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'to', pos: 'prpto' });
    });
    knownLimitation('I came eventually across these letters.', ({ expect, task }) => {
      // *I came eventually across these letters. — CGEL blocks the inserted
      // adjunct for the fixed combination, but the grammar accepts it via the
      // free motion reading of "come across", so this currently over-generates.
      expect(parse(task.name)).not.toBeGrammatical();
    });
  });

  // ===========================================================================
  // (d) Prepositional passives
  // ===========================================================================
  describe('(d) Prepositional passives', () => {
    // [11i] unspecified: a. *blocked / b. admissible
    knownLimitation('Boston was flown to next.', ({ expect, task }) => {
      // *Boston was flown to next. — CGEL rejects the unspecified prepositional
      // passive here, but the grammar's generic prepositional passive accepts it.
      expect(parse(task.name)).not.toBeGrammatical();
    });
    test('This bed has been slept in.', ({ expect, task }) => {
      expect(parse(task.name)).toBeGrammatical();
    });
    // [11ii] mobile specified: a. *blocked (–P verb) / b. admissible
    test('Such principles were stood for.', ({ expect, task }) => {
      // *Such principles were stood for. ("stand for" is marked –P)
      expect(parse(task.name)).not.toBeGrammatical();
    });
    test('Her book was referred to.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'to', pos: 'prpto' });
    });
    // [11iii] fixed specified: a. *blocked (–P verb) / b. admissible
    knownLimitation('Some old letters were come across.', ({ expect, task }) => {
      // *Some old letters were come across. ("come across" is –P). The grammar's
      // generic prepositional passive still accepts it; blocking it needs the –P
      // flag, which is not yet modelled.
      expect(parse(task.name)).not.toBeGrammatical();
    });
    test('These matters must be seen to.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'to', pos: 'prpto' });
    });
  });

  // ===========================================================================
  // [12] The mobile/fixed distinction also applies in transitive clauses
  //      (verb – O – [prep + O]): mobile "refer ... to" vs fixed "get ... through"
  // ===========================================================================
  describe('[12] Transitive clauses: mobile vs fixed', () => {
    // [12i] base clauses
    test('He referred me to a specialist.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'to', pos: 'prpto' });
      expect(JSON.stringify(result)).toContain('"kind":"vbf_sg_o_prpto_np"');
    });
    test('He got me through the biology test.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'through', pos: 'prpthrough' });
      expect(JSON.stringify(result)).toContain('"kind":"vbf_sg_o_fprpthrough_np"');
    });
    // [12ii] a. mobile relative / b. *fixed relative
    test('The specialist to whom he referred me was kind.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'to', pos: 'prpto' });
      expect(JSON.stringify(result)).toContain('"kind":"relative_ip_ppto"');
    });
    knownLimitation('The test through which he got me was hard.', ({ expect, task }) => {
      // *the test through which he got me on the fixed-preposition reading; the
      // parser also admits transitive "got me" plus a free PP adjunct.
      expect(parse(task.name)).not.toBeGrammatical();
    });
    // [12iii] a. mobile interrogative / b. *fixed interrogative
    test('To whom did he refer you?', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'to', pos: 'prpto' });
      expect(JSON.stringify(result)).toContain('"kind":"ip_ppto"');
    });
    knownLimitation('Through which test did he get you?', ({ expect, task }) => {
      // *Through which test did he get you? — CGEL rejects the fronted fixed
      // preposition, but "get" (transitive) plus a fronted generic PP adjunct is
      // currently accepted, so this over-generates.
      expect(parse(task.name)).not.toBeGrammatical();
    });
    // [12iv] a. mobile it-cleft / b. *fixed it-cleft
    test('It was to an optometrist that he referred me.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'to', pos: 'prpto' });
    });
    knownLimitation('It was through the biology test that he got me.', ({ expect, task }) => {
      // *It wasn't through the biology test that he got me on the fossilised
      // reading; a free-PP cleft reading remains structurally available.
      expect(parse(task.name)).not.toBeGrammatical();
    });
    // [12v] a. mobile coordination / b. *fixed coordination
    test('He referred me to an optometrist, but not to an ophthalmologist.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'to', pos: 'prpto' });
    });
    test('He got me through the biology test, but not through the anatomy one.', ({ expect, task }) => {
      // *He got me through the biology test, but not through the anatomy one.
      expect(parse(task.name)).not.toBeGrammatical();
    });
  });

  // ===========================================================================
  // [15] Constituent structure: fossilisation is not a verb+object reanalysis,
  //      so an adjunct may NOT be placed before the (heavy) object NP.
  // ===========================================================================
  describe('[15] No adjunct before the NP (fossilisation is not verb + object)', () => {
    // [15i] *He came across later that morning a letter she wrote just before her marriage.
    test('He came across later that morning a letter.', ({ expect, task }) => {
      expect(parse(task.name)).not.toBeGrammatical();
    });
    // [15ii] *We must see to immediately the various matters that your father raised.
    test('We must see to immediately the various matters.', ({ expect, task }) => {
      expect(parse(task.name)).not.toBeGrammatical();
    });
  });
});
