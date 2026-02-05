/**
 * Test file for CGEL 6.3.2: Constructions containing verb + intransitive preposition idioms
 * 
 * Based on the Cambridge Grammar of the English Language's analysis
 * of verbal idioms containing intransitive prepositions (particles).
 * 
 * The seven structures covered:
 *   I.    verb – prep                           : He gave in
 *   II.   verb – prep – O                       : She mixed up [the tickets]
 *   III.  verb – O^i – prep – O^d               : I ran [him] off [another copy]
 *   IV.   verb – prep – transitive PP           : We look forward [to your visit]
 *   V.    verb – O – prep – transitive PP       : I let [her] in [on a little secret]
 *   VI.   verb – prep – (as) PC                 : She ended up [(as) captain]
 *   VII.  verb – O – prep – [as + PC]           : This showed [him] up [as spineless]
 * 
 * Also includes tests from 6.3.1 on fossilisation:
 *   - Preposing (locative inversion)
 *   - Adjunct insertion
 *   - Order alternation (particle movement)
 * 
 * For each structure, we test:
 *   - Plain declarative
 *   - Passive (where applicable)
 *   - Particle movement / adjunct insertion
 *   - Ungrammatical variants
 */

import { describe, test } from 'vitest';
import { parse } from './matchers';

// =============================================================================
// Structure I: verb – prep (intransitive), as in "give in"
// =============================================================================

