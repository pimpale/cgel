/**
 * Test file for coordination constructions.
 * Examples from src/gen_englishGrammar.py
 */

import { describe, test } from 'vitest';
import { parse } from './matchers';

describe('Clause Coordination with AND', () => {
  // Asyndetic: "I came, I saw, I conquered"
  test('I came, I saw, I conquered.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  // Binary syndetic: "X and Y"
  test('John ran and Mary walked.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('Clause Coordination with OR', () => {
  // Binary syndetic: "X or Y"
  test('John ran or Mary walked.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('Clause Coordination with EITHER-OR', () => {
  // Binary: "either X or Y"
  test('Either John ran or Mary walked.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('Clause Coordination with BUT', () => {
  // Binary only: "X but Y"
  test('John ran but Mary walked.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('Clause Coordination with NOR (requires inversion)', () => {
  // Binary: "He won't go, nor will I"
  test('He won\'t go, nor will I.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('VP Coordination with AND', () => {
  // Binary: "sang and danced"
  test('John sang and danced.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
    // "sang and danced" forms a VP constituent excluding subject
    expect(result).toHaveConstituent({ in: ['sang', 'danced'], out: 'john' });
  });
});

describe('VP Coordination with BOTH-AND', () => {
  // Binary: "both sang and danced"
  test('John both sang and danced.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('VP Coordination with OR', () => {
  // Binary: "sang or danced"
  test('John sang or danced.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('VP Coordination with EITHER-OR', () => {
  // Binary: "either sang or danced"
  test('John either sang or danced.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('VP Coordination with NEITHER-NOR', () => {
  // Binary: "neither sang nor danced"
  test('John neither sang nor danced.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('VP Coordination with BUT', () => {
  // Binary: "tried but failed"
  test('John tried but failed.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('VP Coordination with NOT ONLY-BUT', () => {
  // Binary: "not only sang but danced"
  test('John not only sang but danced.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('NP Coordination with AND', () => {
  // Binary: "John and Mary" (always plural)
  test('John and Mary ran.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
    // Coordinated NP is plural, takes plural verb
    expect(result).toHaveConstituent({ in: ['john', 'mary'], out: 'ran' });
  });

  // Asyndetic: "the cat, the dog, the bird"
  test('Bob, Alice, Carol ran.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('NP Coordination with BOTH-AND', () => {
  // Binary: "both John and Mary" (always plural)
  test('Both John and Mary ran.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('NP Coordination with OR (proximity agreement)', () => {
  // Rightmost conjunct is singular → singular
  test('The cat or the dog runs.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  // Rightmost conjunct is plural → plural
  test('The cat or the dogs run.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('NP Coordination with EITHER-OR', () => {
  // Binary: "either John or Mary" (singular)
  test('Either John or Mary runs.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('NP Coordination with NEITHER-NOR', () => {
  // Binary: "neither John nor Mary" (singular)
  test('Neither John nor Mary runs.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('NP Coordination with BUT NOT', () => {
  // Binary: "John but not Mary" (agrees with first)
  test('John but not Mary runs.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('The cats but not the dog run.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('NP Coordination with NOT ONLY-BUT', () => {
  // Binary: "not only John but Mary" (always plural)
  test('Not only John but Mary run.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('Adjunct Coordination', () => {
  // Binary with AND: "in the house and in the garden"
  test('John ran in the house and in the garden.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  // Binary with BOTH-AND: "both in the house and in the garden"
  test('John ran both in the house and in the garden.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  // Binary with EITHER-OR: "either in the house or in the garden"
  test('John ran either in the house or in the garden.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  // Binary with NEITHER-NOR: "neither in the house nor in the garden"
  test('John ran neither in the house nor in the garden.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('Predicate Complement Coordination', () => {
  // Binary with AND: "happy and tired"
  test('John is happy and tired.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  // Binary with BOTH-AND: "both happy and tired"
  test('John is both happy and tired.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  // Binary with OR: "happy or tired"
  test('John is happy or tired.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  // Binary with NEITHER-NOR: "neither happy nor tired"
  test('John is neither happy nor tired.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  // Binary with BUT: "tired but happy"
  test('John is tired but happy.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('Ungrammatical Coordination', () => {
  // Both-and cannot be used for main clauses
  test('*Both he overslept and his bus arrived late.', ({ expect }) => {
    const result = parse('Both he overslept and his bus arrived late.');
    expect(result).not.toBeGrammatical();
  });

  // Neither-nor cannot be used for main clauses (without inversion)
  test('*Neither he overslept nor his bus arrived late.', ({ expect }) => {
    const result = parse('Neither he overslept nor his bus arrived late.');
    expect(result).not.toBeGrammatical();
  });
});
