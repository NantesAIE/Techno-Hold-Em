import { useState } from 'react';
import { useApp } from '../store/AppContext';
import { CONTAINERS, TRENDS, getContainer } from '../data/technovision2026';

const MIN_TRENDS = 3;
const MAX_TRENDS = 5;

export default function TrendSelection() {
  const { state, dispatch } = useApp();
  const [selected, setSelected] = useState<Set<string>>(new Set(state.selectedTrends));

  const hasBalanceByDesign = [...selected].some(id => {
    const t = TRENDS.find(tr => tr.id === id);
    return t?.containerId === 'balance-by-design';
  });

  const count = selected.size;
  const canProceed = count >= MIN_TRENDS && count <= MAX_TRENDS && hasBalanceByDesign;

  function toggle(trendId: string) {
    setSelected(prev => {
      const trend = TRENDS.find(t => t.id === trendId);
      if (prev.has(trendId)) {
        // Prevent deselecting the last Balance by Design trend
        if (trend?.containerId === 'balance-by-design') {
          const balanceCount = [...prev].filter(id => {
            const t = TRENDS.find(tr => tr.id === id);
            return t?.containerId === 'balance-by-design';
          }).length;
          if (balanceCount <= 1) return prev;
        }
        const after = new Set(prev);
        after.delete(trendId);
        if (after.size >= MIN_TRENDS) return after;
        return prev;
      } else {
        if (prev.size >= MAX_TRENDS) return prev;
        const next = new Set(prev);
        next.add(trendId);
        return next;
      }
    });
  }

  function handleConfirm() {
    dispatch({ type: 'SET_TRENDS', payload: [...selected] });
    dispatch({ type: 'GO_TO_STEP', payload: 'game' });
  }

  const countColor = canProceed ? '#4CAF50' : count >= 3 ? '#FF9800' : '#12ABDB';

  return (
    <main className="page animate-in" style={{ paddingBottom: 40 }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: '#FFFFFF', marginBottom: 8 }}>Votre main</h2>
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 15, lineHeight: 1.5 }}>
          Selectionnez les trends TechnoVision 2026 de votre projet.
          <br />
          Au moins 1 trend <strong>Balance by Design</strong> est obligatoire.
        </p>
      </div>

      {/* Hand summary bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(18,171,219,0.07)',
        border: '1px solid rgba(18,171,219,0.2)',
        borderRadius: 10,
        padding: '10px 16px',
        marginBottom: 12,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'rgba(255,255,255,0.4)' }}>
            Main selectionnee
          </span>
          <span style={{ fontSize: 13, fontWeight: 700, color: countColor }}>
            {count} / {MAX_TRENDS} trends
          </span>
        </div>
        {!hasBalanceByDesign && count > 0 && (
          <span style={{ fontSize: 12, color: '#FF9800', fontWeight: 600 }}>
            Balance by Design requis
          </span>
        )}
      </div>

      {/* Selected chips */}
      {count > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
          {[...selected].map(id => {
            const t = TRENDS.find(tr => tr.id === id);
            const c = t ? getContainer(t.containerId) : null;
            const color = c?.accentColor ?? '#12ABDB';
            return (
              <span key={id} style={{
                fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 999,
                border: `1px solid ${color}`, color, background: `${color}18`,
              }}>
                {t?.name ?? id}
              </span>
            );
          })}
        </div>
      )}

      {/* Containers grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 12,
        marginBottom: 24,
      }}>
        {CONTAINERS.map(container => {
          const containerTrends = TRENDS.filter(t => t.containerId === container.id);
          const isBalance = container.id === 'balance-by-design';

          return (
            <div key={container.id} className="card" style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: container.accentColor, flexShrink: 0 }} />
                <span style={{ fontSize: 13, fontWeight: 700, color: '#FFFFFF', flex: 1 }}>{container.name}</span>
                {isBalance && (
                  <span style={{
                    fontSize: 10, fontWeight: 700, background: 'rgba(18,171,219,0.2)', color: '#12ABDB',
                    padding: '2px 8px', borderRadius: 999, textTransform: 'uppercase', letterSpacing: '0.06em',
                  }}>Requis</span>
                )}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {containerTrends.map(trend => {
                  const isSelected = selected.has(trend.id);
                  const isDisabled = !isSelected && count >= MAX_TRENDS;

                  return (
                    <button
                      key={trend.id}
                      onClick={() => !isDisabled && toggle(trend.id)}
                      aria-pressed={isSelected}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        padding: '10px 12px', minHeight: 44,
                        background: isSelected ? `${container.accentColor}18` : 'rgba(255,255,255,0.04)',
                        border: isSelected ? `2px solid ${container.accentColor}` : '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 8, cursor: isDisabled ? 'not-allowed' : 'pointer',
                        textAlign: 'left', transition: 'all 150ms',
                        WebkitTapHighlightColor: 'transparent',
                        opacity: isDisabled ? 0.35 : 1,
                        color: isSelected ? container.accentColor : 'rgba(255,255,255,0.8)',
                        width: '100%',
                      }}
                    >
                      {isSelected && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ flexShrink: 0 }}>
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      )}
                      <span style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.3 }}>{trend.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Sticky CTA */}
      <div style={{
        display: 'flex', flexDirection: 'column', gap: 10,
        position: 'sticky', bottom: 16,
        background: 'linear-gradient(to top, rgba(39,41,54,1) 60%, rgba(39,41,54,0))',
        paddingTop: 24, paddingBottom: 8, marginTop: 'auto',
      }}>
        <button
          className="btn btn-primary btn-lg btn-full"
          disabled={!canProceed}
          onClick={handleConfirm}
        >
          Lancer l&apos;assessment ({count} trend{count > 1 ? 's' : ''})
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
        {!canProceed && (
          <p style={{ fontSize: 13, color: '#FF9800', textAlign: 'center' }}>
            {!hasBalanceByDesign
              ? 'Selectionnez au moins 1 trend Balance by Design'
              : count < MIN_TRENDS
              ? `Selectionnez au moins ${MIN_TRENDS} trends`
              : ''}
          </p>
        )}
      </div>
    </main>
  );
}
