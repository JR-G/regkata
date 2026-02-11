import { describe, expect, test } from "bun:test";
import type { Lesson } from "../src/types.js";
import { defineLessonCatalog } from "../src/lessons/framework.js";

const validLesson = (id: number): Lesson => ({
  id,
  title: `Lesson ${id}`,
  description: `Description ${id}`,
  type: "match",
  belt: "white",
  testCases: [
    { input: "abc", shouldMatch: true },
    { input: "xyz", shouldMatch: false },
    { input: "123abc", shouldMatch: true }
  ],
  hint: "Use a simple pattern",
  solution: "abc"
});

describe("defineLessonCatalog", () => {
  test("accepts a valid catalog", () => {
    const catalog = [validLesson(1), validLesson(2)] as const;
    expect(() => defineLessonCatalog(catalog)).not.toThrow();
  });

  test("rejects non-sequential ids", () => {
    const catalog = [validLesson(1), validLesson(3)] as const;
    expect(() => defineLessonCatalog(catalog)).toThrow("expected integer id 2");
  });

  test("rejects lessons with only positive test cases", () => {
    const lesson: Lesson = {
      ...validLesson(1),
      testCases: [
        { input: "abc", shouldMatch: true },
        { input: "abcabc", shouldMatch: true },
        { input: "xabc", shouldMatch: true }
      ]
    };
    expect(() => defineLessonCatalog([lesson])).toThrow("must include both matching and non-matching");
  });

  test("rejects lessons with only negative test cases", () => {
    const lesson: Lesson = {
      ...validLesson(1),
      solution: "zzz",
      testCases: [
        { input: "abc", shouldMatch: false },
        { input: "xyz", shouldMatch: false },
        { input: "123abc", shouldMatch: false }
      ]
    };
    expect(() => defineLessonCatalog([lesson])).toThrow("must include both matching and non-matching");
  });

  test("rejects invalid solutions", () => {
    const lesson: Lesson = { ...validLesson(1), solution: "xyz" };
    expect(() => defineLessonCatalog([lesson])).toThrow(
      "solution does not satisfy its own test cases"
    );
  });
});
