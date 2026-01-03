/**
 * Test file for interrogative constructions.
 * Examples from src/gen_englishGrammar.py
 */

import { describe, test } from 'vitest';
import { parse } from './matchers';

describe('Yes/No Questions (Subject-Auxiliary Inversion)', () => {
  test('Is he happy?', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('Can you eat?', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('Is he a watchman?', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('Is he eating?', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('Has he eaten?', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('Does he eat?', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('Are you happy?', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('Are you eating?', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('Have you eaten?', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('Do you eat?', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('Wh-Questions with Object Extraction', () => {
  test('What did he eat?', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('What can you sing?', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('What is he eating?', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('What has he eaten?', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('What is he given?', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('What are you eating?', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('What have you eaten?', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('What are you given?', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('Wh-Questions with Subject Extraction', () => {
  test('Who hunts the deer?', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
    // Subject extraction: "who" is subject, no inversion needed
    expect(result).toHaveConstituent({ in: ['the', 'deer'], out: 'who' });
  });

  test('Which people hunt the deer?', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('Wh-Questions with Adjunct Extraction', () => {
  test('Where did you eat?', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('Why did you eat?', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('When did you eat?', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('How-Questions', () => {
  test('How did you eat the apple?', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('How quickly did you eat the apple?', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('Degree How-Questions (AdjP Extraction)', () => {
  test('How happy did Mary become?', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('How is he?', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('How are you?', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('Which-Questions with Determiners', () => {
  test('Which book is yours?', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
    expect(result).toHaveConstituent({ in: ['which', 'book'], out: 'yours' });
  });

  test('Which books are yours?', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('Whose-Questions', () => {
  test('Whose book is this?', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
    expect(result).toHaveConstituent({ in: ['whose', 'book'], out: 'this' });
  });
});

describe('Passive Questions', () => {
  test('Is he eaten?', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('Are you eaten?', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('How is he made?', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('How are you made?', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});
