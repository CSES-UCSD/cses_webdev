import React, { useEffect, useRef } from 'react';

// Cursor effects for pointer devices:
//   - a light blue dot (theme color) replaces the system cursor
//   - a soft spotlight follows the cursor across the page background, with a
//     chain of colored ones trailing behind it
//   - every .glow-card (styled with glowCard() in theme.ts) gets the pointer
//     position relative to itself, so cards light up under the pointer
// Touch devices get none of this: there is no hovering pointer to follow.
const DOT_SIZE = 14;
const SPOTLIGHT_SIZE = 1400;
// Each trailing spotlight replays the pointer's path `delay` frames late, so the
// chain follows the exact line the cursor drew instead of cutting corners.
const TRAIL = [
  { size: 800, delay: 6, color: '168, 85, 247', alpha: 0.16 }, // purple
  { size: 720, delay: 14, color: '59, 130, 246', alpha: 0.13 }, // blue
  { size: 640, delay: 24, color: '45, 212, 191', alpha: 0.1 }, // teal
];
const TRAIL_SMOOTHING = 0.35; // eases out the jumps between recorded frames
const HISTORY_FRAMES = TRAIL[TRAIL.length - 1].delay + 1;
const INTERACTIVE = 'a, button, [role="button"], input, select, textarea, label, summary';

const CursorEffects = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const dot = dotRef.current;
    const spotlight = spotlightRef.current;
    const trail = trailRefs.current;
    if (
      !dot ||
      !spotlight ||
      trail.some((el) => !el) ||
      !window.matchMedia('(pointer: fine)').matches
    )
      return;
    const root = document.documentElement;
    root.classList.add('cursor-effects-active');
    let frame = 0;
    let x = -9999;
    let y = -9999;
    let hovering = false;

    const update = () => {
      frame = 0;
      dot.style.transform = `translate3d(${x - DOT_SIZE / 2}px, ${y - DOT_SIZE / 2}px, 0) scale(${hovering ? 2.2 : 1})`;
      spotlight.style.transform = `translate3d(${x - SPOTLIGHT_SIZE / 2}px, ${y - SPOTLIGHT_SIZE / 2}px, 0)`;
      document.querySelectorAll<HTMLElement>('.glow-card').forEach((card) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--glow-x', `${x - rect.left}px`);
        card.style.setProperty('--glow-y', `${y - rect.top}px`);
      });
    };
    // Batch to once per frame. Scrolling moves cards under a still pointer, so it updates too.
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    // Pointer position recorded every frame (newest first) while the trail is moving.
    const history: { x: number; y: number }[] = [];
    const trailPos = TRAIL.map(() => ({ x, y }));
    let trailFrame = 0;
    const moveTrail = () => {
      history.unshift({ x, y });
      if (history.length > HISTORY_FRAMES) history.pop();
      let settled = true;
      TRAIL.forEach((spot, i) => {
        const target = history[Math.min(spot.delay, history.length - 1)];
        const pos = trailPos[i];
        pos.x += (target.x - pos.x) * TRAIL_SMOOTHING;
        pos.y += (target.y - pos.y) * TRAIL_SMOOTHING;
        if (Math.hypot(x - pos.x, y - pos.y) > 0.5) settled = false;
        trail[i]!.style.transform =
          `translate3d(${pos.x - spot.size / 2}px, ${pos.y - spot.size / 2}px, 0)`;
      });
      // Stop once the whole chain has caught up; the next move restarts it.
      if (settled) {
        trailFrame = 0;
        history.length = 0;
      } else {
        trailFrame = requestAnimationFrame(moveTrail);
      }
    };

    const onMove = (e: PointerEvent) => {
      // Start the colored spotlights on the pointer rather than sweeping in from off-screen.
      if (x === -9999)
        trailPos.forEach((pos) => Object.assign(pos, { x: e.clientX, y: e.clientY }));
      x = e.clientX;
      y = e.clientY;
      hovering = e.target instanceof Element && !!e.target.closest(INTERACTIVE);
      root.style.setProperty('--glow-alpha', '0.2');
      root.style.setProperty('--glow-alpha-edge', '0.6');
      dot.style.opacity = '1';
      spotlight.style.opacity = '1';
      trail.forEach((el) => (el!.style.opacity = '1'));
      schedule();
      if (!trailFrame) trailFrame = requestAnimationFrame(moveTrail);
    };
    const onLeave = () => {
      root.style.setProperty('--glow-alpha', '0');
      root.style.setProperty('--glow-alpha-edge', '0');
      dot.style.opacity = '0';
      spotlight.style.opacity = '0';
      trail.forEach((el) => (el!.style.opacity = '0'));
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('scroll', schedule, { passive: true });
    root.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(trailFrame);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', schedule);
      root.removeEventListener('pointerleave', onLeave);
      root.classList.remove('cursor-effects-active');
      root.style.removeProperty('--glow-alpha');
      root.style.removeProperty('--glow-alpha-edge');
    };
  }, []);

  return (
    <>
      {/* Furthest back first, so each spotlight draws on top of the one trailing it. */}
      {[...TRAIL].reverse().map((spot) => (
        <div
          key={spot.color}
          ref={(el) => (trailRefs.current[TRAIL.indexOf(spot)] = el)}
          aria-hidden="true"
          className="cursor-spotlight"
          style={{
            width: spot.size,
            height: spot.size,
            background: `radial-gradient(circle, rgba(${spot.color}, ${spot.alpha}) 0%, rgba(${spot.color}, ${spot.alpha * 0.4}) 35%, rgba(${spot.color}, 0) 70%)`,
          }}
        />
      ))}
      <div
        ref={spotlightRef}
        aria-hidden="true"
        className="cursor-spotlight"
        style={{ width: SPOTLIGHT_SIZE, height: SPOTLIGHT_SIZE }}
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="cursor-dot"
        style={{ width: DOT_SIZE, height: DOT_SIZE }}
      />
    </>
  );
};

export default CursorEffects;
