import React, { useEffect } from 'react';
import { getContainer } from '../data/technovision2026';

interface Props {
  trendId: string;
  trendName: string;
  containerId: string;
  description: string;
  onClose: () => void;
}

export default function TrendTooltip({ trendId: _trendId, trendName, containerId, description, onClose }: Props) {
  const container = getContainer(containerId);

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      style={styles.backdrop}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Info : ${trendName}`}
    >
      <div
        style={{ ...styles.card, borderTop: `3px solid ${container.accentColor}` }}
        onClick={e => e.stopPropagation()}
      >
        {/* Container label */}
        <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: container.accentColor, marginBottom: 6 }}>
          {container.name}
        </div>

        {/* Trend name */}
        <h3 style={{ fontSize: 18, fontWeight: 800, color: '#FFFFFF', lineHeight: 1.3, marginBottom: 12 }}>
          {trendName}
        </h3>

        {/* Description */}
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>
          {description}
        </p>

        {/* Close button */}
        <button onClick={onClose} style={styles.closeBtn} aria-label="Fermer">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
          Fermer
        </button>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  backdrop: {
    position: 'fixed',
    inset: 0,
    zIndex: 200,
    background: 'rgba(0,0,0,0.6)',
    backdropFilter: 'blur(4px)',
    WebkitBackdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    background: '#2f3242',
    border: '1px solid rgba(18,171,219,0.25)',
    borderRadius: 16,
    padding: 24,
    maxWidth: 420,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
    boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
    animation: 'fadeInScale 200ms ease both',
  },
  closeBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 20,
    padding: '12px 20px',
    minHeight: 48,
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 999,
    color: 'rgba(255,255,255,0.65)',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'inherit',
    width: '100%',
    WebkitTapHighlightColor: 'transparent',
  },
};
