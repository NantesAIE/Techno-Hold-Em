import React from 'react';
import { useApp } from '../store/AppContext';
import RadarChart from '../components/RadarChart';
import ActionCard from '../components/ActionCard';

function scoreLabel(score: number): { label: string; color: string } {
  if (score >= 67) return { label: 'Bien positionné', color: '#4CAF50' };
  if (score >= 34) return { label: 'Prometteur mais fragile', color: '#FF9800' };
  return { label: 'Sous tension', color: '#F44336' };
}

function ScoreBar({ score, color }: { score: number; color: string }) {
  return (
    <div style={{ height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 3, overflow: 'hidden', flex: 1 }}>
      <div style={{ width: `${score}%`, height: '100%', background: color, borderRadius: 3, transition: 'width 600ms ease' }} />
    </div>
  );
}

export default function ResultsPage() {
  const { state, dispatch } = useApp();
  const { scores, selectedActions } = state;

  if (!scores) return null;

  const globalInfo = scoreLabel(scores.globalScore);

  return (
    <main className="page animate-in" style={styles.page}>
      {/* ── Global score ─────────────────────────────────────────────────────── */}
      <div style={styles.projectHeader}>
        <div style={styles.projectMeta}>
          <span style={styles.assessmentLabel}>Assessment TechnoVision 2026</span>
        </div>
        <div style={styles.globalScore}>
          <span style={{ ...styles.globalScoreNum, color: globalInfo.color }}>{scores.globalScore}</span>
          <span style={styles.globalScoreMax}>/100</span>
        </div>
      </div>

      <div style={{ ...styles.globalBadge, background: `${globalInfo.color}18`, color: globalInfo.color, border: `1px solid ${globalInfo.color}44` }}>
        {globalInfo.label}
      </div>

      {/* ── Radar ───────────────────────────────────────────────────────────── */}
      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>Radar de positionnement</h3>
        <div className="card" style={{ padding: 16 }}>
          <RadarChart scores={scores.dimensions} size={280} />
          <div style={styles.dimensionList}>
            {(['foundations', 'execution', 'balance'] as const).map(dim => {
              const dimScore = scores.dimensions[dim];
              const info = scoreLabel(dimScore);
              const labels: Record<string, string> = { foundations: 'Fondations', execution: 'Exécution', balance: 'Balance' };
              return (
                <div key={dim} style={styles.dimRow}>
                  <span style={styles.dimName}>{labels[dim]}</span>
                  <ScoreBar score={dimScore} color={info.color} />
                  <span style={{ ...styles.dimScore, color: info.color }}>{dimScore}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Trend scores ────────────────────────────────────────────────────── */}
      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>Scores par trend</h3>
        <div style={styles.trendGrid}>
          {scores.trendScores.map(ts => {
            const info = scoreLabel(ts.globalScore);
            return (
              <div key={ts.trendId} className="card" style={{ ...styles.trendCard, borderTop: `3px solid ${ts.containerColor}` }}>
                <div style={{ fontSize: 11, color: ts.containerColor, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>
                  {ts.containerName}
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#FFFFFF', marginBottom: 10, lineHeight: 1.3 }}>{ts.trendName}</div>
                <div style={styles.trendScoreRow}>
                  <ScoreBar score={ts.globalScore} color={info.color} />
                  <span style={{ fontSize: 18, fontWeight: 800, color: info.color, marginLeft: 8 }}>{ts.globalScore}</span>
                </div>
                <div style={{ ...styles.labelBadge, background: `${info.color}18`, color: info.color }}>{ts.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Synthesis ───────────────────────────────────────────────────────── */}
      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>Synthèse projet</h3>
        <div style={styles.synthesisGrid}>
          {scores.forces.length > 0 && (
            <div className="card" style={{ ...styles.synthesisCard, borderLeft: '3px solid #4CAF50' }}>
              <div style={styles.synthTitle}>
                <span style={{ color: '#4CAF50' }}>✓</span> Forces
              </div>
              <ul style={styles.synthList}>
                {scores.forces.map(f => <li key={f} style={styles.synthItem}>{f}</li>)}
              </ul>
            </div>
          )}
          {scores.underTension.length > 0 && (
            <div className="card" style={{ ...styles.synthesisCard, borderLeft: '3px solid #F44336' }}>
              <div style={styles.synthTitle}>
                <span style={{ color: '#F44336' }}>!</span> Sous tension
              </div>
              <ul style={styles.synthList}>
                {scores.underTension.map(f => <li key={f} style={styles.synthItem}>{f}</li>)}
              </ul>
            </div>
          )}
          <div className="card" style={{ ...styles.synthesisCard, borderLeft: '3px solid #12ABDB' }}>
            <div style={styles.synthTitle}>
              <span style={{ color: '#12ABDB' }}>⚖</span> Balance by Design
            </div>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', marginTop: 6 }}>
              Score balance : <strong style={{ color: 'rgba(255,255,255,0.9)' }}>{scores.dimensions.balance}/100</strong>
              {' — '}<span style={{ color: scoreLabel(scores.dimensions.balance).color }}>{scores.balanceLabel}</span>
            </p>
            {scores.dimensions.balance < 34 && (
              <p style={{ fontSize: 13, color: 'rgba(255,152,0,0.9)', marginTop: 8 }}>
                Point d'attention : la dimension humaine et confiance est insuffisamment adressée.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ── Actions ─────────────────────────────────────────────────────────── */}
      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>3 actions concrètes</h3>
        <p style={styles.actionsSubtitle}>Sélectionnées selon vos dimensions les plus faibles</p>
        {selectedActions.map((action, i) => (
          <ActionCard key={action.id} action={action} index={i} />
        ))}
      </section>

      {/* ── CTAs ────────────────────────────────────────────────────────────── */}
      <div style={styles.ctaGroup}>
        <button
          className="btn btn-primary btn-lg btn-full"
          onClick={() => dispatch({ type: 'GO_TO_STEP', payload: 'email' })}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          M'envoyer les résultats
        </button>
        <button
          className="btn btn-ghost btn-full"
          onClick={() => dispatch({ type: 'RESET' })}
        >
          Nouveau projet
        </button>
      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    paddingBottom: 48,
  },
  projectHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 16,
    marginBottom: 12,
  },
  projectMeta: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  assessmentLabel: {
    fontSize: 13,
    fontWeight: 600,
    color: 'rgba(255,255,255,0.45)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  globalScore: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 2,
    flexShrink: 0,
  },
  globalScoreNum: {
    fontSize: 48,
    fontWeight: 900,
    lineHeight: 1,
  },
  globalScoreMax: {
    fontSize: 20,
    color: 'rgba(255,255,255,0.3)',
    fontWeight: 600,
  },
  globalBadge: {
    display: 'inline-flex',
    alignSelf: 'flex-start',
    fontSize: 13,
    fontWeight: 700,
    padding: '5px 14px',
    borderRadius: 999,
    marginBottom: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 800,
    color: '#FFFFFF',
    marginBottom: 14,
    paddingBottom: 10,
    borderBottom: '1px solid rgba(18,171,219,0.15)',
  },
  dimensionList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    marginTop: 16,
    paddingTop: 16,
    borderTop: '1px solid rgba(255,255,255,0.08)',
  },
  dimRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  dimName: {
    width: 90,
    fontSize: 13,
    fontWeight: 600,
    color: 'rgba(255,255,255,0.65)',
    flexShrink: 0,
  },
  dimScore: {
    width: 32,
    fontSize: 14,
    fontWeight: 800,
    textAlign: 'right',
    flexShrink: 0,
  },
  trendGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: 12,
  },
  trendCard: {
    padding: 14,
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
  },
  trendScoreRow: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 8,
  },
  labelBadge: {
    alignSelf: 'flex-start',
    fontSize: 11,
    fontWeight: 700,
    padding: '3px 10px',
    borderRadius: 999,
    marginTop: 4,
  },
  synthesisGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  synthesisCard: {
    padding: 16,
  },
  synthTitle: {
    fontSize: 15,
    fontWeight: 700,
    color: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  synthList: {
    marginTop: 8,
    paddingLeft: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  synthItem: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
  },
  actionsSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.4)',
    marginTop: -10,
    marginBottom: 16,
  },
  ctaGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    marginTop: 8,
  },
};
