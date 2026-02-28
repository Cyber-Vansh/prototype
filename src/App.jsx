import { useState } from "react";
import { Settings, User, Compass, ChevronLeft } from "lucide-react";

import Screen1SelectMess from "./components/Screen1SelectMess";
import Screen2MenuView from "./components/Screen2MenuView";
import Screen3Feedback from "./components/Screen3Feedback";
import Screen4Recommendations from "./components/Screen4Recommendations";

function App() {
  const [currentScreen, setCurrentScreen] = useState(1);
  const [appData, setAppData] = useState({
    messDetails: null, // { hostel, provider }
    menuAnalysis: null, // { menu, deficiencies }
    feedback: null, // { energy, focus, mood }
  });

  const nextScreen = () => {
    if (currentScreen < 4) setCurrentScreen(currentScreen + 1);
  };

  const prevScreen = () => {
    if (currentScreen > 1) setCurrentScreen(currentScreen - 1);
  };

  const updateAppData = (key, data) => {
    setAppData((prev) => ({ ...prev, [key]: data }));
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        {currentScreen > 1 ? (
          <button className="icon-btn" onClick={prevScreen}>
            <ChevronLeft size={20} />
          </button>
        ) : (
          <div className="app-title">
            <Compass size={24} color="var(--accent-primary)" />
            <span>Adaptive Nutrition</span>
          </div>
        )}
        <div style={{ display: "flex", gap: "8px" }}>
          <button className="icon-btn">
            <User size={18} />
          </button>
          <button className="icon-btn">
            <Settings size={18} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="content-padding animate-fade-in" key={currentScreen}>
        {currentScreen === 1 && (
          <Screen1SelectMess
            onNext={nextScreen}
            updateData={(data) => updateAppData("messDetails", data)}
            initialData={appData.messDetails}
          />
        )}
        {currentScreen === 2 && (
          <Screen2MenuView
            onNext={nextScreen}
            updateData={(data) => updateAppData("menuAnalysis", data)}
            messDetails={appData.messDetails}
          />
        )}
        {currentScreen === 3 && (
          <Screen3Feedback
            onNext={nextScreen}
            updateData={(data) => updateAppData("feedback", data)}
            initialData={appData.feedback}
          />
        )}
        {currentScreen === 4 && <Screen4Recommendations appData={appData} />}
      </main>
    </div>
  );
}

export default App;
