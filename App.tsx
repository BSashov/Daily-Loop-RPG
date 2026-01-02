
import React, { useState } from 'react';
import Layout from './components/Layout';
import TodayView from './components/TodayView';
import CharacterView from './components/CharacterView';
import HistoryView from './components/HistoryView';
import { useGameState } from './hooks/useGameState';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('today');
  const { state, toggleAction, updateLog, allocatePoint, exportData, importData } = useGameState();

  const renderContent = () => {
    switch (activeTab) {
      case 'today':
        return <TodayView state={state} onToggle={toggleAction} onUpdateLog={updateLog} />;
      case 'character':
        return (
          <CharacterView 
            state={state} 
            onAllocate={allocatePoint} 
            onExport={exportData} 
            onImport={importData} 
          />
        );
      case 'history':
        return <HistoryView state={state} />;
      default:
        return <TodayView state={state} onToggle={toggleAction} onUpdateLog={updateLog} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 selection:bg-indigo-100">
      <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
        {renderContent()}
      </Layout>
    </div>
  );
};

export default App;
