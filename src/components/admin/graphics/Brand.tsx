import React from 'react'

const Wordmark: React.FC<{ fontSize: string }> = ({ fontSize }) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      fontFamily: 'var(--font-heading)',
      fontWeight: 800,
      fontSize,
      lineHeight: 1,
      letterSpacing: '-0.02em',
      whiteSpace: 'nowrap',
    }}
  >
    <span style={{ color: '#1A1A2E' }}>TRESTO</span>
    <span style={{ color: '#5B21B6' }}>.</span>
  </span>
)

// Full wordmark — admin.components.graphics.Logo (login screen, unconstrained).
export const Logo: React.FC = () => <Wordmark fontSize="2rem" />

// Same wordmark, sized for the step-nav home link next to the breadcrumb —
// admin.components.graphics.Icon. Payload's default gives that link a fixed
// 18x18px box (`.step-nav__home` in StepNav/index.scss), sized for its square
// SVG fallback; a text wordmark needs that box relaxed to fit — see custom.scss.
export const Icon: React.FC = () => <Wordmark fontSize="20px" />
