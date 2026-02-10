export type LessonType = 'match' | 'capture' | 'replace';
export type Belt = 'white' | 'yellow' | 'orange' | 'blue';

export interface TestCase {
  readonly input: string;
  readonly shouldMatch: boolean;
  readonly captured?: readonly string[];
}

export interface Lesson {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly type: LessonType;
  readonly belt: Belt;
  readonly testCases: readonly TestCase[];
  readonly hint?: string;
  readonly solution: string;
}

export interface UserProgress {
  readonly completedLessons: readonly number[];
  readonly lastLesson: number;
}

export type AppState =
  | { readonly type: 'welcome' }
  | { readonly type: 'menu' }
  | { readonly type: 'lesson'; readonly lesson: Lesson }
  | { readonly type: 'completed'; readonly lesson: Lesson };
