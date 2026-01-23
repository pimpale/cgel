/**
 * Test file for passive voice constructions.
 * Examples from src/gen_englishGrammar.py
 */

import { describe, test } from 'vitest';
import { parse } from './matchers';

describe('Basic Passive', () => {
  test('He was eaten.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('The apple was eaten.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('Monotransitive Passive', () => {
  test('The janitor was seen today.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('Complex-Transitive Passive', () => {
  test('He was found guilty.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('The janitor was found guilty today.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('Raised Object + To-Infinitive Passive', () => {
  test('You were asked to leave.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('You were asked to leave today.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('IO + That-Clause Passive', () => {
  test('You were told that the suspect was Joe.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('You were told that the suspect was Joe today.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('IO + Bare Declarative Passive', () => {
  test('You were told the suspect was Joe.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('You were told the suspect was Joe today.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('IO + Exclamative Passive', () => {
  test('You were told how tall she was.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('You were told how tall she was today.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('IO + Interrogative Passive', () => {
  test('You were asked whether Joe left.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('You were asked whether Joe left today.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('IO Promoted Passive (Ditransitive)', () => {
  test('You were given food.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('You were given food today.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('DO Promoted Passive (Dative)', () => {
  test('Food was given to you.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('Food was given to you today.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('Prepositional Passive', () => {
  test('The book was referred to.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('The book was referred to today.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('Particle Passive (Structure II)', () => {
  test('The label was taken off.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('The label was taken off yesterday.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('O + Particle + That-Clause Passive', () => {
  test('He was tipped off that the police were coming.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('O + Particle + Bare Declarative Passive', () => {
  test('He was tipped off the police were coming.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('Structure III Passive', () => {
  test('He was run off another copy.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('Reduced Relative Passive Clauses', () => {
  test('The horse raced past the barn fell.', ({ expect, task }) => {
    const result = parse(task.name);
    // Garden path sentence - should be grammatical
    expect(result).toBeGrammatical();
  });
});
