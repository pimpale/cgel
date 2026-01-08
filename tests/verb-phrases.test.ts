/**
 * Test file for verb phrase constructions.
 * Examples from src/gen_englishGrammar.py
 */

import { describe, test } from 'vitest';
import { parse } from './matchers';

describe('Intransitive Verbs', () => {
  test('I smoked.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('The horse ran.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('Monotransitive Verbs', () => {
  test('I ate the apple.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
    expect(result).toHaveConstituent({ in: ['the', 'apple'], out: 'ate' });
  });

  test('I saw the suspect today.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('Copular Verbs with Predicative Complement', () => {
  test('You seemed happy.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('He is good.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('He is a good boy.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('Catenative Verbs with To-Infinitive', () => {
  test('I wanted to bring the book.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('He wanted to eat today.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('He wanted badly to eat food.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('Catenative Verbs with Bare Infinitive', () => {
  test('I helped clean.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('Catenative Verbs with Raised Object + To-Infinitive', () => {
  test('I asked you to eat the apple.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('He asked you to leave today.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('Catenative Verbs with Raised Object + Bare Infinitive', () => {
  test('I made you eat the apple.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('He made you eat vegetables yesterday.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('Complex-Transitive with Predicative Complement', () => {
  test('I found you happy.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('I found the suspect guilty today.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('Ditransitive Verbs (Double Object)', () => {
  test('I gave you food.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('He gave you the book today.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('Ditransitive Verbs (Dative Shift)', () => {
  test('I gave food to you.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('He gave the book to Mary today.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('Progressive Aspect', () => {
  test('We are eating.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('They are playing.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('Perfect Aspect', () => {
  test('He had eaten.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('The vase has broken.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('Particle Constructions (CGEL 6.3.2 Structure I + IV)', () => {
  test('He gave in.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('He gave in yesterday.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('Particle + Predicative Complement (CGEL 6.3.2 Structure VI)', () => {
  test('She ended up happy.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('The meeting turned out fine.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('Particle + To-Infinitive', () => {
  test('The answer turned out to be wrong.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('Particle + Gerund', () => {
  test('She kept on working.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('Particle + Object (CGEL 6.3.2 Structure II + V)', () => {
  // Particle-first order
  test('She took off the label.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  // Particle-after order
  test('She took the label off.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('She took off the label yesterday.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('Object + Particle + Predicative Complement (CGEL 6.3.2 Structure VII)', () => {
  test('This showed him up as spineless.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('Object + Particle + Object (CGEL 6.3.2 Structure III)', () => {
  test('I ran him off another copy.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('Adverb Placement', () => {
  test('He quickly ran.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('He ran quickly.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('He very quickly ran.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('Modal Verbs', () => {
  test('John can eat.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('John should eat the apple.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('John will run.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});
