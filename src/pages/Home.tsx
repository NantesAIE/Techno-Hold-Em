import React from 'react';
import { useApp } from '../store/AppContext';

export default function Home() {
  const { dispatch } = useApp();

  return (
    <div style={styles.page}>
      <div style={styles.bgGlow} aria-hidden />

      <div style={styles.content} className="animate-in">
        {/* Logo / branding */}
        <div style={styles.brand}>
          <div style={styles.badge}>TechnoVision 2026</div>
          <h1 style={styles.title}>
            Techno<span style={styles.accent}> Hold 'Em</span>
          </h1>
          <p style={styles.subtitle}>
            Positionnez votre projet avec TechnoVision 2026
          </p>
        </div>

        {/* Card description */}
        <div className="card" style={styles.descCard}>
          <div style={styles.cardRow}>
            <CardIcon>🎯</CardIcon>
            <div>
              <div style={styles.cardItemTitle}>3 à 5 trends TechnoVision</div>
              <div style={styles.cardItemDesc}>Choisissez celles qui correspondent à votre projet</div>
            </div>
          </div>
          <div style={styles.cardRow}>
            <CardIcon>🃏</CardIcon>
            <div>
              <div style={styles.cardItemTitle}>8 questions — FLOP, TURN, RIVER</div>
              <div style={styles.cardItemDesc}>Réponses rapides, résultat immédiat</div>
            </div>
          </div>
          <div style={styles.cardRow}>
            <CardIcon>📊</CardIcon>
            <div>
              <div style={styles.cardItemTitle}>Radar & synthèse</div>
              <div style={styles.cardItemDesc}>Forces, tensions et 3 actions concrètes</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <button
          className="btn btn-primary btn-lg btn-full"
          onClick={() => dispatch({ type: 'GO_TO_STEP', payload: 'setup' })}
        >
          Démarrer
          <span style={styles.ctaBadge}>5–7 min</span>
        </button>

        <p style={styles.footer}>Capgemini © TechnoVision 2026 — parcours autonome</p>
      </div>
    </div>
  );
}

function CardIcon({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      fontSize: 24,
      width: 44,
      height: 44,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(18,171,219,0.1)',
      borderRadius: 10,
      flexShrink: 0,
    }}>
      {children}
    </span>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100dvh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    position: 'relative',
    overflow: 'hidden',
  },
  bgGlow: {
    position: 'absolute',
    top: '-30%',
    right: '-20%',
    width: '70vw',
    height: '70vw',
    maxWidth: 600,
    maxHeight: 600,
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(18,171,219,0.08) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  content: {
    width: '100%',
    maxWidth: 540,
    display: 'flex',
    flexDirection: 'column',
    gap: 32,
    position: 'relative',
    zIndex: 1,
  },
  brand: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  badge: {
    display: 'inline-flex',
    alignSelf: 'flex-start',
    background: 'rgba(18,171,219,0.15)',
    color: '#12ABDB',
    border: '1px solid rgba(18,171,219,0.3)',
    borderRadius: 999,
    padding: '4px 14px',
    fontSize: 12,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
  },
  title: {
    fontSize: 'clamp(36px, 8vw, 64px)',
    fontWeight: 800,
    color: '#FFFFFF',
    lineHeight: 1.1,
    letterSpacing: '-0.02em',
  },
  accent: {
    background: 'linear-gradient(135deg, #12ABDB, #0070AD)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.65)',
    lineHeight: 1.4,
    fontWeight: 500,
    maxWidth: 400,
  },
  descCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  cardRow: {
    display: 'flex',
    gap: 14,
    alignItems: 'flex-start',
  },
  cardItemTitle: {
    fontSize: 15,
    fontWeight: 700,
    color: '#FFFFFF',
    marginBottom: 2,
  },
  cardItemDesc: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.55)',
  },
  ctaBadge: {
    fontSize: 12,
    background: 'rgba(255,255,255,0.2)',
    padding: '2px 8px',
    borderRadius: 999,
    marginLeft: 4,
  },
  footer: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.3)',
    textAlign: 'center',
  },
};
