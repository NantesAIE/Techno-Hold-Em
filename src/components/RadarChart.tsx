import {
  RadarChart as RechartsRadar,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from 'recharts';
import type { DimensionScores } from '../engine/scoring';

interface Props {
  scores: DimensionScores;
  size?: number;
}

const AXIS_LABELS: Record<keyof DimensionScores, string> = {
  foundations: 'Fondations',
  execution: 'Exécution',
  balance: 'Balance',
};

export default function RadarChart({ scores, size = 280 }: Props) {
  const data = (Object.keys(scores) as Array<keyof DimensionScores>).map(key => ({
    dimension: AXIS_LABELS[key],
    score: scores[key],
    fullMark: 100,
  }));

  return (
    <div style={{ width: '100%', height: size }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadar data={data} margin={{ top: 16, right: 32, bottom: 16, left: 32 }}>
          <PolarGrid stroke="rgba(18, 171, 219, 0.2)" />
          <PolarAngleAxis
            dataKey="dimension"
            tick={{ fill: 'rgba(255,255,255,0.75)', fontSize: 13, fontFamily: 'Ubuntu, Verdana, sans-serif', fontWeight: 600 }}
          />
          <Radar
            dataKey="score"
            stroke="#12ABDB"
            fill="#12ABDB"
            fillOpacity={0.25}
            strokeWidth={2}
            dot={{ fill: '#12ABDB', r: 4, strokeWidth: 0 }}
          />
        </RechartsRadar>
      </ResponsiveContainer>
    </div>
  );
}
