import { useState } from 'react';
import { Sparkles, Package, ExternalLink, Check } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

export default function Screen4Recommendations({ appData }) {
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState(null);
  const [error, setError] = useState(null);
  
  const apiKey = 'AIzaSyCCK5X9rCds3YZwfdCepQ56UGSNQawFVUw';

  const generateRecommendations = async () => {
    setLoading(true);
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey });
      
      const prompt = `
        You are an expert AI nutritionist for an adaptive D2C startup targeting students in hostels.
        
        The student's current situation today:
        Menu: ${JSON.stringify(appData.menuAnalysis?.menu)}
        Deficiencies found: ${appData.menuAnalysis?.deficiencies?.join(', ')}
        Their Feedback (0-100 scale):
        - Energy: ${appData.feedback?.energy}
        - Focus: ${appData.feedback?.focus}
        - Mood/Digestion: ${appData.feedback?.mood}
        
        Based on this, recommend 2 adaptive D2C products (from: Focus Gummies, Energy Gummies, Stress Relief Gummies, Protein Bars, Recovery Nutrition Packs).
        
        Respond ONLY with a raw JSON object (do not wrap in markdown \`\`\`json blocks) in the following format:
        {
          "summary": "A 2-sentence encouraging synthesis of their state and why they need these.",
          "products": [
            {
              "name": "Product Name",
              "reason": "Why specifically this product for this student today based on data.",
              "type": "gummy" | "bar" | "pack"
            }
          ]
        }
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      });
      
      let text = response.text;
      
      // Attempt to clean JSON if model didn't follow instruction completely
      if (text.startsWith('```json')) {
        text = text.replace(/```json\n/, '').replace(/\n```$/, '');
      }

      const result = JSON.parse(text);
      setRecommendations(result);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch recommendations. Ensure your API key is correct or check the console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.75rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles color="var(--accent-primary)" size={24} /> 
          Adaptive Add-ons
        </h1>
        <p className="card-subtitle">Your personalized daily nutrition stack.</p>
      </div>

      {error && (
        <div className="badge danger" style={{ padding: '12px', marginBottom: '24px', width: '100%', justifyContent: 'center' }}>
          {error}
        </div>
      )}

      {!recommendations ? (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
              <div className="loader" style={{ width: '40px', height: '40px', borderTopColor: 'var(--accent-secondary)' }}></div>
              <p style={{ color: 'var(--text-secondary)' }}>Fusing mess data & feedback...</p>
            </div>
          ) : (
            <button 
              className="primary-btn" 
              onClick={generateRecommendations}
              style={{ animation: 'pulse-glow 2s infinite', padding: '16px 32px' }}
            >
              <Sparkles size={20} /> Generate AI Stack
            </button>
          )}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="glass-panel" style={{ padding: '16px', background: 'rgba(16, 185, 129, 0.05)' }}>
            <p style={{ fontStyle: 'italic', fontSize: '0.95rem', color: 'rgba(255,255,255,0.9)' }}>
              "{recommendations.summary}"
            </p>
          </div>

          <h3 style={{ fontSize: '1.25rem', marginTop: '8px' }}>Today's Package</h3>
          
          {recommendations.products.map((product, idx) => (
            <div key={idx} className="glass-panel" style={{ padding: '16px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, right: 0, width: '4px', height: '100%', background: product.type === 'gummy' ? 'var(--accent-secondary)' : 'var(--accent-primary)' }}></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <div style={{ background: 'rgba(255,255,255,0.1)', padding: '10px', borderRadius: '12px' }}>
                  <Package size={24} color={product.type === 'gummy' ? 'var(--accent-secondary)' : 'var(--accent-primary)'} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{product.name}</h4>
                  <span className="badge" style={{ marginTop: '4px', background: 'rgba(255,255,255,0.05)' }}>{product.type.toUpperCase()}</span>
                </div>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '12px' }}>
                <Check size={14} color="var(--accent-primary)" style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }} />
                {product.reason}
              </p>
            </div>
          ))}

          <button className="primary-btn" style={{ marginTop: '16px', padding: '16px' }}>
            Confirm Daily Stack <ExternalLink size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
