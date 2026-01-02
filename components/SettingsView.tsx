
import React from 'react';
import { AppSettings } from '../types';
import { TRANSLATIONS } from '../constants';

interface SettingsViewProps {
  settings: AppSettings;
  onUpdate: (settings: Partial<AppSettings>) => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ settings, onUpdate }) => {
  const t = TRANSLATIONS[settings.language];

  const handleNotificationRequest = async () => {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      onUpdate({ notificationsEnabled: true });
    }
  };

  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-500 pb-32">
      <h2 className="text-2xl fantasy-title text-indigo-400">{t.settings}</h2>

      {/* Language Section */}
      <section className="bg-slate-900/40 border border-slate-900 rounded-3xl p-5 space-y-4">
        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{t.lang}</h3>
        <div className="flex gap-2">
          {(['en', 'de', 'bg'] as const).map(lang => (
            <button
              key={lang}
              onClick={() => onUpdate({ language: lang })}
              className={`flex-1 py-3 rounded-2xl text-xs font-bold transition-all border ${
                settings.language === lang 
                ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg' 
                : 'bg-slate-950 border-slate-800 text-slate-500'
              }`}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
      </section>

      {/* Reminders Section */}
      <section className="bg-slate-900/40 border border-slate-900 rounded-3xl p-5 space-y-4">
        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{t.reminder}</h3>
        <input
          type="time"
          value={settings.reminderTime}
          onChange={(e) => onUpdate({ reminderTime: e.target.value })}
          className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white focus:outline-none focus:border-indigo-500"
        />
        
        <button
          onClick={handleNotificationRequest}
          className={`w-full py-4 rounded-2xl font-bold text-sm transition-all flex items-center justify-center space-x-3 ${
            settings.notificationsEnabled 
            ? 'bg-emerald-900/20 text-emerald-400 border border-emerald-500/30' 
            : 'bg-indigo-600 text-white shadow-lg'
          }`}
        >
          <span>{settings.notificationsEnabled ? '🔔' : '🔕'}</span>
          <span>{settings.notificationsEnabled ? t.activeNotif : t.enableNotif}</span>
        </button>
        <p className="text-[10px] text-slate-600 italic text-center">
          {settings.language === 'en' ? 'Reminders help you close the loop before the day ends.' : 
           settings.language === 'de' ? 'Erinnerungen helfen dir, den Loop vor Tagesende zu schließen.' :
           'Напомнянията ви помагат да затворите цикъла преди края на деня.'}
        </p>
      </section>
    </div>
  );
};

export default SettingsView;
