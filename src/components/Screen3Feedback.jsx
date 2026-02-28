import { useState } from 'react';
import { ArrowRight, Zap, Target, Smile } from 'lucide-react';

export default function Screen3Feedback({ onNext, updateData, initialData }) {
  const [energy, setEnergy] = useState(initialData?.energy || 50);
  const [focus, setFocus] = useState(initialData?.focus || 50);
  const [mood, setMood] = useState(initialData?.mood || 50);

  const handleNext = () => {
    updateData({ energy, focus, mood });
    onNext();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '1.75rem', marginBottom: '8px' }}>How are you feeling?</h1>
        <p className="card-subtitle">Your physical state helps us adapt your nutrition.</p>
      </div>

      <div className="glass-panel" style={{ padding: '24px', flex: 1 }}>
        <div className="slider-container">
          <div className="slider-header">
            <span className="slider-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap size={18} color="var(--accent-primary)" /> Energy Level
            </span>
            <span className="slider-value">{energy}%</span>
          </div>
          <input 
            type="range" 
            min="0" max="100" 
            value={energy} 
            onChange={(e) => setEnergy(e.target.value)}
            className="slider-input" 
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '8px' }}>
            <span>Exhausted</span>
            <span>Energized</span>
          </div>
        </div>

        <div className="slider-container">
          <div className="slider-header">
            <span className="slider-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Target size={18} color="var(--accent-secondary)" /> Focus & Study
            </span>
            <span className="slider-value" style={{ color: 'var(--accent-secondary)' }}>{focus}%</span>
          </div>
          <input 
            type="range" 
            min="0" max="100" 
            value={focus} 
            onChange={(e) => setFocus(e.target.value)}
            className="slider-input" 
            style={{ '--accent-primary': 'var(--accent-secondary)' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '8px' }}>
            <span>Distracted</span>
            <span>Locked In</span>
          </div>
        </div>

        <div className="slider-container" style={{ marginBottom: 0 }}>
          <div className="slider-header">
            <span className="slider-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Smile size={18} color="#fbbf24" /> Digestion & Mood
            </span>
            <span className="slider-value" style={{ color: '#fbbf24' }}>{mood}%</span>
          </div>
          <input 
            type="range" 
            min="0" max="100" 
            value={mood} 
            onChange={(e) => setMood(e.target.value)}
            className="slider-input" 
            style={{ '--accent-primary': '#fbbf24' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '8px' }}>
            <span>Heavy / Bloated</span>
            <span>Light / Happy</span>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'center' }}>
        <button 
          className="primary-btn" 
          style={{ width: '100%', padding: '16px' }}
          onClick={handleNext}
        >
          Generate Recommendations <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
