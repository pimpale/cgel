/**
 * Test file for CGEL 4.6.1.2 (Chapter 4, §6.1.2):
 * "Constructions containing prepositional verbs" (pp. 277–280).
 *
 * §6.1.2 surveys the six complementation patterns of prepositional verbs
 * (examples [16]–[23]):
 *   I.   verb – [prep + O]                 : I referred [to her book]
 *   II.  verb – O – [prep + O]             : I intended it [for Kim]
 *   III. verb – [prep + O] – [prep + O]    : He looked [to her] [for guidance]
 *   IV.  verb – [prep + PC]                : It counts [as too short]
 *   V.   verb – O – [prep + PC]            : They regard it [as successful]
 *   VI.  verb – [prep + O] – [prep + PC]   : I think [of it] [as indispensable]
 *
 * Each declarative/passive additionally asserts, via `toHavePOS`, that the
 * governed preposition is parsed as a *specified* preposition (`prp{prep}`, e.g.
 * `of` -> `prpof`) rather than a general PP. This is the defining property of a
 * prepositional verb (CGEL §6.1.1) and, thanks to the same-parse narrowing, it
 * pins the assertion to the genuine prepositional-verb parse.
 *
 * Scope note: the mobile/fossilised diagnostics (§6.1.1) live in
 * cgel_4.6.1.1.test.ts; the verb–particle–object construction (§6.2) lives in
 * cgel_4.6.2.test.ts. Documented gaps use `knownLimitation`.
 */

import { describe, test } from 'vitest';
import { parse, knownLimitation } from './matchers';

// =============================================================================
// Structure I: verb – [prep + O], as in "refer [to her book]"
// =============================================================================

describe('CGEL 4.6.1.2 Structure I: verb – [prep + O]', () => {

  describe('Plain Declaratives', () => {
    test('I referred to the book.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHaveConstituent({ in: ['to', 'book'], out: 'referred' });
      expect(result).toHavePOS({ word: 'to', pos: 'prpto' });
    });

    test('She accounts for the discrepancy.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'for', pos: 'prpfor' });
    });

    test('He believes in democracy.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'in', pos: 'prpin' });
    });

    test('They disposed of the evidence.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'of', pos: 'prpof' });
    });

    test('I look after the children.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'after', pos: 'prpafter' });
    });
  });

  describe('Prepositional Passives', () => {
    test('The book was referred to.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'to', pos: 'prpto' });
    });

    test('Her suggestion was dwelt on at length.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'on', pos: 'prpon' });
    });

    test('The matter was decided on yesterday.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'on', pos: 'prpon' });
    });

    test('The discrepancy was accounted for.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'for', pos: 'prpfor' });
    });

    test('The children were looked after carefully.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'after', pos: 'prpafter' });
    });
  });
});

// =============================================================================
// Structure II: verb – O – [prep + O], as in "intend it [for Kim]"
// =============================================================================

describe('CGEL 4.6.1.2 Structure II: verb – O – [prep + O]', () => {

  describe('Plain Declaratives', () => {
    test('I intended it for Kim.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHaveConstituent({ in: ['for', 'kim'], out: 'it' });
      expect(result).toHavePOS({ word: 'for', pos: 'prpfor' });
    });

    test('They accused him of theft.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'of', pos: 'prpof' });
    });

    test('She convinced me of her innocence.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'of', pos: 'prpof' });
    });

    test('He deprived them of food.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'of', pos: 'prpof' });
    });

    test('I introduced her to John.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'to', pos: 'prpto' });
    });

    test('They robbed him of his wallet.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'of', pos: 'prpof' });
    });

    test('She protected the child from danger.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'from', pos: 'prpfrom' });
    });
  });

  describe('Passives (Subject from Direct Object)', () => {
    // CGEL: the passive subject corresponds to the object of the verb, not of
    // the preposition — "It was intended for Kim" (not *"Kim was intended it for").
    test('It was intended for Kim.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'for', pos: 'prpfor' });
    });

    test('He was accused of theft.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'of', pos: 'prpof' });
    });

    test('I was convinced of her innocence.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'of', pos: 'prpof' });
    });

    test('They were deprived of food.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'of', pos: 'prpof' });
    });

    test('She was introduced to John.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'to', pos: 'prpto' });
    });

    test('He was robbed of his wallet.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'of', pos: 'prpof' });
    });
  });

  describe('Adjunct Insertion (between object and PP)', () => {
    test('I intended it specifically for Kim.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'for', pos: 'prpfor' });
    });

    test('They accused him publicly of theft.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'of', pos: 'prpof' });
    });

    test('She introduced her formally to the committee.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'to', pos: 'prpto' });
    });
  });

  describe('Ungrammatical: Prepositional Passive from the PP object', () => {
    // CGEL: *Kim was intended it for
    test('Kim was intended it for.', ({ expect, task }) => {
      expect(parse(task.name)).not.toBeGrammatical();
    });

    test('Theft was accused him of.', ({ expect, task }) => {
      expect(parse(task.name)).not.toBeGrammatical();
    });
  });
});

