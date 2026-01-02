
import React from 'react';
import { UserState, Stats } from '../types';
import { getDerivedStats, getCharacterClass, getPowerTitle } from '../utils/gameLogic';
import { MEDALS, CLASS_TITLES } from '../constants';
import ProgressBar from './ProgressBar';

interface CharacterViewProps {
  state: UserState;
  onAllocate: (stat: keyof Stats) => void;
  onExport: () => void;
  onImport: (json: string) => void;
}

const CharacterView: React.FC<CharacterViewProps> = ({ state, onAllocate, onExport, onImport }) => {
  const stats = getDerivedStats(state);
  const className = getCharacterClass(stats);
  const powerTitle = getPowerTitle(state.level);

  // Simple logic to "unlock" medals for display
  const isMedalUnlocked = (id: string) => {
    switch(id) {
      case 'm1': return state.totalXp > 0;
      case 'm2': return state.history.some(h => Object.values(h.actions).filter(v => v).length === 5);
      case 'm3': return state.streak >= 7;
      case 'm4': return stats.stamina >= 10;
      case 'm5': return stats.intelligence >= 10;
      case 'm6': return stats.craft >= 10;
      case 'm7': return stats.charisma >= 10;
      case 'm8': return stats.mana >= 10;
      case 'm9': return className !== 'Neophyte';
      case 'm10': return state.level >= 20;
      default: return false;
    }
  };

  return (
    <div className="p-6 space-y-10 animate-in slide-in-from-bottom duration-700">
      {/* Epic Hero Profile */}
      <section className="text-center space-y-4 relative pt-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-56 h-56 bg-indigo-500/10 rounded-full blur-[80px]" />
        
        <div className="relative group">
            <CharacterAvatar className={className} level={state.level} />
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-br from-amber-400 to-orange-600 text-slate-950 text-[10px] font-black px-4 py-1.5 rounded-full border-2 border-slate-900 shadow-[0_4px_10px_rgba(245,158,11,0.4)] uppercase tracking-widest">
                LVL {state.level} • {powerTitle}
            </div>
        </div>

        <div className="pt-2">
            <h2 className="text-3xl fantasy-title text-indigo-400 tracking-wider flex items-center justify-center space-x-3">
              <span>{className}</span>
              {state.level < 5 && <span className="text-xs text-slate-600 font-normal lowercase italic">(Mostly Harmless)</span>}
            </h2>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mt-1 italic max-w-xs mx-auto">
              {state.level === 1 ? "Startled by its own shadow. Needs constant supervision." : 
               state.level < 5 ? "Vulnerable to slight breezes and moderately loud noises." : 
               state.level < 10 ? "Slowly evolving from a sentient potato into something... vertical." : 
               "Manifesting cosmic significance through sheer, stubborn daily effort."}
            </p>
        </div>
      </section>

      {/* Class Path Visualization */}
      <section className="bg-slate-900/40 border border-slate-800 rounded-3xl p-5 space-y-4">
        <h3 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] text-center">Heroic Ascension</h3>
        <div className="flex justify-between items-center px-4 relative">
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-slate-800 -translate-y-1/2" />
          {CLASS_TITLES.slice(0, 4).map((c, i) => {
            const isActive = className === c.name;
            return (
              <div key={i} className={`w-3 h-3 rounded-full border-2 relative z-10 transition-all duration-500 ${isActive ? 'bg-indigo-400 border-white scale-150 shadow-[0_0_10px_white]' : 'bg-slate-950 border-slate-700'}`}>
                {isActive && <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] font-bold text-white uppercase tracking-tighter">Current Path</div>}
              </div>
            );
          })}
          <div className="w-4 h-4 rounded-full border-2 border-slate-800 bg-slate-950 flex items-center justify-center relative z-10">
            <span className="text-[8px] text-slate-600">?</span>
          </div>
        </div>
        <p className="text-[9px] text-slate-600 text-center italic pt-4">Seek Balance to Unlock Arcane Destinies.</p>
      </section>

      {/* Attributes */}
      <section className="space-y-4">
        <div className="flex justify-between items-center px-1">
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest">Astral Attributes</h3>
            {state.freePoints > 0 && (
                <span className="text-[10px] font-black text-amber-500 animate-pulse bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/30">
                    {state.freePoints} Points Unspent
                </span>
            )}
        </div>
        <div className="grid gap-4">
          <StatBar label="Stamina (MOVE)" value={stats.stamina} icon="🏃" color="emerald" canAdd={state.freePoints > 0} onAdd={() => onAllocate('stamina')} />
          <StatBar label="Intelligence (LEARN)" value={stats.intelligence} icon="📚" color="blue" canAdd={state.freePoints > 0} onAdd={() => onAllocate('intelligence')} />
          <StatBar label="Craft (MAKE)" value={stats.craft} icon="🔨" color="amber" canAdd={state.freePoints > 0} onAdd={() => onAllocate('craft')} />
          <StatBar label="Charisma (SHARE)" value={stats.charisma} icon="🤝" color="pink" canAdd={state.freePoints > 0} onAdd={() => onAllocate('charisma')} />
          <StatBar label="Mana (CARE)" value={stats.mana} icon="✨" color="violet" canAdd={state.freePoints > 0} onAdd={() => onAllocate('mana')} />
        </div>
      </section>

      {/* Relic Vault */}
      <section className="space-y-4">
        <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest px-1">Found Relics</h3>
        {state.unlockedLoot.length === 0 ? (
            <div className="p-8 text-center bg-slate-900/20 border-2 border-dashed border-slate-800 rounded-3xl">
                <p className="text-slate-700 text-[10px] font-bold uppercase tracking-widest">Your hoard is empty. Close the loop to find treasure.</p>
            </div>
        ) : (
            <div className="grid grid-cols-2 gap-4">
            {state.unlockedLoot.map(loot => (
                <div key={loot.id} className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl relative group hover:border-indigo-500/50 transition-colors shadow-lg">
                    <div className={`absolute top-2 right-2 w-1.5 h-1.5 rounded-full ${
                        loot.rarity === 'Legendary' ? 'bg-amber-400 animate-ping' : 
                        loot.rarity === 'Rare' ? 'bg-purple-400' : 'bg-slate-500'
                    }`} />
                    <p className={`text-[8px] font-black uppercase tracking-tighter mb-1 ${
                         loot.rarity === 'Legendary' ? 'text-amber-400' : 
                         loot.rarity === 'Rare' ? 'text-purple-400' : 'text-slate-500'
                    }`}>{loot.rarity}</p>
                    <h4 className="text-xs font-bold text-slate-200">{loot.name}</h4>
                    <p className="text-[9px] text-slate-500 mt-1 italic leading-tight">{loot.description}</p>
                </div>
            ))}
            </div>
        )}
      </section>

      {/* Hall of Valor - Medals */}
      <section className="space-y-4">
        <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest px-1">Hall of Valor</h3>
        <div className="grid grid-cols-5 gap-3">
          {MEDALS.map(medal => {
            const unlocked = isMedalUnlocked(medal.id);
            return (
              <div 
                key={medal.id} 
                className={`aspect-square rounded-xl flex items-center justify-center border-2 transition-all group relative ${unlocked ? 'bg-slate-900 border-indigo-500/30 text-2xl shadow-lg' : 'bg-slate-950/50 border-slate-800 opacity-20 grayscale'}`}
              >
                {medal.icon}
                {/* Tooltip on hover */}
                {unlocked && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-32 bg-slate-900 border border-slate-700 p-2 rounded-lg text-center opacity-0 group-hover:opacity-100 transition-opacity z-30 pointer-events-none">
                    <p className="text-[9px] font-black uppercase text-indigo-400">{medal.title}</p>
                    <p className="text-[8px] text-slate-400 italic leading-tight">{medal.description}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Data Management */}
      <section className="pt-8 border-t border-slate-800 pb-12">
        <div className="flex gap-4">
          <button onClick={onExport} className="flex-1 bg-slate-900 text-slate-400 py-3 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-slate-800 border border-slate-800 transition-all">Export Soul</button>
          <label className="flex-1 bg-indigo-900/20 text-indigo-400 py-3 rounded-2xl text-[9px] font-black uppercase tracking-widest text-center cursor-pointer hover:bg-indigo-900/40 border border-indigo-500/30 transition-all">
            Import Tome
            <input type="file" className="hidden" accept=".json" onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (ev) => onImport(ev.target?.result as string);
                reader.readAsText(file);
              }
            }} />
          </label>
        </div>
      </section>
    </div>
  );
};

