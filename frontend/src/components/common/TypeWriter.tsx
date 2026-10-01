import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { keyframes } from '@mui/system';
import { visuallyHidden } from '@mui/utils';
import { useReducedMotion } from 'framer-motion';

const blink = keyframes`
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
`;

interface TypeWriterProps {
  text: string;
  // Color of the blinking caret.
  accent?: string;
  // Wait before the first character, in ms.
  startDelay?: number;
  // Time between characters, in ms.
  speed?: number;
}

// Types `text` out one character at a time with a blinking caret. The characters still to
// come are rendered invisibly, so the paragraph is its final size from the start and
// nothing below it jumps as it types. Screen readers get the full text immediately.
const TypeWriter = ({ text, accent = '#FFFFFF', startDelay = 0, speed = 14 }: TypeWriterProps) => {
  const reduceMotion = useReducedMotion();
  const [count, setCount] = useState(reduceMotion ? text.length : 0);

  useEffect(() => {
    if (reduceMotion) {
      setCount(text.length);
      return;
    }
    setCount(0);
    let typed = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        typed += 1;
        setCount(typed);
        if (typed >= text.length && interval) clearInterval(interval);
      }, speed);
    }, startDelay);
    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, [text, startDelay, speed, reduceMotion]);

  return (
    <>
      <Box component="span" sx={visuallyHidden}>
        {text}
      </Box>
      <span aria-hidden="true">
        {text.slice(0, count)}
        {count < text.length && (
          // Zero-width, so the caret never changes where the text wraps.
          <Box
            component="span"
            sx={{ display: 'inline-block', position: 'relative', width: 0, height: '1em' }}
          >
            <Box
              component="span"
              sx={{
                position: 'absolute',
                left: '1px',
                top: '0.12em',
                bottom: '0.08em',
                width: '2px',
                backgroundColor: accent,
                animation: `${blink} 0.9s steps(1) infinite`,
              }}
            />
          </Box>
        )}
        <span style={{ visibility: 'hidden' }}>{text.slice(count)}</span>
      </span>
    </>
  );
};

export default TypeWriter;
