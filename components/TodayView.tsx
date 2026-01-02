
import React, { useState } from 'react';
import { UserState, LoopAction } from '../types';
import { getDailyQuest, getXpForCurrentLevelProgress } from '../utils/gameLogic';
import ProgressBar from './ProgressBar';
import { BASE_XP } from '../constants';

interface TodayViewProps {
  state: UserState;
  onToggle: (action: LoopAction) => void;
  onUpdateLog: (action: LoopAction, text: string) => void;
}

interface XPAnimation {
  id: number;
  xp: number;
  x: number;
  y: number;
}

const TodayView: React.FC<TodayViewProps> = ({ state, onToggle, onUpdateLog }) => {
  const quest = getDailyQuest(state.today);
  const { percentage, progress, needed } = getXpForCurrentLevelProgress(state.totalXp, state.level);
  const completedCount = Object.values(state.today).filter(Boolean).length;
  const [animations, setAnimations] = useState<XPAnimation[]>([]);

  const handleToggle = (action: LoopAction, e: React.MouseEvent) => {
    const isChecking = !state.today[action];
    if (isChecking) {
      const newAnim = {
        id: Date.now(),
        xp: BASE_XP[action],
        x: e.clientX,
        y: e.clientY
      };
      setAnimations(prev => [...prev, newAnim]);
      setTimeout(() => {
        setAnimations(prev => prev.filter(a => a.id !== newAnim.id));
      }, 1200);
    }
    onToggle(action);
  };

  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-700 relative">
      {/* XP Floating Layer */}
      {animations.map(anim => (
        <div 
          key={anim.id} 
          className="xp-float"
          style={{ left: anim.x, top: anim.y }}
        >
          +{anim.xp} XP
        </div>
      ))}

      {/* Level Summary */}
      <section className="bg-gradient-to-br from-indigo-950 to-slate-900 rounded-3xl p-6 text-white shadow-2xl border border-indigo-500/20 relative overflow-hidden">
        <div className="absolute -top-4 -right-4 p-8 opacity-5 text-8xl rotate-12">⚔️</div>
        <div className="relative z-10 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em]">Level {state.level}</p>
              <h2 className="text-3xl fantasy-title mt-1">Adventurer</h2>
            </div>
            <div className="text-right">
              <p className="text-orange-500 text-[10px] font-black uppercase tracking-[0.2em]">Streak</p>
              <p className="text-2xl font-bold text-orange-400 flex items-center justify-end">
                <span className="mr-2">🔥</span> {state.streak}
              </p>
            </div>
          </div>
          <ProgressBar 
            percentage={percentage} 
            colorClass="bg-gradient-to-r from-indigo-500 to-purple-500"
            subLabel={`${Math.floor(progress)} / ${needed} XP`}
          />
        </div>
      </section>

      {/* Quest Section */}
      <section className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 shadow-inner text-indigo-200 text-sm text-center relative">
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-slate-950 px-3 text-[10px] font-bold uppercase tracking-widest text-slate-500 border border-slate-800 rounded-full">
          Current Objective
        </div>
        <p className="italic opacity-80 mt-1">"{quest}"</p>
      </section>

      {/* Action Buttons */}
      <div className="grid gap-6">
        {(['MOVE', 'LEARN', 'MAKE', 'SHARE', 'CARE'] as LoopAction[]).map(action => {
          const config = {
            MOVE: { label: "Physical Loop", sub: "Stamina", icon: "🛡️", color: "emerald", placeholder: "How did you move? (e.g. 5km Run)" },
            LEARN: { label: "Mental Loop", sub: "Intelligence", icon: "🔮", color: "blue", placeholder: "What did you study? (e.g. Python basics)" },
            MAKE: { label: "Creative Loop", sub: "Craft", icon: "⚙️", color: "amber", placeholder: "What did you manifest? (e.g. Fixed the table)" },
            SHARE: { label: "Social Loop", sub: "Charisma", icon: "🕯️", color: "pink", placeholder: "Who did you reach? (e.g. Called mom)" },
            CARE: { label: "Soul Loop", sub: "Mana", icon: "✨", color: "violet", placeholder: "How did you heal? (e.g. 15min Meditation)" },
          }[action];

          return (
            <ActionItem 
              key={action}
              action={action} 
              checked={state.today[action]} 
              log={state.todayLogs[action]}
              onToggle={(e: React.MouseEvent) => handleToggle(action, e)} 
              onLogChange={(v: string) => onUpdateLog(action, v)}
              label={config.label} 
              subLabel={`${config.sub} • +${BASE_XP[action]} XP`}
              icon={config.icon}
              color={config.color}
              placeholder={config.placeholder}
            />
          );
        })}
      </div>

      {/* Progress Footer */}
      <div className="flex justify-between items-center px-4 py-4 bg-slate-900/30 rounded-2xl border border-slate-800/50">
        <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Daily Alignment</span>
        <div className="flex items-center space-x-2">
            <span className={`text-xl font-black ${completedCount === 5 ? 'text-amber-400' : 'text-indigo-400'}`}>{completedCount}</span>
            <span className="text-slate-700">/</span>
            <span className="text-slate-500 text-sm">5</span>
        </div>
      </div>

      {/* Full Clear Drop */}
      {completedCount === 5 && (
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-5 rounded-3xl text-white text-center shadow-[0_0_20px_rgba(79,70,229,0.4)] animate-pulse border border-indigo-400/30">
          <p className="font-bold tracking-wider fantasy-title text-xl">Full Clear!</p>
          <p className="text-[10px] opacity-90 uppercase font-black mt-1">A rare relic has manifested in your vault</p>
        </div>
      )}
    </div>
  );
};

