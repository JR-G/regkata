import { useState, useEffect } from 'react';
import { Text } from 'ink';

interface ShimmerTextProps {
  readonly children: string;
}

type Color = 'cyan' | 'cyanBright' | 'white';

export const ShimmerText = ({ children }: ShimmerTextProps) => {
  const [offset, setOffset] = useState<number>(0);

  useEffect(() => {
    const timer: NodeJS.Timeout = setInterval(() => {
      setOffset(prev => (prev + 1) % (children.length * 2));
    }, 100);
    return () => clearInterval(timer);
  }, [children.length]);

  const colors: readonly Color[] = ['cyan', 'cyan', 'cyanBright', 'white', 'cyanBright', 'cyan', 'cyan'] as const;

  return (
    <Text bold>
      {children.split('').map((char: string, index: number) => {
        const position: number = (index - offset + children.length * 2) % (children.length * 2);
        const colorIndex: number = Math.floor((position / children.length) * colors.length);
        const color: Color = colors[Math.min(colorIndex, colors.length - 1)] ?? 'cyanBright';

        return (
          <Text key={index} color={color}>
            {char}
          </Text>
        );
      })}
    </Text>
  );
};