const CharacterAvatar = ({ className, level }: { className: string, level: number }) => {
  const getAvatarContent = () => {
    const isWeak = level < 10;
    switch (className) {
      case 'Arcane Analyst': return { base: isWeak ? '🧙' : '🧙‍♂️', tool: '✨', aura: 'border-blue-500/30 bg-blue-500/5' };
      case 'Creative Bard': return { base: isWeak ? '🎨' : '🧝‍♀️', tool: '🎶', aura: 'border-pink-500/30 bg-pink-500/5' };
      case 'Divine Sentinel': return { base: isWeak ? '🛡️' : '⚔️', tool: '🌟', aura: 'border-emerald-500/30 bg-emerald-500/5' };
      case 'Master Crafter': return { base: isWeak ? '🔨' : '⚒️', tool: '💎', aura: 'border-amber-500/30 bg-amber-500/5' };
      case 'Lorekeeper': return { base: isWeak ? '📚' : '📜', tool: '✒️', aura: 'border-slate-500/30 bg-slate-500/5' };
      case 'Iron Titan': return { base: isWeak ? '🏋️' : '🧔', tool: '🧱', aura: 'border-slate-600/30 bg-slate-600/5' };
      case 'Social Architect': return { base: isWeak ? '🗣️' : '🏰', tool: '🚩', aura: 'border-red-500/30 bg-red-500/5' };
      case 'Spirit Guide': return { base: isWeak ? '🌱' : '🧚', tool: '🏮', aura: 'border-violet-500/30 bg-violet-500/5' };
      default: return { base: isWeak ? '👶' : '🚶', tool: isWeak ? '🍼' : '🎒', aura: 'border-indigo-500/30 bg-indigo-500/5' };
    }
  };

  const { base, tool, aura } = getAvatarContent();

  return (
    <div className={`w-48 h-48 mx-auto rounded-full border-4 relative flex items-center justify-center bg-slate-900 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] overflow-visible transition-all duration-1000 ${aura}`}>
      
      {/* Magic Particle Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full">
         <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/10 to-transparent animate-pulse" />
      </div>
      
      {/* Dynamic Star Field Backing */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="absolute w-1 h-1 bg-white rounded-full animate-twinkle" 
               style={{ top: `${Math.random()*100}%`, left: `${Math.random()*100}%`, animationDelay: `${Math.random()*2}s` }} />
        ))}
      </div>

      <div className="text-8xl relative z-10 transition-transform duration-700 hover:scale-110 select-none filter drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]">
        {base}
      </div>
      
      {/* Floating Artifact - Positioned contextually */}
      <div className="absolute -top-4 -right-2 text-4xl animate-bounce drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]" style={{ animationDuration: '4s' }}>
        {tool}
      </div>

      {/* High-level orbit */}
      {level > 15 && (
        <div className="absolute inset-[-15px] border border-dashed border-indigo-500/20 rounded-full animate-spin" style={{ animationDuration: '30s' }}>
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-indigo-400 rounded-full shadow-[0_0_10px_rgba(129,140,248,1)]" />
        </div>
      )}
    </div>
  );
};

