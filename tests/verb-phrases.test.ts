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
