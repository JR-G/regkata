import { useEffect } from 'react';
import { Box, Text } from 'ink';
import { welcomeArt } from '../utils/ascii-art.js';

interface WelcomeProps {
  readonly onContinue: () => void;
}

export const Welcome = ({ onContinue }: WelcomeProps) => {
  useEffect(() => {
    const timer = setTimeout(onContinue, 1000);
    return () => clearTimeout(timer);
  }, [onContinue]);

  return (
    <Box flexDirection="column" alignItems="center" justifyContent="center">
      <Text color="cyan">{welcomeArt}</Text>
    </Box>
  );
};
