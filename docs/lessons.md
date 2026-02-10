# Lesson Authoring Guide

`regkata` lessons are defined in `src/lessons/index.ts` and validated by `defineLessonCatalog` in `src/lessons/framework.ts`.

## Required fields

- `id`: integer, sequential, starts at `1`, no gaps.
- `title`: short, non-empty.
- `description`: clear prompt explaining the target behavior.
- `type`: currently `match`.
- `belt`: current progression belt (`white`, `yellow`, `orange`).
- `testCases`: at least 3, with both `shouldMatch: true` and `shouldMatch: false`.
- `solution`: non-empty regex that passes all test cases.
- `hint` (optional): concise directional guidance.

## Authoring checklist

1. Add lesson to `src/lessons/index.ts` with the next sequential `id`.
2. Include edge cases in test cases, not only happy paths.
3. Keep lesson prompt and hint aligned with the expected regex concept.
4. Run `bun run check` before opening a PR.

## Validation gates

- Runtime guard: `defineLessonCatalog` enforces catalog invariants at startup.
- Unit tests: `tests/lesson-framework.test.ts` verifies framework rules.
- Catalog test: `tests/lessons.test.ts` validates every lesson solution against its test cases.