const StatBar = ({ label, value, icon, color, canAdd, onAdd }: any) => {
    const colorClasses: Record<string, string> = {
        emerald: 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]',
        blue: 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]',
        amber: 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]',
        pink: 'bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.5)]',
        violet: 'bg-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.5)]',
    };

    return (
        <div className="flex items-center space-x-4 bg-slate-900/50 p-4 rounded-2xl border border-slate-800 group hover:border-indigo-500/30 transition-all shadow-sm">
            <div className="text-2xl w-10 text-center grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500 shrink-0">{icon}</div>
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-end mb-2 px-1">
                    <span className="text-[9px] font-black uppercase text-slate-500 tracking-widest truncate">{label}</span>
                    <span className="text-sm font-black text-white ml-2">{value}</span>
                </div>
                <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden p-[2px] border border-slate-800">
                    <div className={`h-full rounded-full transition-all duration-1000 ${colorClasses[color]}`} style={{ width: `${Math.min(100, (value / 50) * 100)}%` }} />
                </div>
            </div>
            {canAdd && (
                <button onClick={onAdd} className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-black border border-indigo-400 flex items-center justify-center hover:bg-indigo-500 active:scale-90 transition-all shadow-lg shrink-0">+</button>
            )}
        </div>
    );
};

export default CharacterView;
