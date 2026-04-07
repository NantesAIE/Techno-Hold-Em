import React from 'react';
import { useApp } from '../store/AppContext';
import { useT, useLang } from '../i18n';
import '../styles/landing.css';

// Use BASE_URL so the path resolves correctly whether the app is served
// from root ("/") or a sub-path (e.g. GitHub Pages with base: "./").
const BG_URL = `${import.meta.env.BASE_URL}TechnoVision.png`;

export default function Landing() {
  const { dispatch } = useApp();
  const t = useT();
  const [lang, setLang] = useLang();

  return (
    <div className="landing-page" role="main">

      {/* ── Animated background ──────────────────────────────────────────── */}
      <div
        className="landing-bg"
        style={{ backgroundImage: `url("${BG_URL}")` }}
        aria-hidden
      />
      <div className="landing-overlay" aria-hidden />
      <div className="landing-shimmer" aria-hidden />

      {/* ── Language switcher ─────────────────────────────────────────────── */}
      <button
        onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
        aria-label={t.landing.langSwitchAriaLabel}
        style={styles.langBtn}
        className="landing-fade-1"
      >
        {t.landing.langSwitch}
      </button>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div className="landing-content">

        {/* Badge */}
        <div className="landing-fade-1" style={styles.badge}>
          {t.landing.badge}
        </div>

        {/* Titles */}
        <div style={styles.titles}>
          <h1 className="landing-fade-2" style={styles.h1}>
            TECHNOVISION 2026
          </h1>
          <h2 className="landing-fade-3" style={styles.h2}>
            TECHNO HOLD&nbsp;'EM
          </h2>
        </div>

        {/* Tagline */}
        <p className="landing-fade-4" style={styles.tagline}>
          {t.landing.tagline}
        </p>

        {/* Micro-phrase */}
        <p className="landing-fade-4" style={styles.micro}>
          {t.landing.micro}
        </p>

        {/* CTA */}
        <div className="landing-fade-5" style={styles.ctaWrap}>
          <button
            style={styles.cta}
            onClick={() => dispatch({ type: 'GO_TO_STEP', payload: 'home' })}
            aria-label={t.landing.ctaAriaLabel}
          >
            {t.landing.ctaLabel}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Footer */}
        <p className="landing-fade-6" style={styles.footer}>
          {t.landing.footer}
        </p>

      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  langBtn: {
    position: 'fixed',
    top: 20,
    right: 20,
    zIndex: 50,
    padding: '6px 14px',
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: '0.08em',
    color: 'rgba(255,255,255,0.75)',
    background: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(255,255,255,0.22)',
    borderRadius: 999,
    cursor: 'pointer',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    fontFamily: 'inherit',
    WebkitTapHighlightColor: 'transparent',
    transition: 'background 150ms, color 150ms',
  },
  badge: {
    display: 'inline-flex',
    alignSelf: 'center',
    fontSize: 11,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    color: 'rgba(18,171,219,0.9)',
    marginBottom: 28,
  },
  titles: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    marginBottom: 24,
  },
  h1: {
    fontSize: 'clamp(34px, 8vw, 72px)',
    fontWeight: 900,
    color: '#FFFFFF',
    lineHeight: 1.0,
    letterSpacing: '0.04em',
    textShadow: '0 2px 24px rgba(0,0,0,0.5)',
  },
  h2: {
    fontSize: 'clamp(22px, 5.5vw, 48px)',
    fontWeight: 800,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 1.1,
    letterSpacing: '0.06em',
    textShadow: '0 2px 16px rgba(0,0,0,0.4)',
    background: 'linear-gradient(135deg, #12ABDB 20%, #FFFFFF 80%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  tagline: {
    fontSize: 'clamp(15px, 2.5vw, 20px)',
    fontWeight: 500,
    color: 'rgba(255,255,255,0.75)',
    lineHeight: 1.5,
    letterSpacing: '0.01em',
    marginBottom: 12,
    maxWidth: 480,
    textShadow: '0 1px 8px rgba(0,0,0,0.5)',
  },
  micro: {
    fontSize: 'clamp(12px, 1.8vw, 15px)',
    fontWeight: 600,
    color: 'rgba(18,171,219,0.85)',
    letterSpacing: '0.05em',
    marginBottom: 44,
    textShadow: '0 1px 6px rgba(0,0,0,0.6)',
  },
  ctaWrap: {
    width: '100%',
    maxWidth: 360,
    marginBottom: 36,
  },
  cta: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    width: '100%',
    minHeight: 64,
    padding: '16px 32px',
    fontSize: 'clamp(17px, 3vw, 22px)',
    fontWeight: 800,
    letterSpacing: '0.02em',
    color: '#FFFFFF',
    background: 'linear-gradient(135deg, #0070AD 0%, #12ABDB 100%)',
    border: 'none',
    borderRadius: 12,
    cursor: 'pointer',
    boxShadow: '0 4px 24px rgba(18,171,219,0.35), 0 0 0 0 rgba(18,171,219,0)',
    transition: 'transform 150ms ease, box-shadow 150ms ease, opacity 150ms ease',
    WebkitTapHighlightColor: 'transparent',
    fontFamily: 'inherit',
  },
  footer: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.28)',
    letterSpacing: '0.06em',
    textAlign: 'center',
  },
};
