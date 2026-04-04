import { describe, it, expect } from 'vitest';
import { selectQuestions } from '../data/questions';

describe('selectQuestions', () => {
  it('returns 2 questions per trend when pool is sufficient', () => {
    // Each of these trends has 3 questions in QUESTION_BANK
    const result = selectQuestions({
      selectedTrendIds: ['face-to-interface', 'ai-meshed-up'],
      perTrend: 2,
      maxQuestions: 10,
    });

    const forFaceToInterface = result.filter(q =>
      q.targetTrendIds.includes('face-to-interface')
    );
    const forAiMeshedUp = result.filter(q =>
      q.targetTrendIds.includes('ai-meshed-up')
    );

    expect(forFaceToInterface.length).toBe(2);
    expect(forAiMeshedUp.length).toBe(2);
  });

  it('never exceeds maxQuestions', () => {
    // 5 trends × 3 perTrend = 15 potential, capped to 6
    const result = selectQuestions({
      selectedTrendIds: [
        'face-to-interface',
        'ai-meshed-up',
        'trust-thrust',
        'data-sharing-is-caring',
        'we-augment',
      ],
      perTrend: 3,
      maxQuestions: 6,
    });

    expect(result.length).toBeLessThanOrEqual(6);
  });

  it('returns unique question ids', () => {
    const result = selectQuestions({
      selectedTrendIds: ['face-to-interface', 'ai-meshed-up', 'trust-thrust'],
      perTrend: 2,
      maxQuestions: 10,
    });

    const ids = result.map(q => q.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('returns empty array for empty trend list', () => {
    const result = selectQuestions({ selectedTrendIds: [] });
    expect(result).toHaveLength(0);
  });
});
