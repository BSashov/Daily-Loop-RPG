
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-900 shadow-2xl flex flex-col relative pb-20 border-x border-slate-800">
      <header className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/80 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.5)] border border-indigo-400/30">
            <span className="text-2xl filter drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">🐺</span>
          </div>
          <h1 className="text-xl font-bold fantasy-title text-indigo-400 tracking-wider">The Daily Loop</h1>
        </div>
        <div className="flex items-center space-x-2">
          <div className="bg-indigo-900/50 text-indigo-300 border border-indigo-500/30 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
            RPG
          </div>
        </div>
      </header>
      
      <main className="flex-1 overflow-y-auto bg-slate-950">
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 flex justify-around p-3 z-30 shadow-[0_-8px_16px_-4px_rgba(0,0,0,0.5)]">
        <NavButton 
          active={activeTab === 'today'} 
          onClick={() => setActiveTab('today')}
          label="Quests"
          icon="🐺"
        />
        <NavButton 
          active={activeTab === 'character'} 
          onClick={() => setActiveTab('character')}
          label="Hero"
          icon="🧙"
        />
        <NavButton 
          active={activeTab === 'history'} 
          onClick={() => setActiveTab('history')}
          label="Tome"
          icon="📜"
        />
      </nav>
    </div>
  );
};

const NavButton = ({ active, onClick, label, icon }: { active: boolean, onClick: () => void, label: string, icon: string }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center space-y-1 transition-all px-4 py-1 rounded-xl ${active ? 'text-indigo-400 bg-indigo-500/10 scale-110' : 'text-slate-500 hover:text-slate-300'}`}
  >
    <span className="text-xl">{icon}</span>
    <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
  </button>
);

export default Layout;
