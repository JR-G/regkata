import type { Lesson, TestCase } from '../types.js';

export interface ValidationResult {
  readonly passed: boolean;
  readonly failedCase?: TestCase;
  readonly error?: string;
}

export const validateRegex = (pattern: string, lesson: Lesson): ValidationResult => {
  if (!pattern) {
    return {
      passed: false,
      error: 'Please enter a regex pattern',
    };
  }

  let regex: RegExp;
  try {
    regex = new RegExp(pattern);
  } catch (error) {
    return {
      passed: false,
      error: error instanceof Error ? error.message : 'Invalid regex pattern',
    };
  }

  const failedCase = lesson.testCases.find(
    testCase => regex.test(testCase.input) !== testCase.shouldMatch
  );

  return failedCase
    ? { passed: false, failedCase }
    : { passed: true };
};
