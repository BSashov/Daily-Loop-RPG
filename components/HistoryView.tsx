
import React from 'react';
import { UserState, LoopAction } from '../types';
import { getHistoryInsights } from '../utils/gameLogic';

interface HistoryViewProps {
  state: UserState;
}

const HistoryView: React.FC<HistoryViewProps> = ({ state }) => {
  const sortedHistory = [...state.history]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 30);

  const insights = getHistoryInsights(state.history);

  return (
    <div className="p-6 space-y-10 animate-in slide-in-from-right duration-700 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
         <div className="absolute top-10 left-10 w-64 h-64 bg-indigo-500/10 blur-[100px]" />
         <div className="absolute bottom-10 right-10 w-64 h-64 bg-purple-500/10 blur-[100px]" />
      </div>

      <div className="relative z-10 space-y-1">
        <h2 className="text-3xl fantasy-title text-indigo-400">Chronicle Star Map</h2>
        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest italic">Charting your alignment with the cosmos.</p>
      </div>

      {/* Chronicle Insights */}
      {insights && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-5xl">🔭</div>
          <h3 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-4">Astral Evaluations</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest">Ascendant Stat</p>
              <p className="text-sm font-bold text-slate-200 flex items-center">
                <span className="text-amber-400 mr-2">✦</span> {insights.strongest}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest">Neglected Star</p>
              <p className="text-sm font-bold text-slate-200 flex items-center">
                <span className="text-red-400 mr-2">✦</span> {insights.weakest}
              </p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-800/50">
            <p className="text-[10px] text-slate-400 italic">"You are strongest when you {insights.strongest === 'MOVE' ? 'dance with the physical' : 'seek knowledge'}. Do not fear the {insights.weakest} loop."</p>
          </div>
        </section>
      )}

      {/* Star Map History */}
      <div className="space-y-8 relative">
        {sortedHistory.length === 0 ? (
          <div className="text-center py-24 bg-slate-900/30 rounded-3xl border-2 border-dashed border-slate-800">
             <div className="text-5xl mb-6 grayscale opacity-20 animate-pulse">🌌</div>
             <p className="text-slate-600 text-[10px] font-black uppercase tracking-widest">Your sky is dark.<br/>Ignite the first star today.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedHistory.map((entry, idx) => {
              const count = Object.values(entry.actions).filter(Boolean).length;
              const dateObj = new Date(entry.date);
              const formattedDate = dateObj.toLocaleDateString(undefined, { 
                month: 'short', day: 'numeric', weekday: 'short' 
              });

              return (
                <div key={entry.date} className="relative group">
                  {/* Connection Line to next star */}
                  {idx < sortedHistory.length - 1 && (
                    <div className="absolute left-6 top-10 bottom-0 w-[2px] bg-gradient-to-b from-indigo-500/40 to-transparent z-0" />
                  )}

                  <div className="bg-slate-900/40 border border-slate-800 p-5 rounded-2xl shadow-xl flex items-center justify-between group hover:border-indigo-500/50 transition-all relative z-10 backdrop-blur-sm">
                    <div className="flex items-center space-x-5">
                      {/* Star Visual */}
                      <div className={`w-3 h-3 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.2)] transition-all duration-1000 ${
                        count === 5 ? 'bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.6)] scale-125' : 
                        count >= 3 ? 'bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.4)]' : 
                        'bg-slate-700'
                      }`} />
                      
                      <div className="space-y-2">
                        <p className="text-[10px] font-black uppercase text-indigo-400 tracking-[0.2em]">{formattedDate}</p>
                        <div className="flex gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                          <MiniStar active={entry.actions.MOVE} />
                          <MiniStar active={entry.actions.LEARN} />
                          <MiniStar active={entry.actions.MAKE} />
                          <MiniStar active={entry.actions.SHARE} />
                          <MiniStar active={entry.actions.CARE} />
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-base font-black text-slate-100 group-hover:text-indigo-300 transition-colors">+{entry.xpEarned} XP</p>
                      <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest mt-1">{count}/5 ALIGNED</p>
                    </div>
                  </div>

                  {/* Activity Details Popup on hover */}
                  <div className="hidden group-hover:block absolute left-0 right-0 top-full mt-2 p-4 bg-slate-950 border border-slate-800 rounded-xl z-20 shadow-2xl animate-in fade-in duration-300">
                    <div className="space-y-2">
                      {(Object.keys(entry.actions) as LoopAction[]).map(action => (
                        entry.actions[action] && (
                          <div key={action} className="flex space-x-2 items-start">
                             <span className="text-[9px] font-bold text-indigo-500 uppercase shrink-0">[{action}]</span>
                             <p className="text-[10px] text-slate-400 italic leading-tight">{entry.logs[action] || "Manifestation complete."}</p>
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="pb-10" />
    </div>
  );
};

const MiniStar = ({ active }: { active: boolean }) => (
  <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${active ? 'bg-indigo-400 shadow-[0_0_5px_rgba(129,140,248,0.8)]' : 'bg-slate-800'}`} />
);

export default HistoryView;
