import Conf from 'conf';
import type { UserProgress } from './types.js';

const config = new Conf<UserProgress>({
  projectName: 'regkata',
  defaults: {
    completedLessons: [],
    lastLesson: 0,
  },
});

export const getProgress = (): UserProgress => ({
  completedLessons: config.get('completedLessons', []),
  lastLesson: config.get('lastLesson', 0),
});

export const markLessonComplete = (lessonId: number): void => {
  const completed = config.get('completedLessons', []);
  if (!completed.includes(lessonId)) {
    config.set('completedLessons', [...completed, lessonId]);
  }
  config.set('lastLesson', lessonId);
};

export const getNextUncompletedLesson = (): number => {
  const completed = config.get('completedLessons', []);
  const lastLesson = config.get('lastLesson', 0);
  return lastLesson + 1;
};

export const isLessonCompleted = (lessonId: number): boolean => {
  const completed = config.get('completedLessons', []);
  return completed.includes(lessonId);
};

export const resetProgress = (): void => {
  config.clear();
};