// =============================================================================
// Structure III: verb – [prep + O] – [prep + O], as in "look [to her] [for guidance]"
// =============================================================================

describe('CGEL 4.6.1.2 Structure III: verb – [prep + O] – [prep + O]', () => {

  describe('Plain Declaratives', () => {
    test('He looked to her for guidance.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'to', pos: 'prpto' });
    });

    test('I agree with you about the proposal.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'with', pos: 'prpwith' });
    });

    test('She appealed to the court for clemency.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'to', pos: 'prpto' });
    });

    test('They argued with me about the details.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'with', pos: 'prpwith' });
    });

    test('He boasted to everyone about his success.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'to', pos: 'prpto' });
    });

    test('She complained to the manager about the service.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'to', pos: 'prpto' });
    });
  });

  describe('Passives (blocked from the second PP)', () => {
    test('Guidance was looked to her for.', ({ expect, task }) => {
      // Passive from the object of the second preposition is ungrammatical.
      expect(parse(task.name)).not.toBeGrammatical();
    });
  });

  describe('Adjunct Insertion', () => {
    test('He looked urgently to her for guidance.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'to', pos: 'prpto' });
    });

    test('I agree completely with you about the proposal.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'with', pos: 'prpwith' });
    });

    test('She appealed repeatedly to the court for clemency.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'to', pos: 'prpto' });
    });
  });
});

// =============================================================================
// Structure IV: verb – [prep + PC], as in "count [as too short]"
// =============================================================================

describe('CGEL 4.6.1.2 Structure IV: verb – [prep + PC]', () => {

  describe('Plain Declaratives (with AdjP predicative)', () => {
    test('It counts as too short.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'as', pos: 'prpas' });
    });

    test('She passed as dead.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'as', pos: 'prpas' });
    });

    // "pass for" alternative (CGEL: He had passed for dead)
    test('He passed for dead.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'for', pos: 'prpfor' });
    });

    test('It serves as adequate.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'as', pos: 'prpas' });
    });
  });

  describe('Plain Declaratives (with NP predicative)', () => {
    test('She acts as president.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'as', pos: 'prpas' });
    });

    test('He functions as leader.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'as', pos: 'prpas' });
    });

    test('The sofa doubles as a bed.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'as', pos: 'prpas' });
    });

    test('She emerged as the winner.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'as', pos: 'prpas' });
    });

    test('He posed as a doctor.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'as', pos: 'prpas' });
    });
  });

  describe('Passives', () => {
    test('It was counted as too short.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'as', pos: 'prpas' });
    });
  });

  describe('Adjunct Insertion', () => {
    test('It counts officially as too short.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'as', pos: 'prpas' });
    });

    test('She acts effectively as president.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'as', pos: 'prpas' });
    });

    test('He posed convincingly as a doctor.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'as', pos: 'prpas' });
    });
  });
});

// =============================================================================
// Structure V: verb – O – [prep + PC], as in "regard it [as successful]"
// =============================================================================

