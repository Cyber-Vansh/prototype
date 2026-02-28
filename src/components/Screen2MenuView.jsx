import { useState, useEffect } from 'react';
import { Activity, ArrowRight, CheckCircle2, AlertTriangle, Info } from 'lucide-react';

const mockMenu = {
  date: new Date().toLocaleDateString('en-IN', { weekday: 'long', month: 'short', day: 'numeric' }),
  meals: [
    { name: 'Breakfast', items: 'Poha, Jalebi, Tea', calories: 450, protein: '8g' },
    { name: 'Lunch', items: 'Rice, Dal Fry, Aloo Gobi, Roti', calories: 600, protein: '12g' },
    { name: 'Dinner', items: 'Roti, Mixed Sabzi, Curd', calories: 500, protein: '10g' }
  ],
  analysis: {
    totalProtein: '30g',
    targetProtein: '60g',
    status: 'Deficient in Protein & B-Vitamins'
  }
};

export default function Screen2MenuView({ onNext, updateData, messDetails, menuAnalysis }) {
  const [analyzing, setAnalyzing] = useState(!menuAnalysis?.menu);

  // Use the passed in menuAnalysis (from Screen 1.5) or fallback to mock
  const activeMenu = menuAnalysis?.menu || mockMenu;
  const activeDeficiencies = menuAnalysis?.deficiencies || ['Protein', 'B-Vitamins', 'Fiber'];

  useEffect(() => {
    if (analyzing) {
      const timer = setTimeout(() => {
        setAnalyzing(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [analyzing]);

  const handleNext = () => {
    // Save whichever menu we are using to global state
    updateData({
      menu: activeMenu,
      deficiencies: activeDeficiencies
    });
    onNext();
  };

  if (analyzing) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '16px' }}>
        <div className="loader"></div>
        <h3 style={{ color: 'var(--text-secondary)' }}>Syncing menu from provider...</h3>
        <p style={{ fontSize: '0.8rem', opacity: 0.5 }}>Analyzing nutritional gaps</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>Today's Menu</h1>
          <span className="badge neutral">{activeMenu.date || 'Today'}</span>
        </div>
        <p className="card-subtitle">
          {menuAnalysis ? 'Parsed from your custom upload.' : `Auto-synced from ${messDetails?.provider?.replace('_', ' ') || 'your mess'}.`}
        </p>
      </div>

      <div style={{ gap: '12px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {activeMenu.meals?.map((meal, idx) => (
          <div key={idx} className="glass-panel" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontWeight: 600 }}>{meal.name}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                {meal.calories} kcal • {meal.protein}
              </span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{meal.items}</p>
          </div>
        ))}

        <div className="glass-panel" style={{ padding: '16px', marginTop: '12px', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: '#fbbf24' }}>
            <Activity size={18} />
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>AI Diet Analysis</h3>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Dietary Protein:</span>
            <span style={{ fontWeight: 'bold' }}>{activeMenu.analysis?.totalProtein} / <span style={{ color: 'var(--text-secondary)' }}>{activeMenu.analysis?.targetProtein}</span></span>
          </div>
          <div style={{ marginTop: '12px', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
            <AlertTriangle size={16} color="#f87171" style={{ flexShrink: 0, marginTop: '2px' }} />
            <span style={{ fontSize: '0.85rem', color: '#f87171' }}>{activeMenu.analysis?.status}</span>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center' }}>
        <button 
          className="primary-btn" 
          style={{ width: '100%', padding: '16px' }}
          onClick={handleNext}
        >
          Add Daily Feedback <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
