import { CSSProperties, MouseEvent, ReactNode } from 'react';
import { fonts } from '../../theme';
import './GlassButton.css';

interface GlassButtonProps {
  children: ReactNode;
  // Button colour as a hex string, e.g. '#64C3E3'.
  tint: string;
  // Filled with its colour instead of only tinted: for the selected or primary button.
  active?: boolean;
  // This button is the current page or selection (read out by screen readers).
  current?: boolean;
  // Larger text and padding, for standalone call-to-action buttons.
  size?: 'md' | 'lg';
  // Renders a link instead of a button when set.
  href?: string;
  target?: string;
  rel?: string;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  tabIndex?: number;
}

// '#64C3E3' -> '100, 195, 227', the form the CSS uses inside rgba().
const toRgb = (hex: string) => {
  const value = hex.replace('#', '');
  const full = value.length === 3 ? value.replace(/./g, '$&$&') : value;
  const n = parseInt(full, 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
};

// A frosted-glass pill button: translucent tinted body, a rim light that swivels on hover
// and a highlight that sweeps across. Styles live in GlassButton.css.
const GlassButton = ({
  children,
  tint,
  active = false,
  current = false,
  size = 'md',
  href,
  target,
  rel,
  onClick,
  tabIndex,
}: GlassButtonProps) => {
  const tintStyle = { '--tint': toRgb(tint) } as CSSProperties;
  const wrapStyle = {
    fontFamily: fonts.body,
    ...(size === 'lg' && {
      '--glass-font-size': 'clamp(1rem, 0.92rem + 0.25vw, 1.15rem)',
      '--glass-pad-x': '2em',
      '--glass-pad-y': '0.85em',
    }),
  } as CSSProperties;

  const shared = {
    className: `glass-btn${active ? ' is-active' : ''}`,
    style: tintStyle,
    onClick,
    tabIndex,
    'aria-current': current ? ('page' as const) : undefined,
  };
  const label = <span>{children}</span>;

  return (
    <div className="glass-wrap" style={wrapStyle}>
      {href ? (
        <a {...shared} href={href} target={target} rel={rel}>
          {label}
        </a>
      ) : (
        <button type="button" {...shared}>
          {label}
        </button>
      )}
      <div className="glass-shadow" style={tintStyle} />
    </div>
  );
};

export default GlassButton;
