import { Flame, ArrowUpRight, Award, Activity, Calendar } from 'lucide-react';

export default function Screen5Dashboard() {
  const nutritionScore = 85;

  const deficiencies = [
    { name: 'Protein', level: 45, target: 80, unit: 'g' },
    { name: 'Fiber', level: 12, target: 30, unit: 'g' },
    { name: 'Vitamin B12', level: 0.8, target: 2.4, unit: 'mcg' }
  ];

  const subscriptions = [
    { name: 'Focus Gummies', status: 'Active', nextDelivery: 'Oct 15', type: 'gummy' },
    { name: 'Protein Bar (Chocolate)', status: 'Active', nextDelivery: 'Oct 22', type: 'bar' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', paddingBottom: '20px' }}>
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '4px' }}>My Health</h1>
          <p className="card-subtitle">Your 30-day nutrition trends.</p>
        </div>
        <div style={{ background: 'rgba(245, 158, 11, 0.15)', border: '1px solid rgba(245, 158, 11, 0.3)', padding: '12px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Flame color="#fbbf24" size={24} />
          <span style={{ marginLeft: '6px', fontWeight: 'bold', color: '#fbbf24' }}>14</span>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '20px', marginBottom: '24px', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(9, 9, 11, 0.4) 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Award size={20} color="var(--accent-primary)" />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Adaptive Score</h3>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px' }}>
          <span style={{ fontSize: '3rem', fontWeight: 800, lineHeight: 1, color: 'var(--accent-primary)' }}>{nutritionScore}</span>
          <span style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>/ 100</span>
        </div>
        <p style={{ marginTop: '12px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>You are in the top 15% of your hostel this week!</p>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Activity size={18} /> Persistent Gaps
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {deficiencies.map((def, idx) => {
            const percentage = (def.level / def.target) * 100;
            return (
              <div key={idx} className="glass-panel" style={{ padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 500 }}>{def.name}</span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    {def.level}{def.unit} / {def.target}{def.unit}
                  </span>
                </div>
                <div style={{ width: '100%', height: '6px', background: 'var(--bg-glass)', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{ width: `${percentage}%`, height: '100%', background: percentage > 70 ? 'var(--accent-primary)' : percentage > 30 ? '#fbbf24' : '#f87171' }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Calendar size={18} /> Active Stack
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {subscriptions.map((sub, idx) => (
            <div key={idx} className="glass-panel" style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h4 style={{ fontWeight: 600, fontSize: '1rem' }}>{sub.name}</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                  <span className="badge success">{sub.status}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Next: {sub.nextDelivery}</span>
                </div>
              </div>
              <button className="icon-btn" style={{ width: '32px', height: '32px' }}>
                <ArrowUpRight size={16} color="var(--accent-primary)" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
