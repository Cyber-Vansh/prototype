import { useState } from 'react';
import { Camera, Type, ArrowRight, X } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

export default function Screen1bCustomMenu({ onNext, updateData }) {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = 'AIzaSyCCK5X9rCds3YZwfdCepQ56UGSNQawFVUw';

  const parseCustomMenu = async () => {
    if (!inputText.trim()) return;
    
    setLoading(true);
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey });
      
      const prompt = `
        You are a smart nutrition parsing AI. A student from India has written down what they ate today at their hostel/mess.
        I need you to parse their input and generate a standard JSON structure of their menu, estimating calories and protein.
        
        Student Input: "${inputText}"
        
        Respond ONLY with a raw JSON object (do not wrap in markdown \`\`\`json blocks) in the exact format below, adding missing standard meals as empty if they didn't mention them:
        {
          "date": "Today",
          "meals": [
            { "name": "Breakfast", "items": "...", "calories": 400, "protein": "10g" },
            { "name": "Lunch", "items": "...", "calories": 600, "protein": "15g" },
            { "name": "Dinner", "items": "...", "calories": 500, "protein": "12g" }
          ],
          "analysis": {
            "totalProtein": "XXg",
            "targetProtein": "60g",
            "status": "Short description of what might be missing based on standard Indian student diets (e.g. Deficient in Fiber & Vitamin B12)"
          }
        }
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      });
      
      let text = response.text;
      if (text.startsWith('\`\`\`json')) {
        text = text.replace(/\`\`\`json\n/, '').replace(/\n\`\`\`$/, '');
      }

      const generatedMenu = JSON.parse(text);
      updateData({
        menu: generatedMenu,
        deficiencies: generatedMenu.analysis.status.split('&').map(s => s.trim().replace('Deficient in ', ''))
      });
      onNext();
      
    } catch (err) {
      console.error(err);
      setError("Failed to parse menu. Please try again or rephrase.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '1.75rem', marginBottom: '8px' }}>Custom Menu</h1>
        <p className="card-subtitle">Tell us what you ate today. AI will handle the rest.</p>
      </div>

      {error && (
        <div className="badge danger" style={{ padding: '12px', marginBottom: '24px', width: '100%', justifyContent: 'center' }}>
          {error}
        </div>
      )}

      <div className="glass-panel" style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
          <button className="secondary-btn" style={{ flex: 1, background: 'rgba(16, 185, 129, 0.1)' }}>
            <Type size={18} /> Type Menu
          </button>
          <button className="secondary-btn" style={{ flex: 1, opacity: 0.5, cursor: 'not-allowed' }}>
            <Camera size={18} /> Snap Photo
          </button>
        </div>

        <textarea
          className="select-base"
          style={{ 
            height: '150px', 
            resize: 'none', 
            background: 'rgba(0,0,0,0.2)',
            border: '1px solid var(--border-light)'
          }}
          placeholder="E.g., I had idli sambar for breakfast, and rice with rajma for lunch. Haven't eaten dinner yet."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />

        <div style={{ marginTop: 'auto', paddingTop: '24px' }}>
          <div className="badge neutral" style={{ width: '100%', justifyContent: 'center', marginBottom: '16px', padding: '12px' }}>
            Powered by Gemini AI Vision & NLP
          </div>

          <button 
            className="primary-btn" 
            style={{ width: '100%', padding: '16px' }}
            onClick={parseCustomMenu}
            disabled={!inputText.trim() || loading}
          >
            {loading ? (
               <div className="loader" style={{ width: '20px', height: '20px' }}></div>
            ) : (
              <>Extract Nutrients <ArrowRight size={20} /></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
