/**
 * ResultShare.tsx
 *
 * Mobile-friendly page rendered when the app is opened with ?data=... in the URL.
 * (The user scanned the QR code from the totem.)
 *
 * No AppContext required — all data comes from the encoded URL param.
 * Language is driven by LanguageProvider, initialised in App.tsx from payload.lg.
 */

import React, { useState } from 'react';
import { useT } from '../i18n';
import {
  decodeSharePayload,
  expandLabel,
  formatPlanText,
  formatEmailBody,
  type SharePayload,
  type LabelShort,
} from '../utils/sharePayload';

const AIE_EMAIL = 'aie_nantes.fr@capgemini.com';
const EMAIL_SUBJECT = encodeURIComponent(
  "Techno Hold 'Em \u2013 Demande d'approfondissement TechnoVision",
);

// Color keyed by LabelShort ('B' / 'P' / 'S') — language-independent
const LABEL_SHORT_COLOR: Record<LabelShort, string> = {
  B: '#4CAF50',
  P: '#FF9800',
  S: '#F44336',
};

// ── Sub-components ────────────────────────────────────────────────────────────

function ScoreBadge({ label, short }: { label: string; short: LabelShort }) {
  const color = LABEL_SHORT_COLOR[short] ?? '#12ABDB';
  return (
    <span style={{
      fontSize: 11,
      fontWeight: 700,
      padding: '3px 9px',
      borderRadius: 999,
      background: `${color}1A`,
      color,
      border: `1px solid ${color}44`,
      whiteSpace: 'nowrap',
    }}>
      {label}
    </span>
  );
}

function CopyButton({ payload }: { payload: SharePayload }) {
  const [copied, setCopied] = useState(false);
  const t = useT();

  function handleCopy() {
    const text = formatPlanText(payload, t.planText, t.share.scoreLabels);
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }).catch(() => {
      // Fallback: select a pre-built textarea
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  }

  return (
    <button onClick={handleCopy} style={btnStyles.copy} aria-live="polite">
      {copied ? (
        <>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M20 6 9 17l-5-5" />
          </svg>
          {t.share.copiedBtn}
        </>
      ) : (
        <>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect width="14" height="14" x="8" y="8" rx="2" />
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
          </svg>
          {t.share.copyBtn}
        </>
      )}
    </button>
  );
}

function ContactButton({ payload }: { payload: SharePayload }) {
  const t = useT();
  const body = encodeURIComponent(formatEmailBody(payload, t.emailText, t.share.scoreLabels));
  const href = `mailto:${AIE_EMAIL}?subject=${EMAIL_SUBJECT}&body=${body}`;

  return (
    <a href={href} style={btnStyles.contact}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
      {t.share.contactBtn}
    </a>
  );
}

// ── Error state ───────────────────────────────────────────────────────────────

