import { useState } from 'react';
import { MapPin, Building, ArrowRight, Utensils } from 'lucide-react';

export default function Screen1SelectMess({ onNext, updateData, initialData }) {
  const [hostel, setHostel] = useState(initialData?.hostel || '');
  const [provider, setProvider] = useState(initialData?.provider || '');

  const handleNext = () => {
    updateData({ hostel, provider });
    onNext();
  };

  const isComplete = hostel && provider;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '1.75rem', marginBottom: '8px' }}>Select Your Mess</h1>
        <p className="card-subtitle">Connect your daily food source to sync data.</p>
      </div>

      <div className="glass-panel" style={{ padding: '24px', marginBottom: 'auto' }}>
        <div className="input-group">
          <label className="input-label">
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={16} /> Campus / City
            </span>
          </label>
          <div className="select-wrapper">
            <select className="select-base" disabled defaultValue="kota">
              <option value="kota">Kota (Pilot Program Active)</option>
            </select>
          </div>
        </div>

        <div className="input-group">
          <label className="input-label">
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Building size={16} /> Select Hostel
            </span>
          </label>
          <div className="select-wrapper">
            <select 
              className="select-base" 
              value={hostel} 
              onChange={(e) => setHostel(e.target.value)}
            >
              <option value="" disabled>Choose your hostel...</option>
              <option value="allen_boys">Allen Boys Residency 1</option>
              <option value="bansal_girls">Bansal Girls Hostel</option>
              <option value="motion_residency">Motion Residency Block A</option>
              <option value="resonance_hostel">Resonance Premium Housing</option>
            </select>
          </div>
        </div>

        <div className="input-group" style={{ marginBottom: 0 }}>
          <label className="input-label">
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Utensils size={16} /> Mess Provider
            </span>
          </label>
          <div className="select-wrapper">
            <select 
              className="select-base"
              value={provider} 
              onChange={(e) => setProvider(e.target.value)}
            >
              <option value="" disabled>Select food provider...</option>
              <option value="foodtech_mess">FoodTech Standard Mess</option>
              <option value="health_kitchen">Healthy Kitchen Services</option>
              <option value="kota_premium">Kota Premium Dining</option>
            </select>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'center' }}>
        <button 
          className="primary-btn" 
          style={{ width: '100%', padding: '16px' }}
          onClick={handleNext}
          disabled={!isComplete}
        >
          Sync Diet Data <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
