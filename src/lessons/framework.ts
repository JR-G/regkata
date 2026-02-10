import type { Lesson } from "../types.js";
import { validateRegex } from "../utils/validator.js";

const fail = (message: string): never => {
  throw new Error(`Invalid lesson catalog: ${message}`);
};

const assertNonEmptyText = (value: string, path: string): void => {
  if (typeof value !== "string" || value.trim().length === 0) {
    fail(`${path} must be a non-empty string`);
  }
};

const assertTestCases = (lesson: Lesson): void => {
  if (!Array.isArray(lesson.testCases) || lesson.testCases.length < 3) {
    fail(`lesson ${lesson.id} must define at least 3 test cases`);
  }

  let hasPositive = false;
  let hasNegative = false;

  lesson.testCases.forEach((testCase, caseIndex) => {
    if (typeof testCase.input !== "string") {
      fail(`lesson ${lesson.id} test case ${caseIndex + 1} input must be a string`);
    }

    if (testCase.shouldMatch) {
      hasPositive = true;
    } else {
      hasNegative = true;
    }
  });

  if (!hasPositive || !hasNegative) {
    fail(`lesson ${lesson.id} must include both matching and non-matching test cases`);
  }
};

const assertLesson = (lesson: Lesson, expectedId: number): void => {
  if (!Number.isInteger(lesson.id) || lesson.id !== expectedId) {
    fail(
      `lesson id ${lesson.id} is invalid; expected integer id ${expectedId} (no gaps, starts at 1)`
    );
  }

  assertNonEmptyText(lesson.title, `lesson ${lesson.id} title`);
  assertNonEmptyText(lesson.description, `lesson ${lesson.id} description`);
  assertNonEmptyText(lesson.solution, `lesson ${lesson.id} solution`);

  if (lesson.hint !== undefined) {
    assertNonEmptyText(lesson.hint, `lesson ${lesson.id} hint`);
  }

  assertTestCases(lesson);

  const validation = validateRegex(lesson.solution, lesson);
  if (!validation.passed) {
    fail(`lesson ${lesson.id} solution does not satisfy its own test cases`);
  }
};

export const defineLessonCatalog = (lessons: readonly Lesson[]): readonly Lesson[] => {
  if (!Array.isArray(lessons) || lessons.length === 0) {
    fail("catalog must contain at least one lesson");
  }

  lessons.forEach((lesson, index) => {
    assertLesson(lesson, index + 1);
  });

  return lessons;
};
