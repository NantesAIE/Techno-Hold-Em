import { TRENDS, CONTAINERS, getContainer } from '../data/technovision2026';
import type { Question, Dimension } from '../data/questions';

export interface DimensionScores {
  foundations: number; // 0–100
  execution: number;   // 0–100
  balance: number;     // 0–100
}

export type ScoreLabel = 'Bien positionné' | 'Prometteur mais fragile' | 'Sous tension';

export interface TrendScore {
  trendId: string;
  trendName: string;
  containerName: string;
  containerColor: string;
  globalScore: number; // 0–100
  label: ScoreLabel;
}

export interface ScoreResult {
  dimensions: DimensionScores;
  trendScores: TrendScore[];
  globalScore: number; // 0–100
  forces: string[];        // trend names with score >= 67
  underTension: string[];  // trend names with score < 34
  balanceLabel: ScoreLabel;
}

function getLabel(score: number): ScoreLabel {
  if (score >= 67) return 'Bien positionné';
  if (score >= 34) return 'Prometteur mais fragile';
  return 'Sous tension';
}

function dimensionScore(
  qs: Question[],
  dim: Dimension,
  answers: number[],
  allQuestions: Question[],
  fallback: number,
): number {
  const relevant = qs.filter(q => q.dimension === dim);
  if (relevant.length === 0) return fallback;
  const sum = relevant.reduce((acc, q) => {
    const idx = allQuestions.indexOf(q);
    return acc + (answers[idx] ?? 0);
  }, 0);
  return Math.round((sum / (relevant.length * 3)) * 100);
}

export function computeScores(
  answers: number[],
  selectedTrendIds: string[],
  questions: Question[],
): ScoreResult {
  // ── Global dimension scores (all questions) ──────────────────────────────
  const dimensions: DimensionScores = {
    foundations: dimensionScore(questions, 'foundations', answers, questions, 50),
    execution:   dimensionScore(questions, 'execution',   answers, questions, 50),
    balance:     dimensionScore(questions, 'balance',     answers, questions, 50),
  };

  // ── Per-trend scores (questions targeting each trend) ────────────────────
  const trendScores: TrendScore[] = selectedTrendIds.map(trendId => {
    const trend = TRENDS.find(t => t.id === trendId);
    const container = trend ? getContainer(trend.containerId) : CONTAINERS[0];
    const w = container.dimensionWeights;

    // Questions that specifically target this trend
    const trendQs = questions.filter(q => q.targetTrendIds.includes(trendId));

    // Per-trend dimension scores (fall back to global if no questions for that dim)
    const trendDims: DimensionScores = {
      foundations: dimensionScore(trendQs, 'foundations', answers, questions, dimensions.foundations),
      execution:   dimensionScore(trendQs, 'execution',   answers, questions, dimensions.execution),
      balance:     dimensionScore(trendQs, 'balance',     answers, questions, dimensions.balance),
    };

    const globalScore = Math.round(
      trendDims.foundations * w.foundations +
      trendDims.execution   * w.execution +
      trendDims.balance     * w.balance,
    );

    return {
      trendId,
      trendName: trend?.name ?? trendId,
      containerName: container.name,
      containerColor: container.accentColor,
      globalScore,
      label: getLabel(globalScore),
    };
  });

  // ── Overall global score ─────────────────────────────────────────────────
  const globalScore =
    trendScores.length > 0
      ? Math.round(trendScores.reduce((s, t) => s + t.globalScore, 0) / trendScores.length)
      : 0;

  const forces = trendScores.filter(t => t.globalScore >= 67).map(t => t.trendName);
  const underTension = trendScores.filter(t => t.globalScore < 34).map(t => t.trendName);

  return {
    dimensions,
    trendScores,
    globalScore,
    forces,
    underTension,
    balanceLabel: getLabel(dimensions.balance),
  };
}

export function getWeakestDimensions(dimensions: DimensionScores): Array<keyof DimensionScores> {
  return (Object.keys(dimensions) as Array<keyof DimensionScores>).sort(
    (a, b) => dimensions[a] - dimensions[b],
  );
}