describe('CGEL 4.6.1.2 Structure V: verb – O – [prep + PC]', () => {

  describe('Plain Declaratives (with AdjP predicative)', () => {
    test('They regard it as successful.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'as', pos: 'prpas' });
    });

    test('I see it as important.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'as', pos: 'prpas' });
    });

    test('She views the matter as serious.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'as', pos: 'prpas' });
    });

    test('We perceive it as dangerous.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'as', pos: 'prpas' });
    });

    // "take for" alternative (CGEL: He took it as obvious ~ He took them for dead)
    test('He took them for dead.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'for', pos: 'prpfor' });
    });
  });

  describe('Plain Declaratives (with NP predicative)', () => {
    test('They elected him as chairman.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'as', pos: 'prpas' });
    });

    test('I consider her as a friend.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'as', pos: 'prpas' });
    });

    test('She described him as a genius.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'as', pos: 'prpas' });
    });

    test('They dismissed him as incompetent.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'as', pos: 'prpas' });
    });

    test('We know her as the best candidate.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'as', pos: 'prpas' });
    });
  });

  describe('Passives', () => {
    test('It was regarded as successful.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'as', pos: 'prpas' });
    });

    test('He was elected as chairman.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'as', pos: 'prpas' });
    });

    test('She was described as a genius.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'as', pos: 'prpas' });
    });

    test('The matter was viewed as serious.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'as', pos: 'prpas' });
    });

    test('He was dismissed as incompetent.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'as', pos: 'prpas' });
    });
  });

  describe('Adjunct Insertion', () => {
    test('They regard it universally as successful.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'as', pos: 'prpas' });
    });

    test('I see it clearly as important.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'as', pos: 'prpas' });
    });

    test('She described him accurately as a genius.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'as', pos: 'prpas' });
    });
  });

  describe('Optional "as" (CGEL [22ii])', () => {
    // With verbs in [22ii], "as" is optional: "They appointed Kim (as) treasurer"
    test('They appointed Kim treasurer.', ({ expect, task }) => {
      expect(parse(task.name)).toBeGrammatical();
    });

    test('They appointed Kim as treasurer.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'as', pos: 'prpas' });
    });

    test('We elected her president.', ({ expect, task }) => {
      expect(parse(task.name)).toBeGrammatical();
    });

    test('We elected her as president.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'as', pos: 'prpas' });
    });
  });
});

// =============================================================================
// Structure VI: verb – [prep + O] – [prep + PC], as in "think [of it] [as indispensable]"
// =============================================================================

describe('CGEL 4.6.1.2 Structure VI: verb – [prep + O] – [prep + PC]', () => {

  describe('Plain Declaratives', () => {
    // Predicand of the PC is complement of the first preposition (it → indispensable)
    test('I think of it as indispensable.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'of', pos: 'prpof' });
    });

    test('We conceive of the project as feasible.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'of', pos: 'prpof' });
    });

    test('She looks upon him as a brother.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'upon', pos: 'prpupon' });
    });

    test('They refer to it as the solution.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'to', pos: 'prpto' });
    });

    test('I agree on this as the best option.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'on', pos: 'prpon' });
    });
  });

  describe('Passives', () => {
    // The object of the first preposition becoming subject (prepositional passive)
    // of a two-preposition verb is not yet modelled.
    knownLimitation('It was thought of as indispensable.', ({ expect, task }) => {
      expect(parse(task.name)).toBeGrammatical();
    });

    knownLimitation('The project was conceived of as feasible.', ({ expect, task }) => {
      expect(parse(task.name)).toBeGrammatical();
    });

    knownLimitation('He was looked upon as a brother.', ({ expect, task }) => {
      expect(parse(task.name)).toBeGrammatical();
    });

    knownLimitation('It was referred to as the solution.', ({ expect, task }) => {
      expect(parse(task.name)).toBeGrammatical();
    });
  });

  describe('Adjunct Insertion', () => {
    test('I think often of it as indispensable.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'of', pos: 'prpof' });
    });

    test('She looks favorably upon him as a brother.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'upon', pos: 'prpupon' });
    });

    test('We conceive generally of the project as feasible.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHavePOS({ word: 'of', pos: 'prpof' });
    });
  });
});
