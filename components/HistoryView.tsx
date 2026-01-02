
import React, { useState, useMemo } from 'react';
import { UserState, LoopAction, HistoryEntry } from '../types';
import { getHistoryInsights, getTodayString } from '../utils/gameLogic';
import { TRANSLATIONS } from '../constants';

interface HistoryViewProps {
  state: UserState;
  onToggleHistory: (date: string, action: LoopAction) => void;
  onUpdateHistoryLog: (date: string, action: LoopAction, text: string) => void;
}

const HistoryView: React.FC<HistoryViewProps> = ({ state, onToggleHistory, onUpdateHistoryLog }) => {
  const lang = state.settings.language;
  const t = TRANSLATIONS[lang];
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Generate continuous calendar from Jan 1st of current year to Today
  const calendarDates = useMemo(() => {
    const start = new Date(new Date().getFullYear(), 0, 1);
    const today = new Date();
    const dates = [];
    let curr = new Date(today);
    while (curr >= start) {
      dates.push(curr.toISOString().split('T')[0]);
      curr.setDate(curr.getDate() - 1);
    }
    return dates;
  }, []);

  const selectedEntry = state.history.find(h => h.date === selectedDate) || {
    date: selectedDate || '',
    actions: { MOVE: false, LEARN: false, MAKE: false, SHARE: false, CARE: false },
    logs: { MOVE: '', LEARN: '', MAKE: '', SHARE: '', CARE: '' },
    xpEarned: 0
  };

  const insights = getHistoryInsights(state.history);
  const showNeglected = insights && insights.totalActions > 5 && insights.weakest !== insights.strongest;

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden relative">
      <div className="p-4 sm:p-6 space-y-6 overflow-y-auto pb-40">
        <div className="relative z-10 space-y-1 pt-4">
          <h2 className="text-2xl fantasy-title text-indigo-400">{t.tome}</h2>
          <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest opacity-70">
            {lang === 'bg' ? 'Хроники на' : lang === 'de' ? 'Chroniken von' : 'Chronicles of'} {new Date().getFullYear()}
          </p>
        </div>

        {/* Chronicle Insights */}
        {insights && (
          <section className="bg-slate-900/40 border border-slate-900 rounded-[2rem] p-6 shadow-2xl backdrop-blur-sm">
            <h3 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4">{t.eval}</h3>
            <div className={`grid ${showNeglected ? 'grid-cols-2' : 'grid-cols-1'} gap-4`}>
              <div className="space-y-1">
                <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest">{t.strongest}</p>
                <p className="text-sm font-bold text-slate-200 capitalize">✦ {insights.strongest.toLowerCase()}</p>
              </div>
              {showNeglected && (
                <div className="space-y-1">
                  <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest">{t.neglected}</p>
                  <p className="text-sm font-bold text-slate-200 capitalize">✦ {insights.weakest.toLowerCase()}</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Calendar Feed */}
        <div className="space-y-3">
          {calendarDates.map((date) => {
            const entry = state.history.find(h => h.date === date);
            const count = entry ? Object.values(entry.actions).filter(Boolean).length : 0;
            const isToday = date === getTodayString();
            
            const dateObj = new Date(date);
            const formattedDate = dateObj.toLocaleDateString(lang, { 
              month: 'short', day: 'numeric', weekday: 'short' 
            });

            return (
              <button 
                key={date} 
                onClick={() => {
                  setSelectedDate(date);
                  setIsEditing(false);
                }}
                className={`w-full border p-4 rounded-2xl flex items-center justify-between group active:scale-[0.98] transition-all ${
                    entry 
                    ? 'bg-slate-900/40 border-slate-900' 
                    : 'bg-slate-950/20 border-slate-900/50 opacity-60'
                } ${isToday ? 'border-indigo-500/30' : ''}`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${
                    count === 5 ? 'bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]' : 
                    count >= 1 ? 'bg-indigo-400' : 'bg-slate-800'
                  }`} />
                  <div className="text-left">
                    <p className={`text-[10px] font-black uppercase tracking-wider ${isToday ? 'text-indigo-400' : 'text-slate-400'}`}>
                        {formattedDate} {isToday ? (lang === 'bg' ? '• ДНЕС' : lang === 'de' ? '• HEUTE' : '• TODAY') : ''}
                    </p>
                    <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest">{count}/5 ALIGNED</p>
                  </div>
                </div>
                <span className="text-slate-800">❯</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Details & Edit Overlay */}
      {selectedDate && (
        <div className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-xl p-6 flex flex-col animate-in slide-in-from-bottom duration-300">
           <header className="flex justify-between items-center mb-6">
              <h2 className="text-xl fantasy-title text-indigo-400">{t.details}</h2>
              <button onClick={() => {
                setSelectedDate(null);
                setIsEditing(false);
              }} className="text-slate-500 text-2xl p-2">✕</button>
           </header>
           
           <div className="flex items-center justify-between mb-4 bg-slate-900/40 px-4 py-2 rounded-xl">
              <p className="text-[10px] font-black text-indigo-300 uppercase tracking-[0.2em]">{selectedDate}</p>
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className={`text-[9px] font-black uppercase px-4 py-1.5 rounded-full border transition-all ${
                  isEditing 
                  ? 'bg-amber-500 border-amber-400 text-slate-950 shadow-lg' 
                  : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}
              >
                {isEditing ? t.saveEntry : t.editEntry}
              </button>
           </div>

           <div className="flex-1 overflow-y-auto space-y-4 pr-1">
              {(['MOVE', 'LEARN', 'MAKE', 'SHARE', 'CARE'] as LoopAction[]).map(action => {
                const checked = selectedEntry.actions[action];
                const log = selectedEntry.logs[action];
                const icon = { MOVE: "🏃", LEARN: "📚", MAKE: "🔨", SHARE: "🤝", CARE: "✨" }[action];
                const actionTranslation = t.actions[action];
                
                return (
                  <div 
                    key={action} 
                    className={`p-4 rounded-2xl border transition-all ${
                      checked 
                      ? 'bg-indigo-500/10 border-indigo-500/30' 
                      : 'bg-slate-900/20 border-slate-900'
                    } ${!checked && !isEditing ? 'opacity-40' : 'opacity-100'}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <button 
                        disabled={!isEditing}
                        onClick={() => onToggleHistory(selectedDate, action)}
                        className={`flex items-center space-x-3 text-left ${isEditing ? 'cursor-pointer active:scale-95' : 'cursor-default'}`}
                      >
                        <span className={`text-xl transition-all ${checked ? '' : 'grayscale opacity-30 scale-90'}`}>{icon}</span>
                        <span className={`text-[10px] font-black uppercase tracking-widest ${checked ? 'text-indigo-300' : 'text-slate-500'}`}>
                          {actionTranslation.label}
                        </span>
                      </button>
                      {isEditing && (
                        <button 
                            onClick={() => onToggleHistory(selectedDate, action)}
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                checked ? 'bg-indigo-500 border-indigo-400 shadow-lg' : 'border-slate-800'
                            }`}
                        >
                          {checked && <div className="w-2 h-2 bg-white rounded-full animate-pulse" />}
                        </button>
                      )}
                    </div>
                    
                    {isEditing ? (
                        <textarea
                            placeholder={`${lang === 'bg' ? 'Опишете своя' : lang === 'de' ? 'Beschreibe deinen' : 'Describe your'} ${action.toLowerCase()} loop...`}
                            value={log}
                            onChange={(e) => onUpdateHistoryLog(selectedDate, action, e.target.value)}
                            className="w-full bg-slate-950/50 border border-slate-800/50 rounded-xl px-4 py-3 text-sm text-indigo-100 focus:outline-none focus:border-indigo-500/40 transition-colors resize-none h-20"
                        />
                    ) : (
                        <p className={`text-sm italic leading-relaxed ${checked ? 'text-slate-200' : 'text-slate-600'}`}>
                            {log || (checked ? (lang === 'bg' ? 'Манифестирано, но ненаписано.' : lang === 'de' ? 'Manifestiert, aber nicht aufgeschrieben.' : "Manifested but unwritten.") : "---")}
                        </p>
                    )}
                  </div>
                );
              })}
           </div>
           
           <div className="pt-6 border-t border-slate-900 mt-4 flex justify-between items-center text-slate-500">
              <span className="text-[9px] font-black uppercase tracking-widest">{selectedEntry.xpEarned} XP {lang === 'bg' ? 'СЪБРАНИ' : lang === 'de' ? 'GESAMMELT' : 'COLLECTED'}</span>
              <span className="text-[12px] animate-pulse">✨</span>
           </div>
        </div>
      )}
    </div>
  );
};

export default HistoryView;
