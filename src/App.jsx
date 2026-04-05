import { useState, useEffect } from "react";
import StarField from "./components/StarField";
import ControlPanel, { DEFAULT_SETTINGS } from "./components/ControlPanel";
import MusicPlayer from "./components/MusicPlayer";
import FullscreenButton from "./components/FullscreenButton";
import { LangProvider } from "./i18n";

const STORAGE_KEY = "kintana_settings";

/** Load saved settings from localStorage, merging with defaults */
function loadSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved) return { ...DEFAULT_SETTINGS, ...saved };
  } catch {}
  return DEFAULT_SETTINGS;
}

/** Persist settings to localStorage */
function saveSettings(settings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {}
}

function App() {
  const [settings, setSettings] = useState(loadSettings);
  const [activePanel, setActivePanel] = useState(null);

  // Save to localStorage whenever settings change
  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  const togglePanel = (panel) => {
    setActivePanel((prev) => (prev === panel ? null : panel));
  };

  const closeAll = () => setActivePanel(null);

  return (
    <LangProvider>
      <StarField settings={settings} />
      {activePanel && (
        <div
          onClick={closeAll}
          style={{ position: "fixed", inset: 0, zIndex: 999 }}
        />
      )}
      <ControlPanel
        settings={settings}
        onChange={setSettings}
        isOpen={activePanel === "settings"}
        onToggle={() => togglePanel("settings")}
      />
      <MusicPlayer
        isOpen={activePanel === "music"}
        onToggle={() => togglePanel("music")}
      />
      <FullscreenButton />
    </LangProvider>
  );
}

export default App;
