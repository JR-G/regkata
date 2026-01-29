import { describe, expect, test } from 'bun:test';
import { lessons } from '../src/lessons/index.js';
import { validateRegex } from '../src/utils/validator.js';

const lessonIds = lessons.map(lesson => lesson.id);

describe('lessons catalog', () => {
  test('lesson ids are unique and sequential starting at 1', () => {
    const sorted = [...lessonIds].sort((a, b) => a - b);
    expect(sorted[0]).toBe(1);
    sorted.forEach((id, index) => {
      expect(id).toBe(index + 1);
    });
  });

  test('each lesson has at least one test case', () => {
    lessons.forEach(lesson => {
      expect(lesson.testCases.length).toBeGreaterThan(0);
    });
  });

  test('solutions pass their own test cases', () => {
    lessons.forEach(lesson => {
      const result = validateRegex(lesson.solution, lesson);
      expect(result.passed).toBe(true);
    });
  });
});
