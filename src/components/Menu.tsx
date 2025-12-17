import { useState } from 'react';
import { Box, Text } from 'ink';
import SelectInput from 'ink-select-input';
import { ShimmerText } from './ShimmerText.js';
import { lessons, getLesson } from '../lessons/index.js';
import { getProgress } from '../store.js';
import type { Lesson } from '../types.js';

interface MenuProps {
  readonly onSelectLesson: (lesson: Lesson) => void;
  readonly onExit: () => void;
}

type MenuItem = {
  readonly label: string;
  readonly value: string;
};

export const Menu = ({ onSelectLesson, onExit }: MenuProps) => {
  const progress = getProgress();
  const [showAll, setShowAll] = useState(false);

  const nextLesson = lessons.find(
    lesson => !progress.completedLessons.includes(lesson.id)
  );

  const items: MenuItem[] = showAll
    ? lessons.map(lesson => ({
        label: `${lesson.id}. ${lesson.title} ${
          progress.completedLessons.includes(lesson.id) ? '✓' : ''
        }`,
        value: `lesson-${lesson.id}`,
      }))
    : [
        ...(nextLesson
          ? [
              {
                label: `Continue: ${nextLesson.id}. ${nextLesson.title}`,
                value: `lesson-${nextLesson.id}`,
              },
            ]
          : []),
        {
          label: 'View all lessons',
          value: 'show-all',
        },
        {
          label: 'Exit',
          value: 'exit',
        },
      ];

  const handleSelect = (item: MenuItem) => {
    if (item.value === 'show-all') {
      setShowAll(true);
      return;
    }

    if (item.value === 'exit') {
      onExit();
      return;
    }

    if (item.value.startsWith('lesson-')) {
      const lessonId = parseInt(item.value.replace('lesson-', ''), 10);
      const lesson = getLesson(lessonId);
      if (lesson) {
        onSelectLesson(lesson);
      }
    }
  };

  return (
    <Box flexDirection="column" padding={1}>
      <Box marginBottom={1}>
        <ShimmerText>REGKATA - Lesson Menu</ShimmerText>
      </Box>
      {progress.completedLessons.length > 0 && (
        <Box marginBottom={1}>
          <Text color="green">
            Progress: {progress.completedLessons.length}/{lessons.length} lessons
            completed
          </Text>
        </Box>
      )}
      <SelectInput items={items} onSelect={handleSelect} />
    </Box>
  );
};