const ActionItem = ({ action, checked, log, onToggle, onLogChange, label, subLabel, icon, color, placeholder }: any) => {
  const colorMap: Record<string, string> = {
    emerald: checked ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-100 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-emerald-500/30',
    blue: checked ? 'bg-blue-950/80 border-blue-500/50 text-blue-100 shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-blue-500/30',
    amber: checked ? 'bg-amber-950/80 border-amber-500/50 text-amber-100 shadow-[0_0_15px_rgba(245,158,11,0.2)]' : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-amber-500/30',
    pink: checked ? 'bg-pink-950/80 border-pink-500/50 text-pink-100 shadow-[0_0_15px_rgba(236,72,153,0.2)]' : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-pink-500/30',
    violet: checked ? 'bg-violet-950/80 border-violet-500/50 text-violet-100 shadow-[0_0_15px_rgba(139,92,246,0.2)]' : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-violet-500/30',
  };

  return (
    <div className="space-y-2">
      <button 
        onClick={onToggle}
        className={`w-full flex items-center p-5 border-2 rounded-2xl transition-all active:scale-95 group relative overflow-hidden ${colorMap[color]}`}
      >
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-3xl mr-4 transition-all duration-500 ${checked ? 'bg-white/10 scale-110 rotate-3' : 'bg-slate-950'}`}>
          <span className={checked ? 'text-white' : 'text-slate-600'}>{icon}</span>
        </div>
        <div className="text-left flex-1 min-w-0">
          <h3 className={`font-bold tracking-wide truncate transition-colors ${checked ? 'text-white' : 'text-slate-300'}`}>{label}</h3>
          <p className={`text-[10px] uppercase font-black tracking-widest mt-1 opacity-60 ${checked ? 'text-white/80' : 'text-slate-500'}`}>{subLabel}</p>
        </div>
        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${checked ? 'bg-indigo-500 border-indigo-400 scale-110 shadow-lg' : 'bg-slate-950 border-slate-800'}`}>
          {checked && <div className="w-2 h-2 rounded-full bg-white animate-ping" />}
        </div>
      </button>
      
      {checked && (
        <div className="animate-in slide-in-from-top duration-300 px-2">
          <input 
            type="text" 
            placeholder={placeholder} 
            value={log}
            onChange={(e) => onLogChange(e.target.value)}
            className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-2 text-xs text-indigo-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 transition-colors"
          />
        </div>
      )}
    </div>
  );
};

export default TodayView;
