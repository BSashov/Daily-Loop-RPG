
import React from 'react';
import { UserState, Stats } from '../types';
import { getDerivedStats, getCharacterClass, getPowerTitle } from '../utils/gameLogic';
import { RELIC_DEFINITIONS, TRANSLATIONS, HERO_TEMPLATES } from '../constants';

interface CharacterViewProps {
  state: UserState;
  onExport: () => void;
  onImport: (json: string) => void;
}

const CharacterView: React.FC<CharacterViewProps> = ({ state, onExport, onImport }) => {
  const lang = state.settings.language;
  const t = TRANSLATIONS[lang];
  const stats = getDerivedStats(state);
  const className = getCharacterClass(stats, lang);
  const powerTitle = getPowerTitle(state.level, lang);

  const heroIcon = HERO_TEMPLATES.find(h => h.id === state.selectedHeroId)?.icon || '🐺';

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-8 animate-in slide-in-from-bottom duration-700 pb-40">
      <section className="text-center space-y-4 relative pt-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-indigo-500/5 rounded-full blur-[60px]" />
        <div className="relative group">
            <CharacterAvatar className={className} level={state.level} icon={heroIcon} />
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 text-[10px] font-black px-4 py-2 rounded-full border-4 border-slate-950 shadow-xl uppercase tracking-widest whitespace-nowrap">
                LVL {state.level} • {powerTitle}
            </div>
        </div>
        <div className="pt-4">
            <h2 className="text-2xl fantasy-title text-indigo-400 tracking-wider">{className}</h2>
            <p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.2em] mt-2 italic max-w-xs mx-auto opacity-70">
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

const CharacterAvatar = ({ className, level, icon }: { className: string, level: number, icon: string }) => {
  const getEvolution = () => {
    if (level >= 40) return { aura: 'border-white/40 bg-indigo-500/20 shadow-[0_0_50px_rgba(99,102,241,0.4)]' };
    if (level >= 20) return { aura: 'border-amber-400/40 bg-amber-500/10 shadow-[0_0_30px_rgba(251,191,36,0.3)]' };
    if (level >= 10) return { aura: 'border-indigo-400/30 bg-indigo-500/10 shadow-[0_0_20px_rgba(99,102,241,0.2)]' };
    return { aura: 'border-blue-400/20 bg-blue-500/5 shadow-none' };
  };
  const { aura } = getEvolution();
  return (
    <div className={`w-40 h-40 mx-auto rounded-full border-2 relative flex items-center justify-center bg-slate-900 transition-all duration-1000 ${aura}`}>
      <div className="text-7xl relative z-10 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]">{icon}</div>
    </div>
  );
};

export default CharacterView;
