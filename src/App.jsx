import { useState } from "react";
import { Settings, User, Compass, ChevronLeft } from "lucide-react";

import Screen1SelectMess from "./components/Screen1SelectMess";
import Screen1bCustomMenu from "./components/Screen1bCustomMenu";
import Screen2MenuView from "./components/Screen2MenuView";
import Screen3Feedback from "./components/Screen3Feedback";
import Screen4Recommendations from "./components/Screen4Recommendations";
import Screen5Dashboard from "./components/Screen5Dashboard";

function App() {
  const [currentScreen, setCurrentScreen] = useState(1);
  const [appData, setAppData] = useState({
    messDetails: null, // { hostel, provider }
    menuAnalysis: null, // { menu, deficiencies }
    feedback: null, // { energy, focus, mood }
  });

  const nextScreen = (step = 1) => {
    setCurrentScreen(currentScreen + step);
  };

  const prevScreen = (step = 1) => {
    setCurrentScreen(currentScreen - step);
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
          <button className="icon-btn" onClick={() => setCurrentScreen(5)}>
            <User size={18} />
          </button>
          <button className="icon-btn" onClick={() => setCurrentScreen(1)}>
            <Settings size={18} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="content-padding animate-fade-in" key={currentScreen}>
        {currentScreen === 1 && (
          <Screen1SelectMess
            onNext={(isCustom) => nextScreen(isCustom ? 0.5 : 1)}
            updateData={(data) => updateAppData("messDetails", data)}
            initialData={appData.messDetails}
          />
        )}
        {currentScreen === 1.5 && (
          <Screen1bCustomMenu
            onNext={() => nextScreen(0.5)}
            updateData={(data) => updateAppData("menuAnalysis", data)}
          />
        )}
        {currentScreen === 2 && (
          <Screen2MenuView
            onNext={() => nextScreen(1)}
            updateData={(data) => updateAppData("menuAnalysis", data)}
            messDetails={appData.messDetails}
          />
        )}
        {currentScreen === 3 && (
          <Screen3Feedback
            onNext={() => nextScreen(1)}
            updateData={(data) => updateAppData("feedback", data)}
            initialData={appData.feedback}
          />
        )}
        {currentScreen === 4 && (
          <Screen4Recommendations 
            appData={appData} 
            onNext={() => nextScreen(1)}
          />
        )}
        {currentScreen === 5 && (
          <Screen5Dashboard />
        )}
      </main>
    </div>
  );
}

export default App;
