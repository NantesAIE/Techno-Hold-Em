import type { ScoreResult } from '../engine/scoring';
import type { SelectedAction } from '../engine/actionsEngine';
import type { Question } from '../data/questions';

export type Step = 'home' | 'trends' | 'game' | 'results' | 'email';

export interface AppState {
  step: Step;
  questions: Question[];   // dynamically selected from QUESTION_BANK
  selectedTrends: string[];
  answers: number[];       // answers[i] = score for question i (0–3)
  scores: ScoreResult | null;
  selectedActions: SelectedAction[];
  email: string;
}

export type AppAction =
  | { type: 'GO_TO_STEP'; payload: Step }
  | { type: 'SET_TRENDS'; payload: string[] }
  | { type: 'SET_QUESTIONS'; payload: Question[] }
  | { type: 'SET_ANSWER'; payload: { index: number; score: number } }
  | { type: 'SET_RESULTS'; payload: { scores: ScoreResult; actions: SelectedAction[] } }
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'RESET' };

export const INITIAL_STATE: AppState = {
  step: 'home',
  questions: [],
  selectedTrends: [],
  answers: [],
  scores: null,
  selectedActions: [],
  email: '',
};
