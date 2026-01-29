import { useEffect, useState } from 'react';
import { Box, Text, useStdout } from 'ink';
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
  const { stdout } = useStdout();

  const nextLesson = lessons.find(
    lesson => !progress.completedLessons.includes(lesson.id)
  );

  const whiteBeltLessons = lessons.filter(lesson => lesson.belt === 'white');
  const yellowBeltLessons = lessons.filter(lesson => lesson.belt === 'yellow');
  const orangeBeltLessons = lessons.filter(lesson => lesson.belt === 'orange');

  const items: MenuItem[] = showAll
    ? [
        ...whiteBeltLessons.map(lesson => ({
          label: `${lesson.id}. ${lesson.title} ${
            progress.completedLessons.includes(lesson.id) ? '✓' : ''
          }`,
          value: `lesson-${lesson.id}`,
        })),
        ...yellowBeltLessons.map(lesson => ({
          label: `${lesson.id}. ${lesson.title} ${
            progress.completedLessons.includes(lesson.id) ? '✓' : ''
          }`,
          value: `lesson-${lesson.id}`,
        })),
        ...orangeBeltLessons.map(lesson => ({
          label: `${lesson.id}. ${lesson.title} ${
            progress.completedLessons.includes(lesson.id) ? '✓' : ''
          }`,
          value: `lesson-${lesson.id}`,
        })),
      ]
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

  useEffect(() => {
    if (showAll && stdout?.isTTY) {
      stdout.write('\x1b[2J\x1b[H');
    }
  }, [showAll, stdout]);

  const selectKey = showAll ? 'all' : 'main';

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
      {showAll && (
        <Box flexDirection="column" marginBottom={1}>
          <Text bold color="cyan">White Belt - Fundamentals</Text>
          <Text color="gray">Lessons 1-15: Core regex patterns</Text>
          <Box marginTop={1}>
            <Text bold color="yellow">Yellow Belt - Real World</Text>
          </Box>
          <Text color="gray">Lessons 16-22: Practical applications</Text>
          <Box marginTop={1}>
            <Text bold color="#ff7a1a">Orange Belt - Advanced</Text>
          </Box>
          <Text color="gray">Lessons 23-26: Pattern fluency</Text>
        </Box>
      )}
      <SelectInput key={selectKey} items={items} onSelect={handleSelect} initialIndex={0} />
    </Box>
  );
};