function ErrorPage() {
  const t = useT();
  return (
    <div style={pageStyles.errorPage}>
      <p style={pageStyles.errorIcon}>&#x1F517;</p>
      <h2 style={pageStyles.errorTitle}>{t.share.errorTitle}</h2>
      <p style={pageStyles.errorDesc}>{t.share.errorDesc}</p>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

interface Props {
  encodedData: string;
}

export default function ResultShare({ encodedData }: Props) {
  const payload = decodeSharePayload(encodedData);
  const t = useT();

  if (!payload) return <ErrorPage />;

  return (
    <div style={pageStyles.page}>
      {/* Header */}
      <header style={pageStyles.header}>
        <div style={pageStyles.headerInner}>
          <div>
            <p style={pageStyles.headerSuper}>{t.share.headerSuper}</p>
            <h1 style={pageStyles.headerTitle}>{t.share.headerTitle}</h1>
          </div>
          <div style={pageStyles.aieChip}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            {t.share.aieChip}
          </div>
        </div>
      </header>

      <main style={pageStyles.main}>
        {/* ── Positioning section ── */}
        <section style={pageStyles.section}>
          <h2 style={pageStyles.sectionTitle}>{t.share.positionTitle}</h2>

          {/* Trend scores */}
          <div style={pageStyles.trendList}>
            {payload.ts.map((ts, i) => {
              const label = expandLabel(ts.l, t.share.scoreLabels);
              const color = LABEL_SHORT_COLOR[ts.l] ?? '#12ABDB';
              return (
                <div key={i} style={pageStyles.trendRow}>
                  <div style={pageStyles.trendInfo}>
                    <span style={pageStyles.trendName}>{ts.n}</span>
                    <ScoreBadge label={label} short={ts.l} />
                  </div>
                  <div style={pageStyles.scoreBarWrap}>
                    <div style={{ ...pageStyles.scoreBarFill, width: `${ts.s}%`, background: color }} />
                  </div>
                  <span style={{ ...pageStyles.scoreNum, color }}>{ts.s}<span style={pageStyles.scoreMax}>/100</span></span>
                </div>
              );
            })}
          </div>

          {/* Forces / Tensions summary */}
          <div style={pageStyles.synthRow}>
            {payload.f.length > 0 && (
              <div style={{ ...pageStyles.synthCard, borderColor: '#4CAF5066' }}>
                <span style={{ ...pageStyles.synthIcon, color: '#4CAF50' }}>&#x2713;</span>
                <div>
                  <div style={pageStyles.synthLabel}>{t.share.forcesLabel}</div>
                  <div style={pageStyles.synthValues}>{payload.f.join(' \u00b7 ')}</div>
                </div>
              </div>
            )}
            {payload.st.length > 0 && (
              <div style={{ ...pageStyles.synthCard, borderColor: '#F4433666' }}>
                <span style={{ ...pageStyles.synthIcon, color: '#F44336' }}>!</span>
                <div>
                  <div style={pageStyles.synthLabel}>{t.share.tensionLabel}</div>
                  <div style={pageStyles.synthValues}>{payload.st.join(' \u00b7 ')}</div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ── Actions section ── */}
        <section style={pageStyles.section}>
          <h2 style={pageStyles.sectionTitle}>{t.share.actionsTitle}</h2>
          <div style={pageStyles.actionList}>
            {payload.a.map((action, i) => (
              <div key={i} style={pageStyles.actionCard}>
                <div style={pageStyles.actionHeader}>
                  <span style={pageStyles.actionNum}>{i + 1}</span>
                  <h3 style={pageStyles.actionTitle}>{action.t}</h3>
                </div>
                <p style={pageStyles.actionDesc}>{action.d}</p>
                {action.tr.length > 0 && (
                  <div style={pageStyles.trendChips}>
                    {action.tr.map(tr => (
                      <span key={tr} style={pageStyles.trendChip}>{tr}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── CTAs ── */}
        <section style={pageStyles.section}>
          <h2 style={pageStyles.sectionTitle}>{t.share.ctaTitle}</h2>
          <p style={pageStyles.ctaDesc}>{t.share.ctaDesc}</p>
          <div style={pageStyles.ctaGroup}>
            <CopyButton payload={payload} />
            <ContactButton payload={payload} />
          </div>
          <p style={pageStyles.aieInfo}>
            <strong style={{ color: 'rgba(255,255,255,0.8)' }}>{t.share.aieOrg}</strong>
            {' \u2014 '}{t.share.aieTeam}
            <br />
            <a href={`mailto:${AIE_EMAIL}`} style={pageStyles.emailLink}>{AIE_EMAIL}</a>
          </p>
        </section>
      </main>

      <footer style={pageStyles.footer}>
        {t.share.footer}
      </footer>
    </div>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const pageStyles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100dvh',
    background: '#111937',
    color: '#FFFFFF',
    fontFamily: 'Ubuntu, Verdana, system-ui, -apple-system, sans-serif',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    background: 'rgba(17,25,55,0.95)',
    borderBottom: '1px solid rgba(18,171,219,0.2)',
    padding: '16px 20px',
    position: 'sticky',
    top: 0,
    zIndex: 10,
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
  },
  headerInner: {
    maxWidth: 540,
    margin: '0 auto',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  headerSuper: {
    fontSize: 11,
    fontWeight: 700,
    color: '#12ABDB',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.08em',
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 800,
    color: '#FFFFFF',
    lineHeight: 1.1,
  },
  aieChip: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    fontSize: 10,
    fontWeight: 600,
    color: 'rgba(255,255,255,0.5)',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 999,
    padding: '4px 10px',
    whiteSpace: 'nowrap' as const,
    flexShrink: 0,
  },
  main: {
    flex: 1,
    maxWidth: 540,
    width: '100%',
    margin: '0 auto',
    padding: '24px 20px 40px',
    display: 'flex',
    flexDirection: 'column',
    gap: 32,
  },
  section: {},
  sectionTitle: {
    fontSize: 16,
    fontWeight: 800,
    color: '#FFFFFF',
    marginBottom: 16,
    paddingBottom: 10,
    borderBottom: '1px solid rgba(18,171,219,0.15)',
  },
  trendList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
    marginBottom: 16,
  },
  trendRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  trendInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  trendName: {
    fontSize: 14,
    fontWeight: 700,
    color: '#FFFFFF',
    flex: 1,
  },
  scoreBarWrap: {
    height: 5,
    background: 'rgba(255,255,255,0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  scoreBarFill: {
    height: '100%',
    borderRadius: 3,
    transition: 'width 500ms ease',
  },
  scoreNum: {
    fontSize: 15,
    fontWeight: 800,
    alignSelf: 'flex-end',
    textAlign: 'right' as const,
  },
  scoreMax: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.3)',
    fontWeight: 500,
  },
  synthRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  synthCard: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 10,
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid',
    borderRadius: 10,
    padding: '10px 14px',
  },
  synthIcon: {
    fontSize: 15,
    fontWeight: 800,
    flexShrink: 0,
    marginTop: 1,
  },
  synthLabel: {
    fontSize: 11,
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.06em',
    color: 'rgba(255,255,255,0.4)',
    marginBottom: 2,
  },
  synthValues: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.75)',
    lineHeight: 1.4,
  },
  actionList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  actionCard: {
    background: 'rgba(47,50,70,0.8)',
    border: '1px solid rgba(18,171,219,0.15)',
    borderRadius: 12,
    padding: '16px 18px',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  actionHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 10,
  },
  actionNum: {
    width: 26,
    height: 26,
    borderRadius: '50%',
    background: 'rgba(18,171,219,0.2)',
    border: '1.5px solid rgba(18,171,219,0.5)',
    color: '#12ABDB',
    fontSize: 13,
    fontWeight: 800,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  actionTitle: {
    fontSize: 15,
    fontWeight: 800,
    color: '#FFFFFF',
    lineHeight: 1.3,
    flex: 1,
  },
  actionDesc: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.6)',
    lineHeight: 1.6,
  },
  trendChips: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: 6,
  },
  trendChip: {
    fontSize: 11,
    fontWeight: 600,
    padding: '3px 9px',
    borderRadius: 999,
    background: 'rgba(18,171,219,0.1)',
    color: 'rgba(18,171,219,0.85)',
    border: '1px solid rgba(18,171,219,0.25)',
  },
  ctaDesc: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.55)',
    lineHeight: 1.55,
    marginBottom: 16,
  },
  ctaGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    marginBottom: 16,
  },
  aieInfo: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.4)',
    lineHeight: 1.7,
    padding: '12px 14px',
    background: 'rgba(18,171,219,0.05)',
    borderRadius: 8,
    border: '1px solid rgba(18,171,219,0.15)',
  },
  emailLink: {
    color: '#12ABDB',
    textDecoration: 'none',
    fontWeight: 600,
  },
  footer: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.2)',
    textAlign: 'center' as const,
    padding: '16px 20px',
    letterSpacing: '0.04em',
    borderTop: '1px solid rgba(255,255,255,0.06)',
  },
  errorPage: {
    minHeight: '100dvh',
    background: '#111937',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    textAlign: 'center' as const,
    gap: 12,
    fontFamily: 'Ubuntu, Verdana, system-ui, sans-serif',
  },
  errorIcon: { fontSize: 40 },
  errorTitle: { fontSize: 20, fontWeight: 800, color: '#FFFFFF' },
  errorDesc: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.55)',
    lineHeight: 1.6,
    maxWidth: 340,
  },
};

const btnStyles: Record<string, React.CSSProperties> = {
  copy: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: '100%',
    minHeight: 56,
    padding: '14px 24px',
    fontSize: 16,
    fontWeight: 700,
    color: '#FFFFFF',
    background: 'rgba(255,255,255,0.1)',
    border: '1.5px solid rgba(255,255,255,0.2)',
    borderRadius: 12,
    cursor: 'pointer',
    fontFamily: 'inherit',
    WebkitTapHighlightColor: 'transparent',
    transition: 'background 150ms, border-color 150ms',
  },
  contact: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: '100%',
    minHeight: 56,
    padding: '14px 24px',
    fontSize: 16,
    fontWeight: 700,
    color: '#FFFFFF',
    background: 'linear-gradient(135deg, #0070AD, #12ABDB)',
    border: 'none',
    borderRadius: 12,
    cursor: 'pointer',
    fontFamily: 'inherit',
    textDecoration: 'none',
    boxShadow: '0 4px 20px rgba(18,171,219,0.3)',
    WebkitTapHighlightColor: 'transparent',
  },
};
