import React from 'react';
import { useApp } from '../store/AppContext';
import type { Step } from '../store/types';

const STEP_TITLES: Partial<Record<Step, string>> = {
  setup: 'Votre projet',
  trends: 'Sélection des trends',
  game: 'Assessment',
  results: 'Résultats',
  email: 'Envoyer les résultats',
};

const STEP_ORDER: Step[] = ['home', 'setup', 'trends', 'game', 'results', 'email'];

export default function Header() {
  const { state, dispatch } = useApp();
  const { step } = state;

  if (step === 'home') return null;

  const currentIdx = STEP_ORDER.indexOf(step);
  const canGoBack = currentIdx > 1 && step !== 'results'; // can't go back from results

  function handleBack() {
    const prev = STEP_ORDER[currentIdx - 1];
    if (prev) dispatch({ type: 'GO_TO_STEP', payload: prev });
  }

  return (
    <header style={styles.header}>
      <div style={styles.inner}>
        <div style={styles.left}>
          {canGoBack && (
            <button style={styles.backBtn} onClick={handleBack} aria-label="Retour">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
            </button>
          )}
          <div style={styles.logo}>
            <span style={styles.logoText}>Techno Hold 'Em</span>
            <span style={styles.logoYear}>TechnoVision 2026</span>
          </div>
        </div>

        <div style={styles.right}>
          {STEP_TITLES[step] && (
            <span style={styles.stepTitle}>{STEP_TITLES[step]}</span>
          )}
          {step !== 'results' && step !== 'email' && (
            <button
              style={styles.resetBtn}
              onClick={() => dispatch({ type: 'RESET' })}
              aria-label="Recommencer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

const styles: Record<string, React.CSSProperties> = {
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: 72,
    background: 'rgba(39, 41, 54, 0.92)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(18, 171, 219, 0.15)',
    zIndex: 100,
  },
  inner: {
    height: '100%',
    maxWidth: 900,
    margin: '0 auto',
    padding: '0 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    minWidth: 0,
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    flexShrink: 0,
  },
  backBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: '50%',
    border: 'none',
    background: 'transparent',
    color: 'rgba(255,255,255,0.65)',
    cursor: 'pointer',
    transition: 'background 150ms',
    flexShrink: 0,
  },
  logo: {
    display: 'flex',
    flexDirection: 'column',
    lineHeight: 1.2,
  },
  logoText: {
    fontWeight: 700,
    fontSize: 15,
    color: '#FFFFFF',
    letterSpacing: '-0.01em',
  },
  logoYear: {
    fontSize: 11,
    color: '#12ABDB',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
  },
  stepTitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.55)',
    fontWeight: 500,
  },
  resetBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
    borderRadius: '50%',
    border: '1px solid rgba(18, 171, 219, 0.3)',
    background: 'transparent',
    color: 'rgba(255,255,255,0.5)',
    cursor: 'pointer',
    transition: 'all 150ms',
  },
};
