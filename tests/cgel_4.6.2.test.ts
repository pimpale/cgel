/**
 * Test file for CGEL 4.6.2 (Chapter 4, §6.2):
 * "The 'verb – particle – object' construction" (pp. 280–283).
 *
 * A particle (e.g. "off" in "take off the label") is an intransitive preposition
 * functioning as a complement of the verb; it contrasts with a transitive
 * preposition (e.g. "off" in "jump off the wall"), which heads a PP. CGEL
 * distinguishes the two with five diagnostics — the particle+NP and prep+NP
 * constructions behave oppositely on each:
 *   (a) particle+NP order can be reversed; prep+NP cannot                [27]
 *   (b) only a transitive preposition can be followed by an unstressed
 *       personal pronoun                                                 [28]
 *   (c) transitive PPs can be fronted/foregrounded; particle+NP cannot   [29]
 *   (d) a transitive preposition can be repeated in coordination;
 *       a particle cannot                                                [30]
 *   (e) a manner adverb can be inserted before a transitive preposition,
 *       but not before a particle                                       [31]
 *
 * Also covered: the defining contrast with "downstairs" [24], homonymous
 * particle/preposition sequences [32], and the transitive-PP ~ NP+intransitive-
 * preposition alternation [33].
 *
 * Documented gaps (grammar does not yet distinguish the two structures on a given
 * diagnostic) are marked with `knownLimitation` rather than failing the suite.
 */

import { describe, test } from 'vitest';
import { parse, knownLimitation } from './matchers';

// =============================================================================
// [24] Particle exemplified and defined (particle "down" vs adverb "downstairs")
// =============================================================================

describe('CGEL 4.6.2 [24] Particle vs adverb (down / downstairs)', () => {
  // [24i] The particle CAN precede or follow the object.
  test('She brought down the bed.', ({ expect, task }) => {
    expect(parse(task.name)).toBeGrammatical();
  });

  test('She brought the bed down.', ({ expect, task }) => {
    expect(parse(task.name)).toBeGrammatical();
  });

  // [24ii] The adverb "downstairs" can only follow the object.
  test('She brought downstairs the bed.', ({ expect, task }) => {
    // *She brought downstairs the bed.
    expect(parse(task.name)).not.toBeGrammatical();
  });

  test('She brought the bed downstairs.', ({ expect, task }) => {
    expect(parse(task.name)).toBeGrammatical();
  });
});

// =============================================================================
// [26] The contrast: V – particle – NP vs V – [preposition + NP]
// =============================================================================

describe('CGEL 4.6.2 [26] V – particle – NP vs V – [preposition + NP]', () => {
  // [26a] particle: "the label" is object of the verb
  test('She took off the label.', ({ expect, task }) => {
    expect(parse(task.name)).toBeGrammatical();
  });

  // [26b] preposition: "off the wall" is a PP complement
  test('She jumped off the wall.', ({ expect, task }) => {
    expect(parse(task.name)).toBeGrammatical();
  });
});

// =============================================================================
// (a) [27] The particle+NP order can be reversed; preposition+NP cannot
// =============================================================================

describe('CGEL 4.6.2 (a) Order reversal [27]', () => {
  // [27ii-a] particle can follow the object
  test('She took the label off.', ({ expect, task }) => {
    expect(parse(task.name)).toBeGrammatical();
  });

  // [27ii-b] *She jumped the wall off. — preposition cannot be stranded this way
  test('She jumped the wall off.', ({ expect, task }) => {
    expect(parse(task.name)).not.toBeGrammatical();
  });
});

// =============================================================================
// (b) [28] Only a transitive preposition can be followed by an unstressed pronoun
// =============================================================================

describe('CGEL 4.6.2 (b) Unstressed pronoun object [28]', () => {
  // [28a] *She took off it. — particle cannot immediately precede a pronoun
  knownLimitation('She took off it.', ({ expect, task }) => {
    // The grammar currently allows "off it" as a PP after "took", over-generating.
    expect(parse(task.name)).not.toBeGrammatical();
  });

  // The grammatical particle order is "She took it off."
  test('She took it off.', ({ expect, task }) => {
    expect(parse(task.name)).toBeGrammatical();
  });

  // [28b] She jumped off it. — transitive preposition may be followed by a pronoun
  test('She jumped off it.', ({ expect, task }) => {
    expect(parse(task.name)).toBeGrammatical();
  });
});

// =============================================================================
// (c) [29] Transitive PPs can be fronted/foregrounded; particle+NP cannot
// =============================================================================

