
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import TodayView from './components/TodayView';
import CharacterView from './components/CharacterView';
import HistoryView from './components/HistoryView';
import SettingsView from './components/SettingsView';
import HeroSelection from './components/HeroSelection';
import { useGameState } from './hooks/useGameState';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('today');
  const { 
    state, 
    toggleAction, 
    updateLog, 
    exportData, 
    importData, 
    updateSettings, 
    toggleHistoryEntry,
    updateHistoryLog,
    selectHero
  } = useGameState();
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [lastLevel, setLastLevel] = useState(state.level);

  useEffect(() => {
    if (state.level > lastLevel) {
      setShowLevelUp(true);
      setLastLevel(state.level);
    }
  }, [state.level, lastLevel]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case 'today':
        return <TodayView state={state} onToggle={toggleAction} onUpdateLog={updateLog} />;
      case 'character':
        return <CharacterView state={state} onExport={exportData} onImport={importData} />;
      case 'history':
        return (
          <HistoryView 
            state={state} 
            onToggleHistory={toggleHistoryEntry} 
            onUpdateHistoryLog={updateHistoryLog}
          />
        );
      case 'settings':
        return <SettingsView settings={state.settings} onUpdate={updateSettings} />;
      default:
        return <TodayView state={state} onToggle={toggleAction} onUpdateLog={updateLog} />;
    }
  };

  // If no hero selected, force selection screen
  if (!state.selectedHeroId) {
    return <HeroSelection language={state.settings.language} onSelect={selectHero} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 selection:bg-indigo-500/30">
      <Layout 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        language={state.settings.language}
      >
        {renderContent()}
      </Layout>

      {/* Level Up Ritual Overlay */}
      {showLevelUp && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-xl animate-in fade-in zoom-in duration-500"
          onClick={() => setShowLevelUp(false)}
        >
          <div className="text-center space-y-6 max-w-xs">
            <div className="relative inline-block">
               <div className="absolute inset-0 bg-indigo-500 blur-3xl opacity-40 animate-pulse" />
               <span className="text-8xl relative z-10">✨</span>
            </div>
            <h2 className="text-4xl fantasy-title text-indigo-400 animate-bounce">Transcendence!</h2>
            <div className="bg-slate-900 border border-indigo-500/30 p-6 rounded-3xl space-y-2 shadow-2xl">
              <p className="text-slate-400 text-sm">You have ascended to</p>
              <p className="text-5xl font-black text-white">Level {state.level}</p>
            </div>
            <button className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl shadow-lg active:scale-95 transition-transform">
              Accept Power
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
