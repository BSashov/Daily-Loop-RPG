
import React, { useState } from 'react';
import { HERO_TEMPLATES, TRANSLATIONS } from '../constants';

interface HeroSelectionProps {
  onSelect: (id: string) => void;
  language: 'en' | 'de' | 'bg';
}

const HeroSelection: React.FC<HeroSelectionProps> = ({ onSelect, language }) => {
  const t = TRANSLATIONS[language];
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="fixed inset-0 z-[200] bg-slate-950 flex flex-col items-center justify-center p-6 sm:p-12 overflow-y-auto">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.2),transparent)]" />
      </div>

      <div className="relative z-10 w-full max-w-md text-center space-y-8 py-10">
        <div className="space-y-2">
          <h2 className="text-4xl fantasy-title text-indigo-400 tracking-widest">{t.chooseHero}</h2>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">{t.chooseHeroDesc}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {HERO_TEMPLATES.map(hero => (
            <button
              key={hero.id}
              onClick={() => setSelected(hero.id)}
              className={`relative p-6 rounded-[2rem] border-2 transition-all duration-500 group overflow-hidden ${
                selected === hero.id 
                ? 'bg-indigo-600/20 border-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.3)] scale-105' 
                : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className={`text-6xl mb-4 transition-transform duration-500 ${selected === hero.id ? 'scale-110 drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]' : 'grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100'}`}>
                {hero.stages[0].icon}
              </div>
              <h3 className={`text-[10px] font-black uppercase tracking-widest ${selected === hero.id ? 'text-indigo-300' : 'text-slate-500'}`}>
                {hero.stages[0].name[language]}
              </h3>
              {selected === hero.id && (
                <div className="absolute inset-0 bg-indigo-500/5 animate-pulse pointer-events-none" />
              )}
            </button>
          ))}
        </div>

        {selected && (
          <div className="animate-in fade-in slide-in-from-bottom duration-500 pt-4">
             <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-3xl mb-6">
                <p className="text-sm italic text-indigo-200">
                    "{(HERO_TEMPLATES.find(h => h.id === selected)?.desc as any)[language]}"
                </p>
             </div>
             <button 
                onClick={() => onSelect(selected)}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black uppercase tracking-[0.3em] py-5 rounded-2xl shadow-xl active:scale-95 transition-transform"
             >
                {t.embark}
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSelection;
