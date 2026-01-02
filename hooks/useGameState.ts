
import { useState, useEffect, useCallback } from 'react';
import { UserState, DailyActions, LoopAction, HistoryEntry, LootCard, Stats } from '../types';
import { 
  getTodayString, 
  getYesterdayString, 
  calculateLevel
} from '../utils/gameLogic';
import { 
  BASE_XP, 
  PERFECT_DAY_BONUS, 
  LOOT_POOL 
} from '../constants';
import { playLevelUpSound } from '../utils/audio';

const STORAGE_KEY = 'daily_loop_rpg_state_v2';

const initialState: UserState = {
  totalXp: 0,
  level: 1,
  history: [],
  today: {
    MOVE: false, LEARN: false, MAKE: false, SHARE: false, CARE: false,
  },
  todayLogs: {
    MOVE: '', LEARN: '', MAKE: '', SHARE: '', CARE: '',
  },
  allocatedPoints: {
    stamina: 0, intelligence: 0, craft: 0, charisma: 0, mana: 0,
  },
  freePoints: 0,
  streak: 0,
  lastCompletedDate: null,
  unlockedLoot: [],
};

export const useGameState = () => {
  const [state, setState] = useState<UserState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return initialState;
    const parsed = JSON.parse(saved);
    
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

  const toggleAction = useCallback((action: LoopAction) => {
    setState(prev => {
      const isChecking = !prev.today[action];
      const newToday = { ...prev.today, [action]: isChecking };
      
      let xpDelta = isChecking ? BASE_XP[action] : -BASE_XP[action];
      
      const countBefore = Object.values(prev.today).filter(Boolean).length;
      const countAfter = Object.values(newToday).filter(Boolean).length;
      
      if (countAfter === 5 && countBefore === 4) xpDelta += PERFECT_DAY_BONUS;
      if (countAfter === 4 && countBefore === 5) xpDelta -= PERFECT_DAY_BONUS;

      let newLoot = [...prev.unlockedLoot];
      if (isChecking && countAfter === 5 && countBefore === 4) {
        const roll = Math.random();
        let pool = LOOT_POOL;
        if (roll < 0.1) pool = LOOT_POOL.filter(l => l.rarity === 'Legendary');
        else if (roll < 0.3) pool = LOOT_POOL.filter(l => l.rarity === 'Rare');
        else if (roll < 0.6) pool = LOOT_POOL.filter(l => l.rarity === 'Uncommon');
        else pool = LOOT_POOL.filter(l => l.rarity === 'Common');
        
        const randomLoot = pool[Math.floor(Math.random() * pool.length)];
        if (randomLoot && !newLoot.find(l => l.id === randomLoot.id)) {
           newLoot.push(randomLoot);
        }
      }

      const newTotalXp = Math.max(0, prev.totalXp + xpDelta);
      const newLevel = calculateLevel(newTotalXp);
      const levelDiff = newLevel - prev.level;
      
      if (levelDiff > 0) {
        playLevelUpSound();
      }

      const newFreePoints = prev.freePoints + (levelDiff > 0 ? levelDiff * 2 : 0);

      let newStreak = prev.streak;
      const yesterday = getYesterdayString();
      const wasActiveYesterday = prev.history.some(h => 
        h.date === yesterday && Object.values(h.actions).filter(v => v).length >= 3
      );

      if (countAfter >= 3 && countBefore < 3) {
        newStreak = wasActiveYesterday ? prev.streak + 1 : 1;
      }

      const today = getTodayString();
      const historyWithoutToday = prev.history.filter(h => h.date !== today);
      const todayEntry: HistoryEntry = {
        date: today,
        actions: newToday,
        logs: prev.todayLogs,
        xpEarned: xpDelta
      };

      return {
        ...prev,
        today: newToday,
        totalXp: newTotalXp,
        level: newLevel,
        freePoints: newFreePoints,
        history: [...historyWithoutToday, todayEntry],
        streak: newStreak,
        unlockedLoot: newLoot,
        lastCompletedDate: today,
      };
    });
  }, []);

  const allocatePoint = (stat: keyof Stats) => {
    setState(prev => {
      if (prev.freePoints <= 0) return prev;
      return {
        ...prev,
        freePoints: prev.freePoints - 1,
        allocatedPoints: { ...prev.allocatedPoints, [stat]: prev.allocatedPoints[stat] + 1 }
      };
    });
  };

  const exportData = () => {
    const dataStr = JSON.stringify(state);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `daily_loop_soul_${getTodayString()}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importData = (json: string) => {
    try {
      const parsed = JSON.parse(json);
      if (parsed && typeof parsed.totalXp === 'number') {
        setState(parsed);
      }
    } catch (e) {
      console.error("Failed to import soul data", e);
    }
  };

  return { state, toggleAction, updateLog, allocatePoint, exportData, importData };
};
