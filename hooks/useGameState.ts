
import { useState, useEffect, useCallback } from 'react';
import { UserState, DailyActions, LoopAction, HistoryEntry, AppSettings, Relic } from '../types';
import { 
  getTodayString, 
  calculateLevel,
  getDerivedStats
} from '../utils/gameLogic';
import { 
  BASE_XP, 
  PERFECT_DAY_BONUS,
  RELIC_DEFINITIONS
} from '../constants';
import { playLevelUpSound } from '../utils/audio';

const STORAGE_KEY = 'daily_loop_rpg_state_v7';

const defaultSettings: AppSettings = {
  language: 'en',
  reminderTime: '20:00',
  notificationsEnabled: false,
};

const initialState: UserState = {
  totalXp: 0,
  level: 1,
  history: [],
  today: { MOVE: false, LEARN: false, MAKE: false, SHARE: false, CARE: false },
  todayLogs: { MOVE: '', LEARN: '', MAKE: '', SHARE: '', CARE: '' },
  streak: 0,
  lastCompletedDate: null,
  settings: defaultSettings,
  relics: [],
  selectedHeroId: null,
};

export const useGameState = () => {
  const [state, setState] = useState<UserState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return initialState;
    const parsed = JSON.parse(saved);
    if (!parsed.settings) parsed.settings = defaultSettings;
    if (!parsed.relics) parsed.relics = [];
    if (parsed.selectedHeroId === undefined) parsed.selectedHeroId = null;

    const today = getTodayString();
    if (parsed.lastCompletedDate !== today) {
      const existingTodayRecord = parsed.history.find((h: HistoryEntry) => h.date === today);
      return {
        ...parsed,
        today: existingTodayRecord ? existingTodayRecord.actions : initialState.today,
        todayLogs: existingTodayRecord ? existingTodayRecord.logs : initialState.todayLogs,
        lastCompletedDate: today,
      };
    }
    return parsed;
  });

  useEffect(() => {
    const stats = getDerivedStats(state);
    const newRelics: Relic[] = [...state.relics];
    let changed = false;

    RELIC_DEFINITIONS.forEach(def => {
      if (!newRelics.some(r => r.id === def.id) && def.requirement(stats, state.level)) {
        newRelics.push({
          id: def.id,
          name: def.name,
          icon: def.icon,
          unlockedAt: getTodayString()
        });
        changed = true;
      }
    });

    if (changed) {
      setState(prev => ({ ...prev, relics: newRelics }));
    }
  }, [state.history, state.today, state.level]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const updateLog = (action: LoopAction, text: string) => {
    setState(prev => {
      const newLogs = { ...prev.todayLogs, [action]: text };
      const today = getTodayString();
      const newHistory = prev.history.map(h => 
        h.date === today ? { ...h, logs: newLogs } : h
      );
      return { ...prev, todayLogs: newLogs, history: newHistory };
    });
  };

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setState(prev => ({
      ...prev,
      settings: { ...prev.settings, ...newSettings }
    }));
  };

  const selectHero = (heroId: string) => {
    setState(prev => ({ ...prev, selectedHeroId: heroId }));
  };

  const toggleAction = useCallback((action: LoopAction) => {
    setState(prev => {
      const isChecking = !prev.today[action];
      const newToday = { ...prev.today, [action]: isChecking };
      
      let xpDelta = isChecking ? BASE_XP[action] : -BASE_XP[action];
      const countBefore = Object.values(prev.today).filter(Boolean).length;
      const countAfter = Object.values(newToday).filter(Boolean).length;
      
      if (countAfter === 5 && countBefore === 4) xpDelta += PERFECT_DAY_BONUS;
      if (countAfter === 4 && countBefore === 5) xpDelta -= PERFECT_DAY_BONUS;

      const newTotalXp = Math.max(0, prev.totalXp + xpDelta);
      const newLevel = calculateLevel(newTotalXp);
      if (newLevel > prev.level) playLevelUpSound();

      const today = getTodayString();
      const historyWithoutToday = prev.history.filter(h => h.date !== today);
      const currentEntry = prev.history.find(h => h.date === today);
      const todayEntry: HistoryEntry = {
        date: today,
        actions: newToday,
        logs: prev.todayLogs,
        xpEarned: Math.max(0, (currentEntry?.xpEarned || 0) + xpDelta)
      };

      return {
        ...prev,
        today: newToday,
        totalXp: newTotalXp,
        level: newLevel,
        history: [...historyWithoutToday, todayEntry],
        lastCompletedDate: today,
      };
    });
  }, []);

  const toggleHistoryEntry = (date: string, action: LoopAction) => {
    setState(prev => {
      let newHistory = [...prev.history];
      let entryIdx = newHistory.findIndex(h => h.date === date);
      
      let entry: HistoryEntry;
      if (entryIdx === -1) {
        entry = {
          date,
          actions: { MOVE: false, LEARN: false, MAKE: false, SHARE: false, CARE: false },
          logs: { MOVE: '', LEARN: '', MAKE: '', SHARE: '', CARE: '' },
          xpEarned: 0
        };
        newHistory.push(entry);
        entryIdx = newHistory.length - 1;
      } else {
        entry = { ...newHistory[entryIdx] };
      }

      const isChecking = !entry.actions[action];
      const countBefore = Object.values(entry.actions).filter(Boolean).length;
      entry.actions = { ...entry.actions, [action]: isChecking };
      const countAfter = Object.values(entry.actions).filter(Boolean).length;
      
      let xpDelta = isChecking ? BASE_XP[action] : -BASE_XP[action];
      if (countAfter === 5 && countBefore === 4) xpDelta += PERFECT_DAY_BONUS;
      if (countAfter === 4 && countBefore === 5) xpDelta -= PERFECT_DAY_BONUS;

      entry.xpEarned = Math.max(0, entry.xpEarned + xpDelta);
      newHistory[entryIdx] = entry;

      const newTotalXp = Math.max(0, prev.totalXp + xpDelta);
      const newLevel = calculateLevel(newTotalXp);

      if (date === getTodayString()) {
        return { ...prev, history: newHistory, totalXp: newTotalXp, level: newLevel, today: entry.actions };
      }
      return { ...prev, history: newHistory, totalXp: newTotalXp, level: newLevel };
    });
  };

  const updateHistoryLog = (date: string, action: LoopAction, text: string) => {
    setState(prev => {
      let newHistory = [...prev.history];
      let entryIdx = newHistory.findIndex(h => h.date === date);
      
      if (entryIdx === -1) {
        const entry = {
          date,
          actions: { MOVE: false, LEARN: false, MAKE: false, SHARE: false, CARE: false },
          logs: { MOVE: '', LEARN: '', MAKE: '', SHARE: '', CARE: '' },
          xpEarned: 0
        };
        entry.logs[action] = text;
        newHistory.push(entry);
      } else {
        const entry = { ...newHistory[entryIdx] };
        entry.logs = { ...entry.logs, [action]: text };
        newHistory[entryIdx] = entry;
      }

      if (date === getTodayString()) {
        const updatedEntry = newHistory.find(h => h.date === date);
        return { ...prev, history: newHistory, todayLogs: updatedEntry?.logs || prev.todayLogs };
      }
      return { ...prev, history: newHistory };
    });
  };

  const exportData = () => {
    const dataStr = JSON.stringify(state);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', `soul_${getTodayString()}.json`);
    linkElement.click();
  };

  const importData = (json: string) => {
    try {
      const parsed = JSON.parse(json);
      if (parsed && typeof parsed.totalXp === 'number') setState(parsed);
    } catch (e) { console.error(e); }
  };

  return { state, toggleAction, updateLog, exportData, importData, updateSettings, toggleHistoryEntry, updateHistoryLog, selectHero };
};
