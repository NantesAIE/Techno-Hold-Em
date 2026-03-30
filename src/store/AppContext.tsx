import React, { createContext, useContext, useReducer } from 'react';
import type { AppState, AppAction } from './types';
import { INITIAL_STATE } from './types';

function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'GO_TO_STEP':
      return { ...state, step: action.payload };

    case 'SET_PROJECT':
      return { ...state, project: action.payload };

    case 'SET_TRENDS':
      return { ...state, selectedTrends: action.payload };

    case 'SET_ANSWER': {
      const answers = [...state.answers];
      answers[action.payload.index] = action.payload.score;
      return { ...state, answers };
    }

    case 'SET_RESULTS':
      return {
        ...state,
        scores: action.payload.scores,
        selectedActions: action.payload.actions,
      };

    case 'SET_EMAIL':
      return { ...state, email: action.payload };

    case 'RESET':
      return { ...INITIAL_STATE };

    default:
      return state;
  }
}

interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
