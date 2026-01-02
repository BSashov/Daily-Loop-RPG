
import React from 'react';
import { TRANSLATIONS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: 'en' | 'de' | 'bg';
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, language }) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="mx-auto w-full max-w-2xl min-h-screen bg-slate-950 flex flex-col relative sm:border-x sm:border-slate-800 shadow-2xl">
      {/* Fixed Header */}
      <header className="px-5 py-4 border-b border-slate-900 flex justify-between items-center bg-slate-950/80 backdrop-blur-xl sticky top-0 z-30">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center shadow-[0_0_15px_rgba(79,70,229,0.3)] border border-indigo-400/20">
            <span className="text-2xl filter drop-shadow-[0_0_5px_rgba(255,255,255,0.4)]">🐺</span>
          </div>
          <h1 className="text-lg font-bold fantasy-title text-indigo-400 tracking-wider truncate max-w-[150px] sm:max-w-none">
            {t.title}
          </h1>
        </div>
        
        <button 
          onClick={() => setActiveTab(activeTab === 'settings' ? 'today' : 'settings')}
          className={`p-2 rounded-xl transition-all ${activeTab === 'settings' ? 'bg-indigo-500/10 text-indigo-400 scale-110' : 'text-slate-500 hover:text-slate-300'}`}
          aria-label="Toggle Settings"
        >
          <span className="text-2xl">⚙️</span>
        </button>
      </header>
      
      <main className="flex-1 flex flex-col">
        {children}
      </main>

      {/* Fixed Navbar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-6 pt-2 bg-slate-950/90 backdrop-blur-xl border-t border-slate-900/50 flex justify-around items-center">
        <div className="max-w-md w-full mx-auto flex justify-around">
          <NavButton 
            active={activeTab === 'today'} 
            onClick={() => setActiveTab('today')}
            label={t.quests}
            icon="🐺"
          />
          <NavButton 
            active={activeTab === 'character'} 
            onClick={() => setActiveTab('character')}
            label={t.hero}
            icon="🧙"
          />
          <NavButton 
            active={activeTab === 'history'} 
            onClick={() => setActiveTab('history')}
            label={t.tome}
            icon="📜"
          />
        </div>
      </nav>
    </div>
  );
};

const NavButton = ({ active, onClick, label, icon }: { active: boolean, onClick: () => void, label: string, icon: string }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center space-y-1 transition-all px-4 py-2 rounded-2xl ${
      active ? 'text-indigo-400 bg-indigo-500/10 scale-105' : 'text-slate-500'
    }`}
  >
    <span className={`text-2xl transition-transform ${active ? 'scale-110 drop-shadow-[0_0_8px_rgba(129,140,248,0.5)]' : 'grayscale opacity-50'}`}>
      {icon}
    </span>
    <span className={`text-[9px] font-black uppercase tracking-[0.2em] transition-opacity ${active ? 'opacity-100' : 'opacity-60'}`}>
      {label}
    </span>
  </button>
);

export default Layout;
