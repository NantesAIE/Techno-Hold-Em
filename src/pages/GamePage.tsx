import React, { useState, useEffect } from 'react';
import { useApp } from '../store/AppContext';
import { QUESTIONS } from '../data/questions';
import { computeScores } from '../engine/scoring';
import { selectActions } from '../engine/actionsEngine';
import ProgressIndicator from '../components/ProgressIndicator';

export default function GamePage() {
  const { state, dispatch } = useApp();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [isAdvancing, setIsAdvancing] = useState(false);

  const question = QUESTIONS[currentIdx];
  const total = QUESTIONS.length;
  const isLast = currentIdx === total - 1;

  // Reset chosen when question changes
  useEffect(() => {
    setChosen(null);
  }, [currentIdx]);

  function handleAnswer(score: number) {
    if (isAdvancing) return;
    setChosen(score);
    setIsAdvancing(true);

    // Save answer
    dispatch({ type: 'SET_ANSWER', payload: { index: currentIdx, score } });

    // Build updated answers array (state is async, compute manually)
    const updatedAnswers = [...state.answers];
    updatedAnswers[currentIdx] = score;

    setTimeout(() => {
      if (isLast) {
        // Compute results
        const scores = computeScores(updatedAnswers, state.selectedTrends);
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
        <ProgressIndicator current={currentIdx} total={total} round={question.round} />

        {/* Round description */}
        <div style={styles.roundInfo}>
          <span style={styles.roundLabel}>{question.roundLabel}</span>
        </div>

        {/* Question */}
        <div style={styles.questionArea}>
          <p style={styles.questionText}>{question.text}</p>
          {question.subtitle && (
            <p style={styles.questionSubtitle}>{question.subtitle}</p>
          )}
        </div>

        {/* Answers */}
        <div style={styles.answers}>
          {question.answers.map((answer, idx) => {
            const isChosen = chosen === answer.score;
            const isWrong = chosen !== null && !isChosen;

            return (
              <button
                key={idx}
                onClick={() => handleAnswer(answer.score)}
                disabled={chosen !== null}
                style={{
                  ...styles.answerBtn,
                  ...(isChosen ? styles.answerChosen : {}),
                  ...(isWrong ? styles.answerFaded : {}),
                }}
                aria-pressed={isChosen}
              >
                <span style={{ ...styles.answerScore, ...(isChosen ? styles.answerScoreChosen : {}) }}>
                  {answer.score}
                </span>
                <span style={styles.answerText}>{answer.text}</span>
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
    gap: 24,
  },
  roundInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  roundLabel: {
    fontSize: 12,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    color: 'rgba(255,255,255,0.35)',
  },
  questionArea: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  questionText: {
    fontSize: 'clamp(20px, 4vw, 26px)',
    fontWeight: 700,
    color: '#FFFFFF',
    lineHeight: 1.35,
  },
  questionSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.45)',
    lineHeight: 1.5,
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
