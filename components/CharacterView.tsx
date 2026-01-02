
import React from 'react';
import { UserState, Stats } from '../types';
import { getDerivedStats, getCharacterClass, getPowerTitle } from '../utils/gameLogic';
import { RELIC_DEFINITIONS, TRANSLATIONS, HERO_TEMPLATES, CLASS_ICONS, CLASS_TITLES } from '../constants';

interface CharacterViewProps {
  state: UserState;
  onExport: () => void;
  onImport: (json: string) => void;
}

const CharacterView: React.FC<CharacterViewProps> = ({ state, onExport, onImport }) => {
  const lang = state.settings.language;
  const t = TRANSLATIONS[lang];
  const stats = getDerivedStats(state);
  const classId = CLASS_TITLES.find(c => c.condition(stats))?.id || 'neophyte';
  const className = getCharacterClass(stats, lang);

  const hero = HERO_TEMPLATES.find(h => h.id === state.selectedHeroId) || HERO_TEMPLATES[0];
  const getEvolutionIndex = () => {
    if (state.level >= 30) return 3; // Ascendant / Mythic
    if (state.level >= 15) return 2; // Adult / Warrior
    if (state.level >= 5) return 1;  // Young / Juvenile
    return 0; // Baby / Egg
  };
  const evolutionIndex = getEvolutionIndex();
  const currentHeroName = hero.stages[evolutionIndex].name[lang];

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-8 animate-in slide-in-from-bottom duration-700 pb-40">
      <section className="text-center space-y-4 relative pt-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-indigo-500/5 rounded-full blur-[60px]" />
        <div className="relative group">
            <CharacterAvatar 
              classId={classId} 
              level={state.level} 
              heroId={state.selectedHeroId || 'wolf'} 
              language={lang}
            />
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 text-[10px] font-black px-4 py-2 rounded-full border-4 border-slate-950 shadow-xl uppercase tracking-widest whitespace-nowrap">
                LVL {state.level} • {currentHeroName}
            </div>
        </div>
        <div className="pt-4">
            <h2 className="text-2xl fantasy-title text-indigo-400 tracking-wider">
               {currentHeroName}
            </h2>
            <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mt-1">
               {className}
            </p>
            <p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.2em] mt-3 italic max-w-xs mx-auto opacity-70">
              {state.level < 10 ? 
                (lang === 'bg' ? "Приключението започва." : lang === 'de' ? "Das Abenteuer beginnt." : "The adventure begins.") : 
                (lang === 'bg' ? "Легенда, оформена от постояноство." : lang === 'de' ? "Eine Legende, geformt durch Beständigkeit." : "A legend shaped by consistency.")
              }
            </p>
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">{t.attributes}</h3>
        <div className="grid gap-3">
          <StatBar label={t.stats.stamina} value={stats.stamina} icon="🏃" color="emerald" />
          <StatBar label={t.stats.intelligence} value={stats.intelligence} icon="📚" color="blue" />
          <StatBar label={t.stats.craft} value={stats.craft} icon="🔨" color="amber" />
          <StatBar label={t.stats.charisma} value={stats.charisma} icon="🤝" color="pink" />
          <StatBar label={t.stats.mana} value={stats.mana} icon="✨" color="violet" />
        </div>
      </section>

      {/* Relic Treasury */}
      <section className="space-y-4">
        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">{t.valor}</h3>
        <div className="grid grid-cols-4 gap-3">
          {RELIC_DEFINITIONS.map(def => {
            const unlocked = state.relics.find(r => r.id === def.id);
            const relicName = (t.relics as any)[def.id] || "Unknown";
            return (
              <div 
                key={def.id} 
                className={`group relative aspect-square rounded-2xl flex flex-col items-center justify-center border transition-all ${
                  unlocked 
                  ? 'bg-slate-900 border-indigo-500/20 text-white shadow-[0_0_15px_rgba(79,70,229,0.1)]' 
                  : 'bg-slate-950/50 border-slate-900 opacity-20 grayscale'
                }`}
              >
                <span className="text-2xl mb-1">{def.icon}</span>
                <span className="text-[7px] font-black uppercase tracking-tighter text-slate-400 text-center px-1">
                  {relicName}
                </span>
                
                {unlocked && (
                   <div className="absolute inset-0 rounded-2xl bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[8px] font-bold text-indigo-300 text-center p-2 backdrop-blur-sm">
                      Manifested: {unlocked.unlockedAt}
                   </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="pt-6 border-t border-slate-900 grid grid-cols-2 gap-3 pb-10">
          <button onClick={onExport} className="bg-slate-900 text-slate-400 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-slate-800 active:scale-95 transition-all">{t.export}</button>
          <label className="bg-indigo-900/10 text-indigo-400 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-center cursor-pointer border border-indigo-500/20 active:scale-95 transition-all">
            {t.import}
            <input type="file" className="hidden" accept=".json" onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (ev) => onImport(ev.target?.result as string);
                reader.readAsText(file);
              }
            }} />
          </label>
      </section>
    </div>
  );
};

const StatBar = ({ label, value, icon, color }: any) => {
    const colors: Record<string, string> = { emerald: 'bg-emerald-500', blue: 'bg-blue-500', amber: 'bg-amber-500', pink: 'bg-pink-500', violet: 'bg-violet-500' };
    return (
        <div className="flex items-center space-x-3 bg-slate-900/40 p-3 rounded-2xl border border-slate-900">
            <div className="text-xl w-8 text-center shrink-0">{icon}</div>
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-end mb-1">
                    <span className="text-[8px] font-black uppercase text-slate-500 tracking-widest">{label}</span>
                    <span className="text-xs font-black text-white">{value}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-1000 ${colors[color]}`} style={{ width: `${Math.min(100, (value / 100) * 100)}%` }} />
                </div>
            </div>
        </div>
    );
};

const CharacterAvatar = ({ classId, level, heroId, language }: { classId: string, level: number, heroId: string, language: string }) => {
  const t = TRANSLATIONS[language as keyof typeof TRANSLATIONS];
  const hero = HERO_TEMPLATES.find(h => h.id === heroId) || HERO_TEMPLATES[0];
  const classIcon = CLASS_ICONS[classId] || '🌱';

  const getEvolutionIndex = () => {
    if (level >= 30) return 3; // Ascendant / Mythic
    if (level >= 15) return 2; // Adult / Warrior
    if (level >= 5) return 1;  // Young / Juvenile
    return 0; // Baby / Egg
  };

  const evolutionIndex = getEvolutionIndex();
  const heroIcon = hero.stages[evolutionIndex].icon;
  
  const getEvolutionStyling = () => {
    if (level >= 30) return 'border-white/40 bg-indigo-500/20 shadow-[0_0_50px_rgba(99,102,241,0.4)] ring-4 ring-indigo-500/10';
    if (level >= 15) return 'border-amber-400/40 bg-amber-500/10 shadow-[0_0_30px_rgba(251,191,36,0.3)]';
    if (level >= 5) return 'border-indigo-400/30 bg-indigo-500/10 shadow-[0_0_20px_rgba(99,102,241,0.2)]';
    return 'border-blue-400/20 bg-blue-500/5 shadow-none';
  };

  const evoStageKey = ['baby', 'young', 'warrior', 'ascendant'][evolutionIndex] as keyof typeof t.evolution;
  const evoStageName = t.evolution[evoStageKey];

  return (
    <div className="flex flex-col items-center">
      <div className={`w-40 h-40 rounded-full border-2 relative flex items-center justify-center bg-slate-900 transition-all duration-1000 ${getEvolutionStyling()}`}>
        {/* Floating Class Icon */}
        {classId !== 'neophyte' && (
          <div className="absolute -top-2 -right-2 w-12 h-12 bg-slate-950 border border-indigo-500/30 rounded-full flex items-center justify-center text-xl shadow-xl z-20 animate-bounce">
            {classIcon}
          </div>
        )}
        
        {/* Particle Effects for Higher Levels */}
        {level >= 15 && (
          <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px] animate-twinkle opacity-50" />
          </div>
        )}

        {/* Main Hero Icon */}
        <div className={`text-7xl relative z-10 transition-all duration-700 ${level >= 30 ? 'drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] scale-110' : 'drop-shadow-[0_0_10px_rgba(99,102,241,0.5)]'}`}>
          {heroIcon}
        </div>
      </div>
      
      <p className="mt-4 text-[10px] font-black text-indigo-400/60 uppercase tracking-[0.3em]">
        {evoStageName}
      </p>
    </div>
  );
};

export default CharacterView;