describe('CGEL 6.3.2 Structure I: verb – prep (intransitive)', () => {
  
  describe('Plain Declaratives', () => {
    test('He gave in.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('She backed down.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('The children grew up.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('The fire died down.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('The plane took off.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('We moved on.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('He owned up.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('She settled down.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('They fell out.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('The dinosaurs died out.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('He passed away.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });
  });

  describe('With Adjuncts', () => {
    test('He gave in yesterday.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('She finally backed down.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('The plane took off quickly.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });
  });
});

// =============================================================================
// Structure II: verb – prep – O, as in "mix up [the tickets]"
// =============================================================================

describe('CGEL 6.3.2 Structure II: verb – prep – O', () => {
  
  describe('Plain Declaratives (Particle-First Order)', () => {
    test('She mixed up the tickets.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('They beat up the suspect.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('He brought about the change.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('She brought up the children.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('They called off the meeting.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('He made up the story.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('She gave up the attempt.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('They took off the label.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('He put down the book.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('She filled out the form.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });
  });

  describe('Particle Movement (Object-First Order)', () => {
    // CGEL [27]: She took off the label ~ She took the label off
    test('She mixed the tickets up.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('They beat the suspect up.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('She brought the children up.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('They called the meeting off.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('He made the story up.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('She gave the attempt up.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('They took the label off.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('He put the book down.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });
  });

  describe('Pronoun Objects (Must Follow Verb)', () => {
    // CGEL [28]: *She took off it ~ She took it off
    test('She took it off.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('They mixed them up.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('He put it down.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('She gave it up.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });
  });

  describe('Ungrammatical: Particle Before Pronoun', () => {
    // CGEL [28a]: *She took off it
    test('She took off it.', ({ expect, task }) => {
      const result = parse(task.name);
      // Particle cannot precede unstressed pronoun object
      expect(result).not.toBeGrammatical();
    });

    test('They mixed up them.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).not.toBeGrammatical();
    });

    test('He put down it.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).not.toBeGrammatical();
    });
  });

  describe('Passives', () => {
    test('The tickets were mixed up.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('The suspect was beaten up.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('The meeting was called off.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('The story was made up.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('The label was taken off.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('The children were brought up carefully.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });
  });

  describe('Dual Transitivity (with or without object)', () => {
    // CGEL: "I gave up the attempt" or "I gave up"
    test('I gave up.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('I gave up the attempt.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });
  });
});

// =============================================================================
// Structure III: verb – O^i – prep – O^d, as in "run [him] off [another copy]"
// =============================================================================

describe('CGEL 6.3.2 Structure III: verb – O^i – prep – O^d (ditransitive with particle)', () => {
  
  describe('Plain Declaratives', () => {
    // The most usual order: [Oi – PP – Od]
    test('I ran him off another copy.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('She gave him back his money.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('I will get you in some food.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('She passed him down the tools.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('He paid her back the money.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('They sent us over some samples.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });
  });

  describe('Passives (Indirect Object Promoted)', () => {
    test('He was run off another copy.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('He was given back his money.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('She was paid back the money.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });
  });

  describe('Alternative Order: PP – Oi – Od', () => {
    // CGEL [48i]: Less common, not possible with pronoun IO
    test('I still have to pay back my father that loan.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });
  });

  describe('Alternative Order: Oi – Od – PP', () => {
    // CGEL [48iii]: Requires short objects
    test('I still have to pay my father that loan back.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });
  });
});

// =============================================================================
// Structure IV: verb – prep – transitive PP, as in "look forward [to your visit]"
// =============================================================================

describe('CGEL 6.3.2 Structure IV: verb – prep – transitive PP', () => {
  
  describe('Plain Declaratives', () => {
    test('We look forward to your visit.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('She faced up to the problem.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('They put up with the noise.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('He stood up to the bully.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('She cashed in on the opportunity.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('They ran up against difficulties.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('He owned up to the mistake.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('She made up for lost time.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });
  });

  describe('Passives (Prepositional Passive)', () => {
    // CGEL: Her return had been eagerly looked forward to
    test('Your visit was looked forward to.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('Her return was eagerly looked forward to.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('The problem was faced up to.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('The noise was put up with.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('The bully was stood up to.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('The opportunity was cashed in on.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });
  });

  describe('Adjunct Insertion', () => {
    // CGEL: I was looking forward eagerly to her return
    test('I was looking forward eagerly to her return.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('They put up bravely with the hardship.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });
  });
});

// =============================================================================
// Structure V: verb – O – prep – transitive PP, as in "let [her] in [on a secret]"
// =============================================================================

describe('CGEL 6.3.2 Structure V: verb – O – prep – transitive PP', () => {
  
  describe('Plain Declaratives', () => {
    test('I let her in on a little secret.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('She put his bad temper down to stress.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('They played one off against the other.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('He took his anger out on the children.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('She fobbed us off with excuses.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });
  });

  describe('Passives (Object Promoted)', () => {
    // Passive subject corresponds to object of verb, not preposition
    test('She was let in on a little secret.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('His bad temper was put down to stress.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('His anger was taken out on the children.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('We were fobbed off with excuses.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });
  });

  describe('Ungrammatical: Prepositional Passive (from PP object)', () => {
    // CGEL: *Stress was put his bad temper down to
    test('Stress was put his bad temper down to.', ({ expect, task }) => {
      const result = parse(task.name);
      // Cannot promote object of preposition when verb has direct object
      expect(result).not.toBeGrammatical();
    });

    test('A little secret was let her in on.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).not.toBeGrammatical();
    });
  });

  describe('Ungrammatical: Wrong Order (particle before object)', () => {
    // CGEL: *She put down [his bad temper] [to stress]
    test('She put down his bad temper to stress.', ({ expect, task }) => {
      const result = parse(task.name);
      // Object must precede particle in Structure V
      expect(result).not.toBeGrammatical();
    });
  });
});

// =============================================================================
// Structure VI: verb – prep – (as) PC, as in "end up [(as) captain]"
// =============================================================================

describe('CGEL 6.3.2 Structure VI: verb – prep – (as) PC', () => {
  
  describe('Plain Declaratives with AdjP Predicative', () => {
    // With AdjP, "as" does not occur
    test('It turned out wrong.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('She ended up happy.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('She ended up broken-hearted.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('It turned out better than expected.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('He came across as rather indecisive.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('She came over as friendly.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });
  });

  describe('Plain Declaratives with NP Predicative (optional "as")', () => {
    // CGEL: She ended up captain / as captain
    test('She ended up captain.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('She ended up as captain.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('He finished up champion.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('He finished up as champion.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('She wound up president.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('She wound up as president.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });
  });

  describe('With Adjuncts', () => {
    test('She ended up happy in the end.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('It turned out surprisingly well.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });
  });
});

// =============================================================================
// Structure VII: verb – O – prep – [as + PC], as in "show [him] up [as spineless]"
// =============================================================================

describe('CGEL 6.3.2 Structure VII: verb – O – prep – [as + PC]', () => {
  
  describe('Plain Declaratives', () => {
    test('This showed him up as spineless.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('They wrote him off as incompetent.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('She set herself up as an expert.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('They ruled him out as a candidate.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('He passed it off as genuine.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('She put him down as unreliable.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('They gave him up for dead.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });
  });

  describe('Passives', () => {
    test('He was shown up as spineless.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('He was written off as incompetent.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('He was ruled out as a candidate.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('It was passed off as genuine.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('He was given up for dead.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });
  });

  describe('With Adjuncts', () => {
    test('This showed him up completely as spineless.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('They quickly wrote him off as incompetent.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });
  });
});

// =============================================================================
// CGEL 6.3.1: Fossilisation Effects
// =============================================================================

describe('CGEL 6.3.1 Fossilisation: Preposing (Locative Inversion)', () => {
  
  describe('Grammatical: Free Combinations Allow Preposing', () => {
    // CGEL [38i]: Down it went. Off came his shirt. Up go the ratings.
    test('Down it went.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('Off came his shirt.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('Up went the balloon.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('In came Kim.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('Away we ran.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });
  });

  describe('Ungrammatical: Fossilised Idioms Block Preposing', () => {
    // CGEL [38ii]: *Down it broke. *Off went the milk. *Up pay the patrons.
    test('Down it broke.', ({ expect, task }) => {
      const result = parse(task.name);
      // "break down" (idiom) cannot prepose
      expect(result).not.toBeGrammatical();
    });

    test('Off went the milk.', ({ expect, task }) => {
      const result = parse(task.name);
      // "go off" (become spoiled) cannot prepose
      expect(result).not.toBeGrammatical();
    });

    test('In gave the bandit.', ({ expect, task }) => {
      const result = parse(task.name);
      // "give in" cannot prepose
      expect(result).not.toBeGrammatical();
    });
  });
});

describe('CGEL 6.3.1 Fossilisation: Adjunct Insertion', () => {
  
  describe('Grammatical: Free Combinations Allow Adjunct Insertion', () => {
    // CGEL [39i]: She climbed slowly up. She led him triumphantly out.
    test('She climbed slowly up.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('She led him triumphantly out.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('They pressed resolutely on.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('It faded gradually away.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });
  });

  describe('Ungrammatical: Fossilised Idioms Block Adjunct Insertion', () => {
    // CGEL [39ii]: *She gave slowly up. *She knocked him triumphantly out.
    test('She gave slowly up.', ({ expect, task }) => {
      const result = parse(task.name);
      // "give up" (idiom) resists adjunct insertion
      expect(result).not.toBeGrammatical();
    });

    test('She knocked him triumphantly out.', ({ expect, task }) => {
      const result = parse(task.name);
      // "knock out" (idiom) resists adjunct insertion
      expect(result).not.toBeGrammatical();
    });

    test('They carried resolutely on.', ({ expect, task }) => {
      const result = parse(task.name);
      // "carry on" (idiom) resists adjunct insertion
      expect(result).not.toBeGrammatical();
    });

    test('He passed gradually away.', ({ expect, task }) => {
      const result = parse(task.name);
      // "pass away" (die) resists adjunct insertion
      expect(result).not.toBeGrammatical();
    });
  });
});

describe('CGEL 6.3.1 Fossilisation: Order Alternation', () => {
  
  describe('Grammatical: Both Orders Possible (literal meaning)', () => {
    // CGEL [40i,iii]: He carried out the chairs ~ He carried the chairs out
    test('He carried out the chairs.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('He carried the chairs out.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('He put on his hat.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('He put his hat on.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });
  });

  describe('Restricted: Fossilised Idioms (particle must precede object)', () => {
    // CGEL [40ii,iv]: He carried out his threat ~ ?He carried his threat out
    // CGEL [41]: buy in [food], find out, give off [sound], etc.
    test('He carried out his threat.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('He put on an act.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('She found out the truth.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('The lamp gives off light.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });
  });

  describe('Marginal: Object-First Order in Fossilised Idioms', () => {
    // CGEL marks these as "?" (marginal)
    test('He carried his threat out.', ({ expect, task }) => {
      const result = parse(task.name);
      // Marginal but possibly grammatical - leaving as grammatical test
      expect(result).toBeGrammatical();
    });

    test('He put an act on.', ({ expect, task }) => {
      const result = parse(task.name);
      // Marginal but possibly grammatical
      expect(result).toBeGrammatical();
    });
  });

  describe('Restricted: Idioms Requiring Object-First Order', () => {
    // CGEL [42ii]: *His arrogance turned off people ~ His arrogance turned people off
    // CGEL [43]: answer back, take aback, work over, etc.
    test('His arrogance turned people off.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('The news took us aback.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('They worked him over.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('Leave me alone.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });
  });

  describe('Ungrammatical: Particle-First Blocked in Some Idioms', () => {
    // CGEL [42iia]: *His arrogance turned off people
    test('His arrogance turned off people.', ({ expect, task }) => {
      const result = parse(task.name);
      // "turn off" (disgust) requires object-first order
      expect(result).not.toBeGrammatical();
    });

    test('The news took aback us.', ({ expect, task }) => {
      const result = parse(task.name);
      // "take aback" requires object-first order
      expect(result).not.toBeGrammatical();
    });

    test('They worked over him.', ({ expect, task }) => {
      const result = parse(task.name);
      // "work over" (beat up) requires object-first order
      expect(result).not.toBeGrammatical();
    });
  });
});

// =============================================================================
// Additional: Aspectual Particles
// =============================================================================

describe('CGEL 6.3.1 Aspectual Particles', () => {
  
  describe('Completive/Perfective Aspect', () => {
    // CGEL [37i]: break up, eat up, fill up, give up, etc.
    test('He ate up all the food.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('She filled up the tank.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('The fire fizzled out.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('The shoes wore out.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('He drank up his milk.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });
  });

  describe('Continuative/Durative Aspect', () => {
    // CGEL [37ii]: beaver away, carry on, go on, keep on
    test('She beavered away at the report.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('They carried on working.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('He kept on talking.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });

    test('We pushed on despite the rain.', ({ expect, task }) => {
      const result = parse(task.name);
      expect(result).toBeGrammatical();
    });
  });
});

// =============================================================================
// Additional: Polysemous Verb + Particle Combinations
// =============================================================================

describe('CGEL 6.3.1 Polysemous Combinations (take in)', () => {
  
  describe('Different Senses of "take in"', () => {
    // CGEL [36]: Seven different senses of "take in"
    test('We had better take in the toys.', ({ expect, task }) => {
      const result = parse(task.name);
      // "move into the house"
      expect(result).toBeGrammatical();
    });

    test('They take in students.', ({ expect, task }) => {
      const result = parse(task.name);
      // "rent rooms to"
      expect(result).toBeGrammatical();
    });

    test('I took in your trousers.', ({ expect, task }) => {
      const result = parse(task.name);
      // "tighten"
      expect(result).toBeGrammatical();
    });

    test('Grammar takes in syntax and morphology.', ({ expect, task }) => {
      const result = parse(task.name);
      // "includes"
      expect(result).toBeGrammatical();
    });

    test('We might take in a show.', ({ expect, task }) => {
      const result = parse(task.name);
      // "see/attend"
      expect(result).toBeGrammatical();
    });

    test('I was too tired to take in the information.', ({ expect, task }) => {
      const result = parse(task.name);
      // "grasp/comprehend"
      expect(result).toBeGrammatical();
    });

    test('He was taken in by the scam.', ({ expect, task }) => {
      const result = parse(task.name);
      // "deceived"
      expect(result).toBeGrammatical();
    });
  });
});
