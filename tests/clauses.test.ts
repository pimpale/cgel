/**
 * Test file for content clause constructions.
 * Examples from src/gen_englishGrammar.py
 */

import { describe, test } from 'vitest';
import { parse } from './matchers';

describe('That-Declarative Clauses', () => {
  test('I knew that you eat.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('He believed that the suspect was Joe today.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('We figured out that he was lying.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('Bare Declarative Clauses', () => {
  test('I made you eat.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('He said the suspect was Joe today.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('He made out he was sick.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('Interrogative Content Clauses (Closed)', () => {
  // Whether/if introduces closed interrogative
  test('I know whether he eats the apple.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('I know whether they eat the apple.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('He asked whether Joe left today.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('Interrogative Content Clauses (Open)', () => {
  // Wh-word introduces open interrogative
  test('I knew what you eat.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('I know who eats that.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('I know which people eat that.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('I know what he ate.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('I know what they ate.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('I know where he goes.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('I know where they go.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('I figured out what he meant.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('She worked out how to do it.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('Exclamative Content Clauses', () => {
  test('I said how expensive it was.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('He exclaimed how tall she was today.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('Verb + IO + That-Declarative', () => {
  test('I told you that you eat the apple.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('He told you that the suspect was Joe today.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('Verb + IO + Bare Declarative', () => {
  test('I told you you eat the apple.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('He told you the suspect was Joe today.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('Verb + IO + Exclamative', () => {
  test('I told you how expensive it was.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('He told you how tall she was today.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('Verb + IO + Interrogative', () => {
  test('I asked you what you eat.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('He asked you whether Joe left today.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('Particle + That-Declarative', () => {
  test('She tipped him off that the police were coming.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('Particle + Bare Declarative', () => {
  test('She tipped him off the police were coming.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('Fused Relative Clauses', () => {
  // Singular fused relatives
  test('What I was mailed arrived.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  // Plural fused relatives
  test('Whatever things happen are fine.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});

describe('Restrictive Relative Clauses', () => {
  test('The box that is on the table fell.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
    expect(result).toHaveConstituent({ in: ['box', 'that'], out: 'fell' });
  });

  test('The boxes that are on the table fell.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('The book on the table fell.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
    expect(result).toHaveConstituent({ in: ['book', 'table'], out: 'fell' });
  });
});

describe('Adjectives with Content Clauses', () => {
  test('He is happy that you are here.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('He is happy you are here.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });

  test('He is happy to be here.', ({ expect, task }) => {
    const result = parse(task.name);
    expect(result).toBeGrammatical();
  });
});
