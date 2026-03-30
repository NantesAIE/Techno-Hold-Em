import type { ScoreResult } from '../engine/scoring';
import type { SelectedAction } from '../engine/actionsEngine';

export type Step = 'home' | 'setup' | 'trends' | 'game' | 'results' | 'email';

export interface ProjectInfo {
  name: string;
  sector: string;
  nature: string;
  contractMode: string;
}

export interface AppState {
  step: Step;
  project: ProjectInfo;
  selectedTrends: string[];
  answers: number[]; // answers[i] = score for question i (0–3)
  scores: ScoreResult | null;
  selectedActions: SelectedAction[];
  email: string;
}

export type AppAction =
  | { type: 'GO_TO_STEP'; payload: Step }
  | { type: 'SET_PROJECT'; payload: ProjectInfo }
  | { type: 'SET_TRENDS'; payload: string[] }
  | { type: 'SET_ANSWER'; payload: { index: number; score: number } }
  | { type: 'SET_RESULTS'; payload: { scores: ScoreResult; actions: SelectedAction[] } }
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'RESET' };

export const INITIAL_STATE: AppState = {
  step: 'home',
  project: { name: '', sector: '', nature: '', contractMode: '' },
  selectedTrends: [],
  answers: [],
  scores: null,
  selectedActions: [],
  email: '',
};
