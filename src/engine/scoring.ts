import { QUESTIONS } from '../data/questions';
import { TRENDS, CONTAINERS, getContainer } from '../data/technovision2026';

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
  forces: string[];        // trend names with score > 66
  underTension: string[];  // trend names with score < 33
  balanceLabel: ScoreLabel;
}

function getLabel(score: number): ScoreLabel {
  if (score >= 67) return 'Bien positionné';
  if (score >= 34) return 'Prometteur mais fragile';
  return 'Sous tension';
}

export function computeScores(answers: number[], selectedTrendIds: string[]): ScoreResult {
  // ── Compute raw dimension scores ────────────────────────────────────────
  const foundationQuestions = QUESTIONS.filter(q => q.dimension === 'Foundations');
  const executionQuestions = QUESTIONS.filter(q => q.dimension === 'Execution');
  const balanceQuestions = QUESTIONS.filter(q => q.dimension === 'Balance');

  const sumForDimension = (qs: typeof QUESTIONS) =>
    qs.reduce((acc, q) => {
      const idx = QUESTIONS.indexOf(q);
      return acc + (answers[idx] ?? 0);
    }, 0);

  const maxForDimension = (qs: typeof QUESTIONS) => qs.length * 3;

  const rawFoundations = sumForDimension(foundationQuestions);
  const rawExecution = sumForDimension(executionQuestions);
  const rawBalance = sumForDimension(balanceQuestions);

  const dimensions: DimensionScores = {
    foundations: Math.round((rawFoundations / maxForDimension(foundationQuestions)) * 100),
    execution: Math.round((rawExecution / maxForDimension(executionQuestions)) * 100),
    balance: Math.round((rawBalance / maxForDimension(balanceQuestions)) * 100),
  };

  // ── Compute per-trend scores ─────────────────────────────────────────────
  const trendScores: TrendScore[] = selectedTrendIds.map(trendId => {
    const trend = TRENDS.find(t => t.id === trendId);
    const container = trend ? getContainer(trend.containerId) : CONTAINERS[0];
    const w = container.dimensionWeights;

    const globalScore = Math.round(
      dimensions.foundations * w.foundations +
      dimensions.execution * w.execution +
      dimensions.balance * w.balance
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

  // ── Compute overall global score ─────────────────────────────────────────
  const globalScore =
    trendScores.length > 0
      ? Math.round(trendScores.reduce((s, t) => s + t.globalScore, 0) / trendScores.length)
      : 0;

  // ── Forces / under tension ───────────────────────────────────────────────
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
    (a, b) => dimensions[a] - dimensions[b]
  );
}
