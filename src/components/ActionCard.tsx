import React from 'react';
import { useT } from '../i18n';
import type { SelectedAction } from '../engine/actionsEngine';

interface Props {
  action: SelectedAction;
  index: number;
}

const DIMENSION_COLORS: Record<string, string> = {
  foundations: '#FF9800',
  execution:   '#12ABDB',
  balance:     '#12ABDB',
};

export default function ActionCard({ action, index }: Props) {
  const t = useT();
  const color = DIMENSION_COLORS[action.targetDimension] ?? '#12ABDB';
  const dimLabel = t.actionCard.dimensions[action.targetDimension as keyof typeof t.actionCard.dimensions]
    ?? action.targetDimension;

  return (
    <div className="card animate-in" style={{ ...styles.card, animationDelay: `${index * 80}ms`, borderLeft: `3px solid ${color}` }}>
      <div style={styles.header}>
        <span style={{ ...styles.number, color }}>#{index + 1}</span>
        <span style={{ ...styles.dimChip, background: `${color}22`, color }}>
          {dimLabel}
        </span>
      </div>

      <h3 style={styles.title}>{action.title}</h3>

      <p style={styles.description}>{action.description}</p>

      <div style={styles.benefit}>
        <span style={styles.benefitIcon}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          </svg>
        </span>
        <span style={styles.benefitText}>{action.benefit}</span>
      </div>

      {action.impactedTrendNames.length > 0 && (
        <div style={styles.trends}>
          <span style={styles.trendsLabel}>{t.actionCard.trendsLabel}</span>
          <div style={styles.trendsList}>
            {action.impactedTrendNames.map(name => (
              <span key={name} style={styles.trendChip}>{name}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    marginBottom: 16,
    gap: 12,
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    justifyContent: 'space-between',
  },
  number: {
    fontSize: 22,
    fontWeight: 800,
    lineHeight: 1,
  },
  dimChip: {
    fontSize: 11,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    padding: '3px 10px',
    borderRadius: 999,
  },
  title: {
    fontSize: 18,
    fontWeight: 700,
    color: '#FFFFFF',
    lineHeight: 1.3,
  },
  description: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    lineHeight: 1.6,
  },
  benefit: {
    display: 'flex',
    gap: 8,
    alignItems: 'flex-start',
    background: 'rgba(18,171,219,0.07)',
    border: '1px solid rgba(18,171,219,0.15)',
    borderRadius: 8,
    padding: '10px 12px',
  },
  benefitIcon: {
    color: '#12ABDB',
    flexShrink: 0,
    marginTop: 1,
  },
  benefitText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.75)',
    lineHeight: 1.5,
  },
  trends: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  trendsLabel: {
    fontSize: 11,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    color: 'rgba(255,255,255,0.4)',
  },
  trendsList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 6,
  },
  trendChip: {
    fontSize: 11,
    padding: '3px 10px',
    borderRadius: 999,
    background: 'rgba(255,255,255,0.07)',
    color: 'rgba(255,255,255,0.65)',
    border: '1px solid rgba(255,255,255,0.12)',
  },
};
