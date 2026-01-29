import { describe, expect, test } from 'bun:test';
import { validateRegex } from '../src/utils/validator.js';
import type { Lesson } from '../src/types.js';

const lesson: Lesson = {
  id: 0,
  title: 'Test Lesson',
  description: 'Matches foo only',
  type: 'match',
  belt: 'white',
  testCases: [
    { input: 'foo', shouldMatch: true },
    { input: 'foobar', shouldMatch: true },
    { input: 'bar', shouldMatch: false },
  ],
  solution: 'foo',
};

describe('validateRegex', () => {
  test('rejects empty patterns', () => {
    const result = validateRegex('', lesson);
    expect(result.passed).toBe(false);
    expect(result.error).toBe('Please enter a regex pattern');
  });

  test('surfaces invalid regex errors', () => {
    const result = validateRegex('(', lesson);
    expect(result.passed).toBe(false);
    expect(result.error).toBeDefined();
  });

  test('passes when all test cases succeed', () => {
    const result = validateRegex('foo', lesson);
    expect(result.passed).toBe(true);
  });

  test('returns the first failed test case', () => {
    const result = validateRegex('^foo$', lesson);
    expect(result.passed).toBe(false);
    expect(result.failedCase?.input).toBe('foobar');
  });
});
