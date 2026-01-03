/**
 * Test file for simple declarative sentences.
 * 
 * This demonstrates the new test approach where each sentence
 * can have multiple assertions to thoroughly validate the parse.
 */

import { describe, test } from 'vitest';
import { parse } from './matchers';

describe('Simple Declaratives', () => {
  test('The dog ran.', ({ expect }) => {
    const result = parse('The dog ran.');
    
    // Should parse successfully
    expect(result).toBeGrammatical();
    
    // "The dog" forms a constituent (NP) that excludes "ran"
    expect(result).toHaveConstituent({ in: ['the', 'dog'], out: 'ran' });
  });

  test('She read the book.', ({ expect, task }) => {
    const result = parse(task.name);
    
    expect(result).toBeGrammatical();
    
    // "the book" forms a constituent (NP) excluding subject
    expect(result).toHaveConstituent({ in: ['the', 'book'], out: 'she' });
    
    // "read the book" forms a VP excluding subject
    expect(result).toHaveConstituent({ in: ['read', 'book'], out: 'she' });
  });

  test('The big dog ran quickly.', ({ expect, task }) => {
    const result = parse(task.name);
    
    expect(result).toBeGrammatical();
    
    // "big dog" forms a nominal constituent
    expect(result).toHaveConstituent({ in: ['big', 'dog'], out: 'ran' });
    
    // "the big dog" forms NP excluding verb
    expect(result).toHaveConstituent({ in: ['the', 'dog'], out: 'ran' });
  });

  test('John gave Mary a book.', ({ expect, task }) => {
    const result = parse(task.name);
    
    expect(result).toBeGrammatical();
    
    // "a book" forms NP
    expect(result).toHaveConstituent({ in: ['a', 'book'], out: 'mary' });
  });
});

describe('Ungrammatical Sentences', () => {
  test('The dogs runs.', ({ expect, task }) => {
    const result = parse(task.name);
    
    // Should NOT parse - agreement violation
    expect(result).not.toBeGrammatical();
  });

  test('Ran the dog.', ({ expect, task }) => {
    const result = parse(task.name);
    
    expect(result).not.toBeGrammatical();
  });

  test('The the dog ran.', ({ expect, task }) => {
    const result = parse(task.name);
    
    expect(result).not.toBeGrammatical();
  });
});
