import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import type { ScoreResult } from '../engine/scoring';
import type { SelectedAction } from '../engine/actionsEngine';

const CC_EMAIL = 'aie_nantes.fr@capgemini.com';

function buildEmailBody(
  scores: ScoreResult,
  actions: SelectedAction[]
): string {
  const trendLines = scores.trendScores
    .map(ts => `  • ${ts.trendName} : ${ts.globalScore}/100 — ${ts.label}`)
    .join('\n');

  const actionLines = actions
    .map((a, i) =>
      `${i + 1}. ${a.title}\n   ${a.description}\n   Bénéfice : ${a.benefit}\n   Trends : ${a.impactedTrendNames.join(', ')}`
    )
    .join('\n\n');

  return `=== RÉSULTATS TECHNO HOLD 'EM – TECHNOVISION 2026 ===

─── SCORE GLOBAL : ${scores.globalScore}/100 ────────────────────

Fondations : ${scores.dimensions.foundations}/100
Exécution  : ${scores.dimensions.execution}/100
Balance    : ${scores.dimensions.balance}/100

─── SCORES PAR TREND ─────────────────────────────────
${trendLines}

─── SYNTHÈSE ─────────────────────────────────────────
${scores.forces.length > 0 ? `Forces : ${scores.forces.join(', ')}` : ''}
${scores.underTension.length > 0 ? `Sous tension : ${scores.underTension.join(', ')}` : ''}
Balance by Design : ${scores.balanceLabel}

─── 3 ACTIONS CONCRÈTES ──────────────────────────────
${actionLines}

──────────────────────────────────────────────────────
Généré avec Techno Hold 'Em – Capgemini / TechnoVision 2026
`;
}

export default function EmailPage() {
  const { state, dispatch } = useApp();
  const [email, setEmail] = useState(state.email);
  const [copied, setCopied] = useState(false);

  const { scores, selectedActions } = state;

  if (!scores) return null;

  const body = buildEmailBody(scores, selectedActions);

  const subject = encodeURIComponent(`Résultats Techno Hold 'Em – TechnoVision 2026`);
  const encodedBody = encodeURIComponent(body);
  const encodedCC = encodeURIComponent(CC_EMAIL);

  const mailtoHref = `mailto:${encodeURIComponent(email)}?cc=${encodedCC}&subject=${subject}&body=${encodedBody}`;

  function handleCopy() {
    navigator.clipboard.writeText(body).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  }

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <main className="page animate-in" style={styles.page}>
      <div style={styles.header}>
        <h2 style={styles.title}>Envoyer les résultats</h2>
        <p style={styles.subtitle}>
          Un récapitulatif complet avec scores et actions sera envoyé.
        </p>
      </div>

      {/* Preview box */}
      <div className="card" style={styles.preview}>
        <div style={styles.previewLabel}>Aperçu du contenu</div>
        <pre style={styles.previewText}>{body.substring(0, 600)}…</pre>
      </div>

      {/* Email form */}
      <div className="card" style={styles.formCard}>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label" htmlFor="email-input">Votre adresse email</label>
          <input
            id="email-input"
            type="email"
            className="form-input"
            placeholder="prenom.nom@example.com"
            value={email}
            onChange={e => {
              setEmail(e.target.value);
              dispatch({ type: 'SET_EMAIL', payload: e.target.value });
            }}
            autoComplete="email"
          />
        </div>

        <div style={styles.ccInfo}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" />
          </svg>
          <span>CC automatique : <strong style={{ color: '#12ABDB' }}>{CC_EMAIL}</strong></span>
        </div>

        <a
          href={mailtoHref}
          className="btn btn-primary btn-lg btn-full"
          style={{
            marginTop: 16,
            pointerEvents: isValidEmail ? 'auto' : 'none',
            opacity: isValidEmail ? 1 : 0.4,
            textDecoration: 'none',
          }}
          onClick={e => !isValidEmail && e.preventDefault()}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          M'envoyer les résultats
        </a>
      </div>

      {/* Divider */}
      <div style={styles.orRow}>
        <div style={styles.orLine} />
        <span style={styles.orText}>ou</span>
        <div style={styles.orLine} />
      </div>

      {/* Fallback copy */}
      <div className="card" style={styles.copyCard}>
        <p style={styles.copyDesc}>
          Pas de client mail disponible ? Copiez le résumé pour le partager manuellement.
        </p>
        <button
          className="btn btn-secondary btn-full"
          onClick={handleCopy}
          style={{ marginTop: 12 }}
        >
          {copied ? (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              Résumé copié !
            </>
          ) : (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
              Copier le résumé
            </>
          )}
        </button>
      </div>

      {/* Back to results */}
      <button
        className="btn btn-ghost btn-full"
        onClick={() => dispatch({ type: 'GO_TO_STEP', payload: 'results' })}
        style={{ marginTop: 8 }}
      >
        ← Retour aux résultats
      </button>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    paddingBottom: 48,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 800,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: 15,
  },
  preview: {
    marginBottom: 20,
    padding: 16,
  },
  previewLabel: {
    fontSize: 11,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    color: 'rgba(255,255,255,0.35)',
    marginBottom: 10,
  },
  previewText: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.5)',
    lineHeight: 1.7,
    fontFamily: 'monospace',
    whiteSpace: 'pre-wrap',
    overflowX: 'auto',
    maxHeight: 180,
    overflow: 'hidden',
  },
  formCard: {
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
  },
  ccInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontSize: 12,
    color: 'rgba(255,255,255,0.45)',
    marginTop: 10,
  },
  orRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    margin: '20px 0',
  },
  orLine: {
    flex: 1,
    height: 1,
    background: 'rgba(255,255,255,0.1)',
  },
  orText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.3)',
    flexShrink: 0,
  },
  copyCard: {
    padding: 20,
  },
  copyDesc: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.55)',
    lineHeight: 1.5,
  },
};
