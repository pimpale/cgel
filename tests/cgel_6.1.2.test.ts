/**
 * Test file for CGEL 6.1.2: Prepositional Verb Constructions
 * 
 * Based on the Cambridge Grammar of the English Language's analysis
 * of prepositional verbs and their complementation patterns.
 * 
 * The six structures covered:
 *   I.   verb – [prep + O]                    : I referred [to her book]
 *   II.  verb – O – [prep + O]                : I intended it [for Kim]
 *   III. verb – [prep + O] – [prep + O]       : He looked [to her] [for guidance]
 *   IV.  verb – [prep + PC]                   : It counts [as too short]
 *   V.   verb – O – [prep + PC]               : They regard it [as successful]
 *   VI.  verb – [prep + O] – [prep + PC]      : I think [of it] [as indispensable]
 * 
 * For each structure, we test:
 *   - Plain declarative
 *   - Passive (where applicable)
 *   - Adjunct insertion (between verb and preposition)
 *   - Ungrammatical variants
 */

import { describe, test } from 'vitest';
import { parse } from './matchers';

// =============================================================================
// Structure I: verb – [prep + O], as in "refer [to her book]"
// =============================================================================

describe('CGEL 6.1.2 Structure I: verb – [prep + O]', () => {
  
  describe('Plain Declaratives', () => {
    test('I referred to the book.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      // "to the book" forms a PP constituent
      expect(result).toHaveConstituent({ in: ['to', 'book'], out: 'referred' });
    });

    test('She accounts for the discrepancy.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('I came across some old letters.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('He believes in democracy.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('They disposed of the evidence.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('I look after the children.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });
  });

  describe('Prepositional Passives', () => {
    // The book was referred to (prepositional passive)
    test('The book was referred to.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('Her suggestion was dwelt on at length.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('The matter was decided on yesterday.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('The discrepancy was accounted for.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('The children were looked after carefully.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });
  });

  describe('Adjunct Insertion (variable preposition position)', () => {
    // For non-fossilised combinations, adjuncts can intervene
    test('I referred often to her work.', ({ expect, task }) => {
      const result = parse(task.name);
      // This is grammatical for non-fossilised verbs like "refer"
      expect(result).toBeGrammatical();
    });

    test('She dwelt at length on the topic.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('I decided eventually on the blue one.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });
  });

  describe('Ungrammatical: Fossilised Combinations Resist Adjunct Insertion', () => {
    // CGEL [6]: *Of which items did he dispose first? (marginal/unacceptable)
    // Fossilised "come across" blocks insertion
    test('I came suddenly across some old letters.', ({ expect, task }) => {
      const result = parse(task.name);
      // Fossilised: adjunct between verb and preposition is ungrammatical
      expect(result).not.toBeGrammatical();
    });

    test('She got quickly over her disappointment.', ({ expect, task }) => {
      const result = parse(task.name);
      // Fossilised: "get over" resists separation
      expect(result).not.toBeGrammatical();
    });
  });

  describe('PP Fronting (Relative Clauses)', () => {
    // Non-fossilised: preposition can be fronted with its complement
    test('The article to which I referred was published last year.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    // CGEL [8]: the items of which he had disposed
    test('The items of which he disposed were valuable.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });
  });
});

// =============================================================================
// Structure II: verb – O – [prep + O], as in "intend it [for Kim]"
// =============================================================================

describe('CGEL 6.1.2 Structure II: verb – O – [prep + O]', () => {
  
  describe('Plain Declaratives', () => {
    test('I intended it for Kim.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
      expect(result).toHaveConstituent({ in: ['for', 'kim'], out: 'it' });
    });

    test('They accused him of theft.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('She convinced me of her innocence.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('He deprived them of food.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('I introduced her to John.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('They robbed him of his wallet.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('She protected the child from danger.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });
  });

  describe('Passives (Subject from Direct Object)', () => {
    // Passive subject always corresponds to object of verb, not preposition
    // "It was intended for Kim" (not *"Kim was intended it for")
    test('It was intended for Kim.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('He was accused of theft.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('I was convinced of her innocence.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('They were deprived of food.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('She was introduced to John.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('He was robbed of his wallet.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });
  });

  describe('Adjunct Insertion (between object and PP)', () => {
    test('I intended it specifically for Kim.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('They accused him publicly of theft.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('She introduced her formally to the committee.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });
  });

  describe('Ungrammatical: Prepositional Passive with PP Object', () => {
    // CGEL: *Kim was intended it for (prepositional passive blocked)
    test('Kim was intended it for.', ({ expect, task }) => {
      const result = parse(task.name);
      // Prepositional passive from object of preposition is ungrammatical
      expect(result).not.toBeGrammatical();
    });

    test('Theft was accused him of.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).not.toBeGrammatical();
    });
  });

  describe('Supply/Provide Alternation (CGEL [19])', () => {
    // CGEL [19i]: He supplied weapons to them ~ He supplied them with weapons
    test('He supplied weapons to them.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('He supplied them with weapons.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });
  });
});

// =============================================================================
// Structure III: verb – [prep + O] – [prep + O], as in "look [to her] [for guidance]"
// =============================================================================

describe('CGEL 6.1.2 Structure III: verb – [prep + O] – [prep + O]', () => {
  
  describe('Plain Declaratives', () => {
    test('He looked to her for guidance.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('I agree with you about the proposal.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('She appealed to the court for clemency.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('They argued with me about the details.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('He boasted to everyone about his success.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('She complained to the manager about the service.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });
  });

  describe('Passives (where applicable)', () => {
    // Structure III passives are rare but possible with some verbs
    test('Guidance was looked to her for.', ({ expect, task }) => {
      const result = parse(task.name);
      // This is marginal/ungrammatical - passive from second PP is blocked
      expect(result).not.toBeGrammatical();
    });
  });

  describe('Adjunct Insertion', () => {
    test('He looked urgently to her for guidance.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('I agree completely with you about the proposal.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('She appealed repeatedly to the court for clemency.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });
  });
});

// =============================================================================
// Structure IV: verb – [prep + PC], as in "count [as too short]"
// =============================================================================

describe('CGEL 6.1.2 Structure IV: verb – [prep + PC]', () => {
  
  describe('Plain Declaratives (with AdjP predicative)', () => {
    test('It counts as too short.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('She passed as dead.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    // "pass for" alternative (CGEL notes this)
    test('He passed for dead.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('It serves as adequate.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });
  });

  describe('Plain Declaratives (with NP predicative)', () => {
    test('She acts as president.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('He functions as leader.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('The sofa doubles as a bed.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('She emerged as the winner.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('He posed as a doctor.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });
  });

  describe('Passives', () => {
    // Structure IV is intransitive (no object), so no standard passive
    // However, some impersonal passives may be possible
    test('It was counted as too short.', ({ expect, task }) => {
      const result = parse(task.name);
      // This requires a different construction (passive of "count" as transitive)
      expect(result).toBeGrammatical();
    });
  });

  describe('Adjunct Insertion', () => {
    test('It counts officially as too short.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('She acts effectively as president.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('He posed convincingly as a doctor.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });
  });
});

// =============================================================================
// Structure V: verb – O – [prep + PC], as in "regard it [as successful]"
// =============================================================================

describe('CGEL 6.1.2 Structure V: verb – O – [prep + PC]', () => {
  
  describe('Plain Declaratives (with AdjP predicative)', () => {
    test('They regard it as successful.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('I see it as important.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('She views the matter as serious.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('We perceive it as dangerous.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    // "take for" alternative (CGEL notes: He took it as obvious ~ He took them for dead)
    test('He took them for dead.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });
  });

  describe('Plain Declaratives (with NP predicative)', () => {
    test('They elected him as chairman.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('I consider her as a friend.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('She described him as a genius.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('They dismissed him as incompetent.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('We know her as the best candidate.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });
  });

  describe('Passives', () => {
    // Object becomes subject, [prep + PC] remains
    test('It was regarded as successful.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('He was elected as chairman.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('She was described as a genius.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('The matter was viewed as serious.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('He was dismissed as incompetent.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });
  });

  describe('Adjunct Insertion', () => {
    test('They regard it universally as successful.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('I see it clearly as important.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('She described him accurately as a genius.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });
  });

  describe('Optional "as" (CGEL [22ii])', () => {
    // With verbs in [22ii], "as" is optional: "They appointed Kim (as) treasurer"
    test('They appointed Kim treasurer.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('They appointed Kim as treasurer.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('We elected her president.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('We elected her as president.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });
  });
});

// =============================================================================
// Structure VI: verb – [prep + O] – [prep + PC], as in "think [of it] [as indispensable]"
// =============================================================================

describe('CGEL 6.1.2 Structure VI: verb – [prep + O] – [prep + PC]', () => {
  
  describe('Plain Declaratives', () => {
    // Predicand of PC is complement of first preposition (it → indispensable)
    test('I think of it as indispensable.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('We conceive of the project as feasible.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('She looks upon him as a brother.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('They refer to it as the solution.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('I agree on this as the best option.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });
  });

  describe('Passives', () => {
    // The object of the first preposition can become subject (prepositional passive)
    test('It was thought of as indispensable.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('The project was conceived of as feasible.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('He was looked upon as a brother.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('It was referred to as the solution.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });
  });

  describe('Adjunct Insertion', () => {
    test('I think often of it as indispensable.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('She looks favorably upon him as a brother.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('We conceive generally of the project as feasible.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });
  });
});

// =============================================================================
// Additional Tests: Preposition Fronting and Stranding
// =============================================================================

describe('CGEL 6.1.2 PP Fronting and Stranding', () => {
  
  describe('Fronting in Relative Clauses (non-fossilised)', () => {
    // CGEL [6a]: the book to which I referred
    test('The book to which I referred was helpful.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    // CGEL [6b]: the items of which he disposed
    test('The items of which he disposed were valuable.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });
  });

  describe('Preposition Stranding (alternative to fronting)', () => {
    // Stranding: the book which I referred to
    test('The book which I referred to was helpful.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('The person who I spoke to was helpful.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });
  });

  describe('It-Cleft Constructions', () => {
    // CGEL [10]: It was to her book that I referred
    test('It was to her book that I referred.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });
  });

  describe('Preposition Repetition in Coordination', () => {
    // CGEL [8]: referred to her book and to her article
    test('I referred to her book and to her article.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });
  });
});

// =============================================================================
// Additional Tests: Fossilisation Effects
// =============================================================================

describe('CGEL 6.1.2 Fossilised Prepositional Verbs', () => {
  
  describe('Fixed Preposition Position (Fossilised)', () => {
    // These verbs resist separation - tested as grammatical in base form
    test('I came across some old letters.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('She got over her fear.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('They ran into problems.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });
  });

  describe('Ungrammatical: Fossilised Verbs Resist Prepositional Passives', () => {
    // CGEL notes some fossilised verbs don't allow prepositional passive
    // "come across" is marked -P (no prepositional passive)
    test('Some old letters were come across.', ({ expect, task }) => {
      const result = parse(task.name);
      // "come across" resists prepositional passive
      expect(result).not.toBeGrammatical();
    });
  });

  describe('Ungrammatical: Heavy NP Shift with Fossilised Verbs', () => {
    // CGEL [15]: *He came across later that morning a letter she wrote...
    test('He came across later that morning a letter she wrote.', ({ expect, task }) => {
      const result = parse(task.name);
      // Heavy NP shift blocked with fossilised prepositional verbs
      expect(result).not.toBeGrammatical();
    });

    // CGEL [15ii]: *We must see to immediately the various matters...
    test('We must see to immediately the various matters.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).not.toBeGrammatical();
    });
  });
});

// =============================================================================
// Contrast: Prepositional Verbs vs Particles
// =============================================================================

describe('CGEL 6.2 Contrast: Prepositional Verbs vs Particles', () => {
  
  describe('Particle: Can Follow Object', () => {
    // CGEL [27]: She took off the label ~ She took the label off
    test('She took off the label.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('She took the label off.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });
  });

  describe('Prepositional Verb: Cannot Reverse Order', () => {
    // CGEL [27]: She jumped off the wall ~ *She jumped the wall off
    test('She jumped off the wall.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('She jumped the wall off.', ({ expect, task }) => {
      const result = parse(task.name);
      // Prepositional verb: order cannot be reversed
      expect(result).not.toBeGrammatical();
    });
  });

  describe('Pronoun Test: Particle Must Follow Pronoun Object', () => {
    // CGEL [28]: *She took off it ~ She took it off
    test('She took off it.', ({ expect, task }) => {
      const result = parse(task.name);
      // Particle cannot precede unstressed pronoun
      expect(result).not.toBeGrammatical();
    });

    test('She took it off.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });
  });

  describe('Pronoun Test: Prepositional Verb Allows Pronoun After Preposition', () => {
    // CGEL [28b]: She jumped off it
    test('She jumped off it.', ({ expect, task }) => {
      const result = parse(task.name);
      // Prepositional verb: pronoun can follow preposition
      expect(result).toBeGrammatical();
    });
  });

  describe('Manner Adverb Insertion', () => {
    // CGEL [31]: *She took carefully off the label ~ She jumped fearlessly off the wall
    test('She took carefully off the label.', ({ expect, task }) => {
      const result = parse(task.name);
      // Particle: adverb cannot separate verb from particle + object
      expect(result).not.toBeGrammatical();
    });

    test('She jumped fearlessly off the wall.', ({ expect, task }) => {
      const result = parse(task.name);
      // Prepositional verb: adverb can intervene
      expect(result).toBeGrammatical();
    });
  });
});

// =============================================================================
// Homonymous Sequences (Same word as particle or preposition)
// =============================================================================

describe('CGEL 6.2 Homonymous Sequences', () => {
  
  describe('Same Word, Different Structures', () => {
    // CGEL [32i]: He shouted down his opponent (particle) vs He shouted down the phone (prep)
    test('He shouted down his opponent.', ({ expect, task }) => {
      const result = parse(task.name);
      // Particle use: can say "He shouted his opponent down"
      expect(result).toBeGrammatical();
    });

    test('He shouted down the phone.', ({ expect, task }) => {
      const result = parse(task.name);
      // Prepositional use: "down the phone" is a PP
      expect(result).toBeGrammatical();
    });

    // CGEL [32ii]: They turned in the fugitives (particle) vs They turned in the wrong direction (prep)
    test('They turned in the fugitives.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('They turned in the wrong direction.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });
  });
});
