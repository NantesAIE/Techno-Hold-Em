import React, { useState, useEffect } from 'react';
import { useApp } from '../store/AppContext';
import { computeScores } from '../engine/scoring';
import { selectActions } from '../engine/actionsEngine';
import { TRENDS, getContainer } from '../data/technovision2026';
import type { Round } from '../data/questions';
import ProgressIndicator from '../components/ProgressIndicator';

function getRound(idx: number, total: number): Round {
  if (idx < Math.ceil(total / 3)) return 'FLOP';
  if (idx < Math.ceil((2 * total) / 3)) return 'TURN';
  return 'RIVER';
}

const ROUND_LABELS: Record<Round, string> = {
  FLOP: 'Mise de départ — clarté & fondations',
  TURN: 'Relance — exécution & maturité',
  RIVER: 'Carte finale — équilibre & contrôle',
};

export default function GamePage() {
  const { state, dispatch } = useApp();
  const questions = state.questions;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [isAdvancing, setIsAdvancing] = useState(false);
  const [showWhy, setShowWhy] = useState(false);

  const question = questions[currentIdx];
  const total = questions.length;
  const isLast = currentIdx === total - 1;

  // Trend & container metadata for the current question
  const primaryTrendId = question?.targetTrendIds[0];
  const trend = primaryTrendId ? TRENDS.find(t => t.id === primaryTrendId) : null;
  const container = trend ? getContainer(trend.containerId) : null;

  const round = getRound(currentIdx, total);

  useEffect(() => {
    setChosen(null);
    setShowWhy(false);
  }, [currentIdx]);

  function handleAnswer(value: number) {
    if (isAdvancing) return;
    setChosen(value);
    setIsAdvancing(true);

    dispatch({ type: 'SET_ANSWER', payload: { index: currentIdx, score: value } });

    const updatedAnswers = [...state.answers];
    updatedAnswers[currentIdx] = value;

    setTimeout(() => {
      if (isLast) {
        const scores = computeScores(updatedAnswers, state.selectedTrends, questions);
        const actions = selectActions(scores.dimensions, state.selectedTrends);
        dispatch({ type: 'SET_RESULTS', payload: { scores, actions } });
        dispatch({ type: 'GO_TO_STEP', payload: 'results' });
      } else {
        setCurrentIdx(i => i + 1);
        setIsAdvancing(false);
      }
    }, 500);
  }

  if (!question) return null;

  return (
    <main style={styles.page} className="animate-in">
      <div style={styles.inner}>
        {/* Progress */}
        <ProgressIndicator current={currentIdx} total={total} round={round} />

        {/* Round label */}
        <div style={styles.roundInfo}>
          <span style={styles.roundLabel}>{ROUND_LABELS[round]}</span>
        </div>

        {/* Trend & container badges */}
        <div style={styles.badges}>
          {container && (
            <span style={{
              ...styles.badge,
              color: container.accentColor,
              borderColor: `${container.accentColor}55`,
              background: `${container.accentColor}18`,
            }}>
              {container.name}
            </span>
          )}
          {trend && (
            <span style={styles.trendBadge}>
              {trend.name}
            </span>
          )}
        </div>

        {/* Question */}
        <div style={styles.questionArea}>
          <p style={styles.questionText}>{question.prompt}</p>
          {question.helper && (
            <p style={styles.questionHelper}>{question.helper}</p>
          )}
        </div>

        {/* Why it matters */}
        {question.whyItMatters && (
          <div>
            <button
              onClick={() => setShowWhy(v => !v)}
              style={styles.whyBtn}
              aria-expanded={showWhy}
            >
              <span style={styles.whyIcon}>?</span>
              Pourquoi cette question ?
            </button>
            {showWhy && (
              <p style={styles.whyText}>{question.whyItMatters}</p>
            )}
          </div>
        )}

        {/* Options */}
        <div style={styles.answers}>
          {question.options.map((option) => {
            const isChosen = chosen === option.value;
            const isFaded = chosen !== null && !isChosen;

            return (
              <button
                key={option.id}
                onClick={() => handleAnswer(option.value)}
                disabled={chosen !== null}
                style={{
                  ...styles.answerBtn,
                  ...(isChosen ? styles.answerChosen : {}),
                  ...(isFaded ? styles.answerFaded : {}),
                }}
                aria-pressed={isChosen}
              >
                <span style={{ ...styles.answerScore, ...(isChosen ? styles.answerScoreChosen : {}) }}>
                  {option.value}
                </span>
                <span style={styles.answerText}>{option.label}</span>
                {isChosen && (
                  <svg style={styles.checkIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>

        {/* Score legend */}
        <p style={styles.legend}>
          0 = Non adressé · 1 = Partiel · 2 = En cours · 3 = Complet
        </p>
      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100dvh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    paddingTop: 96,
  },
  inner: {
    width: '100%',
    maxWidth: 640,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  roundInfo: {
    display: 'flex',
    alignItems: 'center',
  },
  roundLabel: {
    fontSize: 12,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    color: 'rgba(255,255,255,0.35)',
  },
  badges: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
  },
  badge: {
    fontSize: 11,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    padding: '4px 10px',
    borderRadius: 999,
    border: '1px solid',
  },
  trendBadge: {
    fontSize: 12,
    fontWeight: 600,
    padding: '4px 10px',
    borderRadius: 999,
    border: '1px solid rgba(255,255,255,0.2)',
    color: 'rgba(255,255,255,0.7)',
    background: 'rgba(255,255,255,0.07)',
  },
  questionArea: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  questionText: {
    fontSize: 'clamp(20px, 4vw, 26px)',
    fontWeight: 700,
    color: '#FFFFFF',
    lineHeight: 1.35,
  },
  questionHelper: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.45)',
    lineHeight: 1.5,
    fontStyle: 'italic',
  },
  whyBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px 0',
    color: 'rgba(18,171,219,0.8)',
    fontSize: 13,
    fontWeight: 600,
    WebkitTapHighlightColor: 'transparent',
  },
  whyIcon: {
    width: 18,
    height: 18,
    borderRadius: '50%',
    border: '1.5px solid rgba(18,171,219,0.7)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 11,
    fontWeight: 800,
    color: '#12ABDB',
    flexShrink: 0,
  },
  whyText: {
    marginTop: 8,
    fontSize: 13,
    color: 'rgba(255,255,255,0.5)',
    lineHeight: 1.55,
    padding: '10px 14px',
    background: 'rgba(18,171,219,0.07)',
    borderRadius: 8,
    borderLeft: '2px solid rgba(18,171,219,0.4)',
  },
  answers: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  answerBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    padding: '16px 18px',
    minHeight: 72,
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 12,
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 200ms',
    WebkitTapHighlightColor: 'transparent',
    width: '100%',
  },
  answerChosen: {
    background: 'rgba(18,171,219,0.15)',
    borderColor: '#12ABDB',
    borderWidth: 2,
  },
  answerFaded: {
    opacity: 0.35,
  },
  answerScore: {
    width: 32,
    height: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.1)',
    fontSize: 14,
    fontWeight: 800,
    color: 'rgba(255,255,255,0.6)',
    flexShrink: 0,
  },
  answerScoreChosen: {
    background: '#12ABDB',
    color: '#FFFFFF',
  },
  answerText: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 1.4,
    flex: 1,
  },
  checkIcon: {
    color: '#12ABDB',
    flexShrink: 0,
  },
  legend: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.25)',
    textAlign: 'center',
  },
};
