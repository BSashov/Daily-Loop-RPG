
import { UserState, Stats, LoopAction, DailyActions, HistoryEntry } from '../types';
import { BASE_XP, PERFECT_DAY_BONUS, STREAK_BASE_BONUS, STREAK_MAX_BONUS, CLASS_TITLES, POWER_LEVELS } from '../constants';

/**
 * Calculate the total XP required to reach a specific level.
 */
export const getXpToReachLevel = (level: number): number => {
  if (level <= 1) return 0;
  return 100 * (level - 1) + 10 * (level - 1) * (level - 2);
};

export const getXpForCurrentLevelProgress = (totalXp: number, level: number) => {
  const currentLevelXp = getXpToReachLevel(level);
  const nextLevelXp = getXpToReachLevel(level + 1);
  const progress = totalXp - currentLevelXp;
  const needed = nextLevelXp - currentLevelXp;
  return { progress, needed, percentage: (progress / needed) * 100 };
};

export const calculateLevel = (totalXp: number): number => {
  let level = 1;
  while (totalXp >= getXpToReachLevel(level + 1)) {
    level++;
  }
  return level;
};

export const getPowerTitle = (level: number): string => {
  const levels = Object.keys(POWER_LEVELS).map(Number).sort((a, b) => b - a);
  const matched = levels.find(l => level >= l);
  return matched ? POWER_LEVELS[matched] : POWER_LEVELS[1];
};

export const getDerivedStats = (state: UserState): Stats => {
  const stats: Stats = { ...state.allocatedPoints };
  state.history.forEach(entry => {
    if (entry.actions.MOVE) stats.stamina += 1;
    if (entry.actions.LEARN) stats.intelligence += 1;
    if (entry.actions.MAKE) stats.craft += 1;
    if (entry.actions.SHARE) stats.charisma += 1;
    if (entry.actions.CARE) stats.mana += 1;
  });
  if (state.today.MOVE) stats.stamina += 1;
  if (state.today.LEARN) stats.intelligence += 1;
  if (state.today.MAKE) stats.craft += 1;
  if (state.today.SHARE) stats.charisma += 1;
  if (state.today.CARE) stats.mana += 1;
  return stats;
};

export const getCharacterClass = (stats: Stats): string => {
  const matchingClass = CLASS_TITLES.find(c => c.condition(stats));
  return matchingClass?.name || 'Neophyte';
};

export const getHistoryInsights = (history: HistoryEntry[]) => {
  if (history.length === 0) return null;
  const totals = { MOVE: 0, LEARN: 0, MAKE: 0, SHARE: 0, CARE: 0 };
  history.forEach(h => {
    Object.keys(h.actions).forEach(k => {
      if (h.actions[k as LoopAction]) totals[k as LoopAction]++;
    });
  });
  const strongest = Object.entries(totals).reduce((a, b) => a[1] > b[1] ? a : b);
  const weakest = Object.entries(totals).reduce((a, b) => a[1] < b[1] ? a : b);
  
  return {
    strongest: strongest[0],
    weakest: weakest[0],
    totalActions: Object.values(totals).reduce((a, b) => a + b, 0)
  };
};

export const getDailyQuest = (today: DailyActions): string => {
  const unfinished = (Object.keys(today) as LoopAction[]).filter(k => !today[k]);
  if (unfinished.length === 0) return "The loop is closed. Rest well, Champion.";
  const questMap: Record<LoopAction, string> = {
    MOVE: "The Body Forge calls. Your muscles wither in stillness.",
    LEARN: "The Great Library is lonely. Feed the brain-worm.",
    MAKE: "The Ether is empty. Manifest a thought into form.",
    SHARE: "The Silent Bridge waits. Connect with a fellow traveler.",
    CARE: "The Spirit Garden is dry. Tend to the inner wells."
  };
  return questMap[unfinished[Math.floor(Math.random() * unfinished.length)]];
};

export const getTodayString = () => new Date().toISOString().split('T')[0];
export const getYesterdayString = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};
