import React from 'react';
import type { Round } from '../data/questions';

interface Props {
  current: number;  // 0-based index
  total: number;
  round: Round;
}

const ROUND_COLORS: Record<Round, string> = {
  FLOP: '#FF9800',
  TURN: '#12ABDB',
  RIVER: '#0070AD',
};

export default function ProgressIndicator({ current, total, round }: Props) {
  const pct = ((current + 1) / total) * 100;
  const color = ROUND_COLORS[round];

  return (
    <div style={styles.wrap}>
      <div style={styles.meta}>
        <span style={{ ...styles.round, color, borderColor: `${color}44`, background: `${color}18` }}>
          {round}
        </span>
        <span style={styles.count}>
          {current + 1} / {total}
        </span>
      </div>
      <div style={styles.bar}>
        <div
          style={{
            ...styles.fill,
            width: `${pct}%`,
            background: `linear-gradient(90deg, ${color}88, ${color})`,
          }}
        />
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrap: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  meta: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  round: {
    fontSize: 12,
    fontWeight: 800,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    padding: '4px 12px',
    borderRadius: 999,
    border: '1px solid',
  },
  count: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.45)',
    fontWeight: 600,
  },
  bar: {
    height: 4,
    background: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 2,
    transition: 'width 400ms ease',
  },
};
