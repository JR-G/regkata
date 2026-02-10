import { describe, expect, test } from 'bun:test';
import { lessons } from '../src/lessons/index.js';
import { validateRegex } from '../src/utils/validator.js';
import type { Belt } from '../src/types.js';

const lessonIds = lessons.map(lesson => lesson.id);
const beltOrder: Record<Belt, number> = {
  white: 1,
  yellow: 2,
  orange: 3,
  blue: 4,
};

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

  test('belt progression is ordered and each belt has lessons', () => {
    const seenBelts = new Set<Belt>();
    let highestBelt = 0;

    lessons.forEach(lesson => {
      const current = beltOrder[lesson.belt];
      expect(current).toBeGreaterThanOrEqual(highestBelt);
      highestBelt = current;
      seenBelts.add(lesson.belt);
    });

    (Object.keys(beltOrder) as Belt[]).forEach(belt => {
      expect(seenBelts.has(belt)).toBe(true);
    });
  });

  test('solutions pass their own test cases', () => {
    lessons.forEach(lesson => {
      const result = validateRegex(lesson.solution, lesson);
      expect(result.passed).toBe(true);
    });
  });
});
