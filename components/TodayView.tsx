
import React, { useState } from 'react';
import { UserState, LoopAction } from '../types';
import { getDailyQuest, getXpForCurrentLevelProgress } from '../utils/gameLogic';
import ProgressBar from './ProgressBar';
import { BASE_XP, TRANSLATIONS } from '../constants';

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
  const lang = state.settings.language;
  const t = TRANSLATIONS[lang];
  const quest = getDailyQuest(state.today, lang);
  const { percentage, progress, needed } = getXpForCurrentLevelProgress(state.totalXp, state.level);
  const completedCount = Object.values(state.today).filter(Boolean).length;
  const [animations, setAnimations] = useState<XPAnimation[]>([]);

  const handleToggle = (action: LoopAction, e: React.MouseEvent) => {
    const isChecking = !state.today[action];
    if (isChecking) {
      const newAnim = { id: Date.now(), xp: BASE_XP[action], x: e.clientX, y: e.clientY };
      setAnimations(prev => [...prev, newAnim]);
      setTimeout(() => setAnimations(prev => prev.filter(a => a.id !== newAnim.id)), 1200);
    }
    onToggle(action);
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 animate-in fade-in duration-700 pb-48">
      {/* XP Floating Layer */}
      {animations.map(anim => (
        <div key={anim.id} className="xp-float" style={{ left: anim.x, top: anim.y }}>+{anim.xp} XP</div>
      ))}

      {/* Level Summary Card */}
      <section className="bg-gradient-to-br from-indigo-950/80 to-slate-900/80 rounded-[2.5rem] p-6 text-white shadow-2xl border border-indigo-500/10 relative overflow-hidden backdrop-blur-sm shrink-0">
        <div className="relative z-10 space-y-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-indigo-400 text-[9px] font-black uppercase tracking-[0.2em] mb-1">{t.level} {state.level}</p>
              <h2 className="text-2xl fantasy-title leading-none">{t.title}</h2>
            </div>
            <div className="bg-slate-950/50 px-3 py-2 rounded-2xl border border-white/5 text-center min-w-[60px]">
              <p className="text-orange-500 text-[8px] font-black uppercase tracking-widest mb-1">{t.streak}</p>
              <p className="text-xl font-bold text-orange-400">🔥 {state.streak}</p>
            </div>
          </div>
          <ProgressBar 
            percentage={percentage} 
            colorClass="bg-gradient-to-r from-indigo-500 to-purple-600 shadow-[0_0_15px_rgba(99,102,241,0.5)]"
            subLabel={`${Math.floor(progress)} / ${needed} XP`}
          />
        </div>
      </section>

      {/* Objective Message */}
      <section className="bg-slate-900/30 border border-slate-900 rounded-3xl p-4 text-center shrink-0">
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mb-2 opacity-50">{t.currentQuest}</p>
        <p className="text-sm italic text-indigo-200/80 leading-relaxed font-medium">"{quest}"</p>
      </section>

      {/* Action Buttons */}
      <div className="grid gap-4">
        {(['MOVE', 'LEARN', 'MAKE', 'SHARE', 'CARE'] as LoopAction[]).map(action => {
          const actionTranslation = t.actions[action];
          const icon = { MOVE: "🏃", LEARN: "📚", MAKE: "🔨", SHARE: "🤝", CARE: "✨" }[action];
          const color = { MOVE: "emerald", LEARN: "blue", MAKE: "amber", SHARE: "pink", CARE: "violet" }[action];

          return (
            <ActionItem 
              key={action}
              checked={state.today[action]} 
              log={state.todayLogs[action]}
              onToggle={(e: React.MouseEvent) => handleToggle(action, e)} 
              onLogChange={(v: string) => onUpdateLog(action, v)}
              label={actionTranslation.label} 
              subLabel={`${actionTranslation.sub} • +${BASE_XP[action]} XP`}
              icon={icon}
              color={color}
              placeholder={actionTranslation.placeholder}
            />
          );
        })}
      </div>

      {/* Footer Stats */}
      <div className="flex justify-between items-center px-6 py-4 bg-slate-900/20 rounded-[2rem] border border-slate-900 mb-8 shrink-0">
        <span className="text-slate-500 text-[9px] font-black uppercase tracking-widest">{t.alignment}</span>
        <div className="flex items-center space-x-3">
            <span className={`text-xl font-black ${completedCount === 5 ? 'text-amber-400 drop-shadow-sm' : 'text-indigo-400'}`}>
              {completedCount} <span className="text-slate-700 text-sm font-normal">/ 5</span>
            </span>
        </div>
      </div>
    </div>
  );
};

const ActionItem = ({ checked, log, onToggle, onLogChange, label, subLabel, icon, color, placeholder }: any) => {
  const colorMap: Record<string, string> = {
    emerald: checked ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-100' : 'bg-slate-900 border-slate-800 text-slate-500',
    blue: checked ? 'bg-blue-500/10 border-blue-500/40 text-blue-100' : 'bg-slate-900 border-slate-800 text-slate-500',
    amber: checked ? 'bg-amber-500/10 border-amber-500/40 text-amber-100' : 'bg-slate-900 border-slate-800 text-slate-500',
    pink: checked ? 'bg-pink-500/10 border-pink-500/40 text-pink-100' : 'bg-slate-900 border-slate-800 text-slate-500',
    violet: checked ? 'bg-violet-500/10 border-violet-500/40 text-violet-100' : 'bg-slate-900 border-slate-800 text-slate-500',
  };

  return (
    <div className="space-y-2 shrink-0">
      <button 
        onClick={onToggle}
        className={`w-full flex items-center p-4 border rounded-[1.5rem] transition-all active:scale-95 group relative overflow-hidden ${colorMap[color]}`}
      >
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mr-4 transition-all duration-300 ${checked ? 'bg-indigo-500/20 rotate-6' : 'bg-slate-950'}`}>
          <span className={checked ? 'filter-none' : 'grayscale opacity-30'}>{icon}</span>
        </div>
        <div className="text-left flex-1 min-w-0">
          <h3 className={`font-bold text-sm tracking-wide transition-colors ${checked ? 'text-white' : 'text-slate-400'}`}>{label}</h3>
          <p className="text-[9px] uppercase font-black tracking-widest mt-1 opacity-50">{subLabel}</p>
        </div>
        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${checked ? 'bg-indigo-500 border-indigo-400 scale-110 shadow-lg' : 'bg-slate-950 border-slate-800'}`}>
          {checked && <div className="w-2 h-2 rounded-full bg-white animate-pulse" />}
        </div>
      </button>
      {checked && (
        <div className="animate-in slide-in-from-top duration-300 px-1">
          <input 
            type="text" 
            placeholder={placeholder} 
            value={log}
            onChange={(e) => onLogChange(e.target.value)}
            className="w-full bg-slate-900/40 border border-slate-800 rounded-2xl px-5 py-3 text-xs text-indigo-100 focus:outline-none focus:border-indigo-500/40 transition-colors"
          />
        </div>
      )}
    </div>
  );
};

export default TodayView;