describe('CGEL 4.6.2 (c) Fronting / foregrounding [29]', () => {
  // [29i] relative: a. *particle / b. preposition
  test('The label off which she took was blue.', ({ expect, task }) => {
    // *the label off which she took
    expect(parse(task.name)).not.toBeGrammatical();
  });

  test('The wall off which she jumped was high.', ({ expect, task }) => {
    expect(parse(task.name)).toBeGrammatical();
  });

  // [29ii] open interrogative: a. *particle / b. preposition
  test('Off which label did she take?', ({ expect, task }) => {
    // *Off which label did she take?
    expect(parse(task.name)).not.toBeGrammatical();
  });

  test('Off which wall did she jump?', ({ expect, task }) => {
    expect(parse(task.name)).toBeGrammatical();
  });

  // [29iii] it-cleft: a. *particle / b. preposition
  knownLimitation('It was off this label that she took.', ({ expect, task }) => {
    // CGEL rejects the fronted particle, but the grammar accepts "off this label"
    // as a PP, over-generating.
    expect(parse(task.name)).not.toBeGrammatical();
  });

  test('It was off this wall that she jumped.', ({ expect, task }) => {
    expect(parse(task.name)).toBeGrammatical();
  });
});

// =============================================================================
// (d) [30] A transitive preposition can be repeated in coordination; a particle cannot
// =============================================================================

describe('CGEL 4.6.2 (d) Coordination of phrases [30]', () => {
  // [30a] *Did she take off the red label or off the yellow one?
  knownLimitation('Did she take off the red label or off the yellow one?', ({ expect, task }) => {
    // CGEL rejects the repeated particle, but the grammar accepts the coordinated
    // "off"-PPs, over-generating.
    expect(parse(task.name)).not.toBeGrammatical();
  });

  // [30b] Did she jump off the wall or off the balcony?
  test('Did she jump off the wall or off the balcony?', ({ expect, task }) => {
    expect(parse(task.name)).toBeGrammatical();
  });
});

// =============================================================================
// (e) [31] A manner adverb can be inserted before a transitive preposition, not a particle
// =============================================================================

describe('CGEL 4.6.2 (e) Manner adverb insertion [31]', () => {
  // [31a] *She took carefully off the label.
  test('She took carefully off the label.', ({ expect, task }) => {
    expect(parse(task.name)).not.toBeGrammatical();
  });

  // [31b] She jumped fearlessly off the wall.
  test('She jumped fearlessly off the wall.', ({ expect, task }) => {
    expect(parse(task.name)).toBeGrammatical();
  });
});

// =============================================================================
// [32] Homonymous sequences: same item as particle [a] vs transitive preposition [b]
// =============================================================================

describe('CGEL 4.6.2 [32] Homonymous particle / preposition sequences', () => {
  // [32i]
  test('He shouted down his opponent.', ({ expect, task }) => {
    expect(parse(task.name)).toBeGrammatical();
  });
  test('He shouted down the phone.', ({ expect, task }) => {
    expect(parse(task.name)).toBeGrammatical();
  });

  // [32ii]
  test('They turned in the fugitives.', ({ expect, task }) => {
    expect(parse(task.name)).toBeGrammatical();
  });
  test('They turned in the wrong direction.', ({ expect, task }) => {
    expect(parse(task.name)).toBeGrammatical();
  });

  // [32iii]
  test('She ran off another copy.', ({ expect, task }) => {
    expect(parse(task.name)).toBeGrammatical();
  });
  test('She ran off the road.', ({ expect, task }) => {
    expect(parse(task.name)).toBeGrammatical();
  });

  // [32iv] "get over" is fossilised (CGEL note)
  test('He got over his message clearly.', ({ expect, task }) => {
    expect(parse(task.name)).toBeGrammatical();
  });
  test('He got over his disappointment quickly.', ({ expect, task }) => {
    expect(parse(task.name)).toBeGrammatical();
  });
});

// =============================================================================
// [33] Alternation: transitive PP ~ NP + intransitive preposition (through, over)
// =============================================================================

describe('CGEL 4.6.2 [33] Transitive-PP ~ NP + intransitive-preposition alternation', () => {
  // [33i] read through
  test('She read through the prospectus.', ({ expect, task }) => {
    expect(parse(task.name)).toBeGrammatical();
  });
  knownLimitation('She read the prospectus through.', ({ expect, task }) => {
    // The NP + stranded intransitive-preposition order is not yet supported.
    expect(parse(task.name)).toBeGrammatical();
  });

  // [33ii] look over
  knownLimitation('She looked over the letters.', ({ expect, task }) => {
    // "look over" is not yet in the lexicon as a transitive-PP verb.
    expect(parse(task.name)).toBeGrammatical();
  });
  knownLimitation('She looked the letters over.', ({ expect, task }) => {
    expect(parse(task.name)).toBeGrammatical();
  });
});
