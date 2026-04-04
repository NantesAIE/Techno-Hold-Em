import React from 'react';
import { useApp } from '../store/AppContext';

// ── Animated SVG background ─────────────────────────────────────────────────
function SyncSwingSVG() {
  return (
    <svg
      viewBox="0 0 1200 900"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <linearGradient id="arcGrad1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#12ABDB" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#0070AD" stopOpacity="0.03" />
        </linearGradient>
        <linearGradient id="arcGrad2" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#12ABDB" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#0070AD" stopOpacity="0.02" />
        </linearGradient>
        <radialGradient id="glowCenter" cx="75%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#12ABDB" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#12ABDB" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ambient glow */}
      <rect x="0" y="0" width="1200" height="900" fill="url(#glowCenter)" />

      {/* Large oscillating arcs */}
      <circle cx="900" cy="450" r="520" stroke="url(#arcGrad1)" strokeWidth="1.5" className="intro-arc-1" />
      <circle cx="900" cy="450" r="360" stroke="url(#arcGrad2)" strokeWidth="1" className="intro-arc-2" />
      <ellipse cx="850" cy="420" rx="240" ry="320" stroke="#12ABDB" strokeWidth="0.8" opacity="0.07" className="intro-arc-3" />

      {/* Pendulum arc — centred top */}
      <path
        d="M 300 -60 A 650 650 0 0 1 900 -60"
        stroke="#12ABDB"
        strokeWidth="1.5"
        opacity="0.1"
        className="intro-pendulum"
      />

      {/* Sine waves */}
      <path
        d="M-120 460 Q180 310 480 460 Q780 610 1080 460 Q1240 380 1380 460"
        stroke="#12ABDB"
        strokeWidth="1"
        opacity="0.12"
        className="intro-wave-1"
      />
      <path
        d="M-120 500 Q180 350 480 500 Q780 650 1080 500 Q1240 420 1380 500"
        stroke="#0070AD"
        strokeWidth="0.8"
        opacity="0.08"
        className="intro-wave-2"
      />

      {/* Connection lines (network feel) */}
      <line x1="140" y1="120" x2="380" y2="260" stroke="#12ABDB" strokeWidth="0.5" opacity="0.14" />
      <line x1="380" y1="260" x2="660" y2="190" stroke="#12ABDB" strokeWidth="0.5" opacity="0.12" />
      <line x1="660" y1="190" x2="940" y2="310" stroke="#12ABDB" strokeWidth="0.5" opacity="0.1" />
      <line x1="940" y1="310" x2="1100" y2="220" stroke="#12ABDB" strokeWidth="0.5" opacity="0.1" />

      {/* Floating dots */}
      <circle cx="140" cy="120" r="4"  fill="#12ABDB" opacity="0.5" className="intro-dot-1" />
      <circle cx="380" cy="260" r="3"  fill="#12ABDB" opacity="0.4" className="intro-dot-2" />
      <circle cx="660" cy="190" r="5"  fill="#0070AD" opacity="0.3" className="intro-dot-3" />
      <circle cx="940" cy="310" r="3"  fill="#12ABDB" opacity="0.4" className="intro-dot-1" />
      <circle cx="1100" cy="220" r="4" fill="#12ABDB" opacity="0.35" className="intro-dot-2" />
      <circle cx="200" cy="560" r="3"  fill="#0070AD" opacity="0.3" className="intro-dot-3" />
      <circle cx="1050" cy="620" r="5" fill="#12ABDB" opacity="0.2" className="intro-dot-1" />
      <circle cx="480" cy="700" r="3"  fill="#12ABDB" opacity="0.25" className="intro-dot-2" />
    </svg>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
export default function IntroTechnoVision() {
  const { dispatch } = useApp();

  return (
    <div style={styles.page}>
      <SyncSwingSVG />

      <div style={styles.overlay}>
        <div style={styles.content}>

          {/* Badge */}
          <div style={styles.badge} className="animate-in animate-delay-1">
            The Sync Swing · TechnoVision 2026
          </div>

          {/* Hero title */}
          <div style={styles.hero} className="animate-in animate-delay-2">
            <h1 style={styles.title}>
              TechnoVision 2026
            </h1>
            <h2 style={styles.titleSub}>
              Donner du sens au{' '}
              <span style={styles.accent}>mouvement technologique</span>
            </h2>
            <p style={styles.subtitle}>
              Dans un monde en oscillation permanente, l'enjeu n'est pas de choisir une technologie,
              mais de comprendre comment les tendances se synchronisent.
            </p>
          </div>

          {/* Info cards */}
          <div style={styles.cards} className="animate-in animate-delay-3">
            <div className="card" style={styles.card}>
              <div style={styles.cardLabel}>
                <span style={styles.cardDot} />
                Qu'est-ce que TechnoVision ?
              </div>
              <p style={styles.cardText}>
                TechnoVision est le framework technologique de Capgemini.
                Il structure 37 trends en 9 containers pour aider les organisations
                à distinguer le signal du bruit et à transformer l'innovation
                en décisions concrètes.
              </p>
            </div>
            <div className="card" style={styles.card}>
              <div style={styles.cardLabel}>
                <span style={styles.cardDot} />
                Pourquoi cet assessment ?
              </div>
              <p style={styles.cardText}>
                Cet assessment vous permet de positionner un projet réel
                par rapport aux tendances TechnoVision 2026.
                En quelques minutes, vous identifiez vos forces, vos zones de tension
                et les leviers prioritaires pour progresser.
              </p>
            </div>
          </div>

          {/* Deliverables */}
          <div style={styles.deliverables} className="animate-in animate-delay-4">
            <div style={styles.delLabel}>Ce que vous allez obtenir</div>
            {[
              'Un positionnement clair sur les trends clés',
              'Une lecture équilibre / exécution / fondations',
              '3 actions concrètes pour renforcer votre trajectoire',
            ].map((item, i) => (
              <div key={i} style={styles.delItem}>
                <span style={styles.delCheck}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                <span style={styles.delText}>{item}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={styles.ctaWrap} className="animate-in animate-delay-5">
            <button
              className="btn btn-primary btn-lg btn-full"
              style={styles.cta}
              onClick={() => dispatch({ type: 'GO_TO_STEP', payload: 'trends' })}
            >
              Explorer les trends TechnoVision
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <p style={styles.duration}>5 – 7 minutes · Aucun compte requis</p>
          </div>

          {/* Footer */}
          <p style={styles.footer} className="animate-in animate-delay-6">
            Basé sur TechnoVision 2026 — The Sync Swing · Capgemini
          </p>

        </div>
      </div>
    </div>
  );
}

// ── Styles ───────────────────────────────────────────────────────────────────
const styles: Record<string, React.CSSProperties> = {
  page: {
    position: 'relative',
    minHeight: '100dvh',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#272936',
  },
  overlay: {
    position: 'relative',
    zIndex: 1,
    width: '100%',
    minHeight: '100dvh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 24px',
    overflowY: 'auto',
  },
  content: {
    width: '100%',
    maxWidth: 640,
    display: 'flex',
    flexDirection: 'column',
    gap: 28,
  },
  badge: {
    display: 'inline-flex',
    alignSelf: 'flex-start',
    fontSize: 11,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: '#12ABDB',
    background: 'rgba(18,171,219,0.12)',
    border: '1px solid rgba(18,171,219,0.3)',
    borderRadius: 999,
    padding: '5px 14px',
  },
  hero: {
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
  },
  title: {
    fontSize: 'clamp(32px, 7vw, 56px)',
    fontWeight: 900,
    color: '#FFFFFF',
    lineHeight: 1.05,
    letterSpacing: '-0.025em',
  },
  titleSub: {
    fontSize: 'clamp(20px, 4vw, 32px)',
    fontWeight: 700,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 1.2,
    letterSpacing: '-0.01em',
  },
  accent: {
    background: 'linear-gradient(135deg, #12ABDB 30%, #0070AD 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.55)',
    lineHeight: 1.6,
    maxWidth: 520,
  },
  cards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: 12,
  },
  card: {
    padding: 18,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    background: 'rgba(47,50,66,0.7)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
  },
  cardLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontSize: 13,
    fontWeight: 800,
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  cardDot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    background: '#12ABDB',
    flexShrink: 0,
    display: 'inline-block',
  },
  cardText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.6)',
    lineHeight: 1.65,
  },
  deliverables: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  delLabel: {
    fontSize: 13,
    fontWeight: 700,
    color: 'rgba(255,255,255,0.45)',
    textTransform: 'uppercase',
    letterSpacing: '0.07em',
    marginBottom: 2,
  },
  delItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  delCheck: {
    width: 22,
    height: 22,
    borderRadius: '50%',
    background: 'rgba(18,171,219,0.15)',
    border: '1.5px solid rgba(18,171,219,0.4)',
    color: '#12ABDB',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  delText: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: 500,
  },
  ctaWrap: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  cta: {
    fontSize: 'clamp(16px, 3vw, 20px)',
    background: 'linear-gradient(135deg, #0070AD, #12ABDB)',
    boxShadow: '0 4px 32px rgba(18,171,219,0.25)',
  },
  duration: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.3)',
    textAlign: 'center',
    fontWeight: 500,
  },
  footer: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.2)',
    textAlign: 'center',
    letterSpacing: '0.04em',
  },
};
