import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import { suggestTrends } from '../data/technovision2026';

const SECTORS = [
  'Public',
  'Financial Services',
  'Manufacturing',
  'Energy & Utilities',
  'Retail / CPG',
  'Telco / Media',
  'Cross-industry',
];

const NATURES = ['BUILD', 'BUILD / RUN', 'TMA'];

const CONTRACT_MODES = [
  'Time & Materials',
  'Forfait en jours',
  'Forfait en points',
];

export default function ProjectSetup() {
  const { dispatch } = useApp();
  const [name, setName] = useState('');
  const [sector, setSector] = useState('');
  const [nature, setNature] = useState('');
  const [contractMode, setContractMode] = useState('');

  const isValid = name.trim().length > 0 && sector && nature && contractMode;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;

    dispatch({ type: 'SET_PROJECT', payload: { name: name.trim(), sector, nature, contractMode } });

    // Pre-compute trend suggestions
    const suggested = suggestTrends(sector, nature);
    dispatch({ type: 'SET_TRENDS', payload: suggested });

    dispatch({ type: 'GO_TO_STEP', payload: 'trends' });
  }

  return (
    <main className="page animate-in">
      <div style={styles.header}>
        <h2 style={styles.title}>Votre projet</h2>
        <p style={styles.subtitle}>Quelques informations pour personnaliser votre assessment.</p>
      </div>

      <form onSubmit={handleSubmit} style={styles.form} noValidate>
        <div className="form-group">
          <label className="form-label" htmlFor="project-name">Nom du projet *</label>
          <input
            id="project-name"
            type="text"
            className="form-input"
            placeholder="ex. Projet Iris, Migration Cloud Phase 2…"
            value={name}
            onChange={e => setName(e.target.value)}
            autoComplete="off"
            maxLength={80}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="sector">Secteur *</label>
          <select
            id="sector"
            className="form-select"
            value={sector}
            onChange={e => setSector(e.target.value)}
          >
            <option value="">— Choisir un secteur —</option>
            {SECTORS.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div style={styles.row}>
          <div className="form-group" style={styles.flex1}>
            <label className="form-label" htmlFor="nature">Nature *</label>
            <select
              id="nature"
              className="form-select"
              value={nature}
              onChange={e => setNature(e.target.value)}
            >
              <option value="">— Nature —</option>
              {NATURES.map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          <div className="form-group" style={styles.flex1}>
            <label className="form-label" htmlFor="contract">Mode contractuel *</label>
            <select
              id="contract"
              className="form-select"
              value={contractMode}
              onChange={e => setContractMode(e.target.value)}
            >
              <option value="">— Mode —</option>
              {CONTRACT_MODES.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={styles.actions}>
          <button
            type="submit"
            className="btn btn-primary btn-lg btn-full"
            disabled={!isValid}
          >
            Suivant — Choisir les trends
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </form>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 800,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: 15,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  row: {
    display: 'flex',
    gap: 16,
  },
  flex1: {
    flex: 1,
  },
  actions: {
    marginTop: 16,
  },
};
