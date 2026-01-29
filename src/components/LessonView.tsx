import { useState } from 'react';
import { Box, Text } from 'ink';
import TextInput from 'ink-text-input';
import { validateRegex } from '../utils/validator.js';
import type { Lesson } from '../types.js';
import type { ValidationResult } from '../utils/validator.js';

interface LessonViewProps {
  readonly lesson: Lesson;
  readonly onComplete: () => void;
  readonly onExit: () => void;
}

export const LessonView = ({ lesson, onComplete, onExit }: LessonViewProps) => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [showHint, setShowHint] = useState(false);

  const handleChange = (value: string) => {
    setInput(value.trim());
  };

  const handleSubmit = () => {
    const trimmedInput = input.trim();

    if (trimmedInput === '?') {
      setShowHint(true);
      setInput('');
      return;
    }

    if (trimmedInput === 'exit') {
      onExit();
      return;
    }

    const validation = validateRegex(trimmedInput, lesson);
    setResult(validation);

    if (validation.passed) {
      setTimeout(onComplete, 800);
    }
  };

  const beltColor =
    lesson.belt === 'white'
      ? 'cyan'
      : lesson.belt === 'yellow'
        ? 'yellow'
        : '#ff7a1a';
  const beltLabel =
    lesson.belt === 'white'
      ? 'White Belt'
      : lesson.belt === 'yellow'
        ? 'Yellow Belt'
        : 'Orange Belt';

  return (
    <Box flexDirection="column" padding={1}>
      <Box marginBottom={1}>
        <Text bold color={beltColor}>
          [{beltLabel}] Lesson {lesson.id}: {lesson.title}
        </Text>
      </Box>

      <Box marginBottom={1}>
        <Text>{lesson.description}</Text>
      </Box>

      <Box flexDirection="column" marginBottom={1} borderStyle="round" borderColor="gray" padding={1}>
        <Box marginBottom={1}>
          <Text bold underline>Test Cases:</Text>
        </Box>
        {lesson.testCases.map((testCase, idx) => (
          <Box key={idx} marginLeft={1}>
            <Text color={testCase.shouldMatch ? 'green' : 'red'}>
              {testCase.shouldMatch ? '✓' : '✗'} "{testCase.input}"
            </Text>
          </Box>
        ))}
      </Box>

      {showHint && lesson.hint && (
        <Box marginBottom={1}>
          <Text color="yellow">💡 Hint: {lesson.hint}</Text>
        </Box>
      )}

      {result && (
        <Box marginBottom={1}>
          {result.passed ? (
            <Text color="green" bold>
              ✓ Correct! Well done!
            </Text>
          ) : result.error ? (
            <Text color="red">✗ Error: {result.error}</Text>
          ) : result.failedCase ? (
            <Box flexDirection="column">
              <Text color="red">✗ Failed test case:</Text>
              <Text color="red">
                Input: "{result.failedCase.input}" - Expected{' '}
                {result.failedCase.shouldMatch ? 'match' : 'no match'}
              </Text>
            </Box>
          ) : null}
        </Box>
      )}

      <Box>
        <Box marginRight={1}>
          <Text>Your regex: /</Text>
        </Box>
        <TextInput value={input} onChange={handleChange} onSubmit={handleSubmit} />
        <Box marginLeft={1}>
          <Text>/</Text>
        </Box>
      </Box>

      <Box marginTop={1}>
        <Text dimColor>Type ? for hint • Type exit to return to menu</Text>
      </Box>
    </Box>
  );
};
