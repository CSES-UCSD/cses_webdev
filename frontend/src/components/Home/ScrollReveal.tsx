import { ReactNode, RefObject, useEffect, useRef } from 'react';
import {
  MotionValue,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  useViewportScroll,
} from 'framer-motion';

// Scroll-linked reveals for the sections below the hero. Progress runs 0 → 1 as the
// element's top travels from `startVh` of the screen height down to `startVh - rangeVh`
// (measured from the top of the screen), and plays in reverse when scrolling back up.
const useScrollProgress = (ref: RefObject<HTMLElement>, startVh: number, rangeVh: number) => {
  const { scrollY } = useViewportScroll();
  const progress = useMotionValue(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let start = 0;
    let range = 1;
    const update = (y: number) => progress.set(Math.min(1, Math.max(0, (y - start) / range)));
    const measure = () => {
      const top = el.getBoundingClientRect().top + window.scrollY;
      start = top - window.innerHeight * startVh;
      range = window.innerHeight * rangeVh;
      update(window.scrollY);
    };
    measure();
    window.addEventListener('resize', measure);
    // Images and fonts loading can shift the layout after the first measurement.
    window.addEventListener('load', measure);
    const stopListening = scrollY.onChange(update);
    return () => {
      window.removeEventListener('resize', measure);
      window.removeEventListener('load', measure);
      stopListening();
    };
  }, [ref, startVh, rangeVh, scrollY, progress]);

  return progress;
};

// Rises into place and fades in.
// `startVh` is how far up the screen (as a fraction of its height) the top has to reach
// before it starts; lower values start later, so siblings can be staggered.
// `fullHeight` makes it fill its parent, for cards that stretch to match their row.
export const ScrollRise = ({
  children,
  startVh = 0.92,
  fullHeight = false,
}: {
  children: ReactNode;
  startVh?: number;
  fullHeight?: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const progress = useScrollProgress(ref, startVh, 0.22);
  const opacity = useTransform(progress, [0, 1], [0, 1]);
  const y = useTransform(progress, [0, 1], [48, 0]);
  const size = { width: '100%', ...(fullHeight && { height: '100%' }) };

  return (
    <motion.div ref={ref} style={reduceMotion ? size : { opacity, y, ...size }}>
      {children}
    </motion.div>
  );
};

const Word = ({
  word,
  index,
  count,
  progress,
}: {
  word: string;
  index: number;
  count: number;
  progress: MotionValue<number>;
}) => {
  // Words light up one after another across the progress range, each over a short window.
  const from = (index / count) * 0.8;
  const opacity = useTransform(progress, [from, from + 0.2], [0.18, 1]);
  return <motion.span style={{ opacity }}>{word} </motion.span>;
};

// A paragraph whose words brighten one by one as you scroll through it.
export const ScrollWords = ({ text }: { text: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();
  const progress = useScrollProgress(ref, 0.85, 0.5);
  const words = text.split(' ');

  return (
    <span ref={ref}>
      {reduceMotion
        ? text
        : words.map((word, i) => (
            <Word key={i} word={word} index={i} count={words.length} progress={progress} />
          ))}
    </span>
  );
};
