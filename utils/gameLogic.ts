
import { UserState, Stats, LoopAction, DailyActions, HistoryEntry } from '../types';
import { CLASS_TITLES, POWER_LEVELS, TRANSLATIONS } from '../constants';

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

export const getPowerTitle = (level: number, lang: 'en' | 'de' | 'bg'): string => {
  const levels = Object.keys(POWER_LEVELS).map(Number).sort((a, b) => b - a);
  const matchedKey = levels.find(l => level >= l);
  const key = matchedKey ? POWER_LEVELS[matchedKey] : POWER_LEVELS[1];
  return (TRANSLATIONS[lang].powerLevels as any)[key] || key;
};

export const getDerivedStats = (state: UserState): Stats => {
  const stats: Stats = { stamina: 0, intelligence: 0, craft: 0, charisma: 0, mana: 0 };
  
  state.history.forEach(entry => {
    if (entry.actions.MOVE) stats.stamina += 1;
    if (entry.actions.LEARN) stats.intelligence += 1;
    if (entry.actions.MAKE) stats.craft += 1;
    if (entry.actions.SHARE) stats.charisma += 1;
    if (entry.actions.CARE) stats.mana += 1;
  });

  const today = getTodayString();
  const hasTodayInHistory = state.history.some(h => h.date === today);
  if (!hasTodayInHistory) {
    if (state.today.MOVE) stats.stamina += 1;
    if (state.today.LEARN) stats.intelligence += 1;
    if (state.today.MAKE) stats.craft += 1;
    if (state.today.SHARE) stats.charisma += 1;
    if (state.today.CARE) stats.mana += 1;
  }

  return stats;
};

export const getCharacterClass = (stats: Stats, lang: 'en' | 'de' | 'bg'): string => {
  const matchingClass = CLASS_TITLES.find(c => c.condition(stats));
  const classId = matchingClass?.id || 'neophyte';
  return (TRANSLATIONS[lang].classes as any)[classId] || classId;
};

export const getHistoryInsights = (history: HistoryEntry[]) => {
  if (history.length === 0) return null;
  const totals = { MOVE: 0, LEARN: 0, MAKE: 0, SHARE: 0, CARE: 0 };
  history.forEach(h => {
    Object.keys(h.actions).forEach(k => {
      if (h.actions[k as LoopAction]) totals[k as LoopAction]++;
    });
  });
  
  const entries = Object.entries(totals);
  const strongest = entries.reduce((a, b) => a[1] >= b[1] ? a : b);
  const weakest = entries.reduce((a, b) => a[1] <= b[1] ? a : b);
  
  return {
    strongest: strongest[0],
    weakest: weakest[0],
    totalActions: Object.values(totals).reduce((a, b) => a + b, 0)
  };
};

export const getDailyQuest = (today: DailyActions, lang: 'en' | 'de' | 'bg'): string => {
  const unfinished = (Object.keys(today) as LoopAction[]).filter(k => !today[k]);
  
  const quests: Record<'en' | 'de' | 'bg', Record<string, string>> = {
    en: {
      allDone: "The loop is closed. Rest well, Champion.",
      MOVE: "The Body Forge calls. Your muscles wither in stillness.",
      LEARN: "The Great Library is lonely. Feed the brain-worm.",
      MAKE: "The Ether is empty. Manifest a thought into form.",
      SHARE: "The Silent Bridge waits. Connect with a fellow traveler.",
      CARE: "The Spirit Garden is dry. Tend to the inner wells."
    },
    de: {
      allDone: "Der Loop ist geschlossen. Ruh dich gut aus, Champion.",
      MOVE: "Die Körper-Schmiede ruft. Deine Muskeln verkümmern in der Stille.",
      LEARN: "Die Große Bibliothek ist einsam. Füttere den Wissensdurst.",
      MAKE: "Der Äther ist leer. Manifestiere einen Gedanken in Form.",
      SHARE: "Die stille Brücke wartet. Verbinde dich mit einem Mitreisenden.",
      CARE: "Der Geistergarten ist trocken. Kümmere dich um die inneren Brunnen."
    },
    bg: {
      allDone: "Цикълът е затворен. Почивай си добре, Шампионе.",
      MOVE: "Ковачницата на тялото зове. Мускулите ти закърняват в неподвижност.",
      LEARN: "Великата библиотека е самотна. Нахрани ума си.",
      MAKE: "Етерът е празен. Манифестирай мисъл във форма.",
      SHARE: "Тихият мост чака. Свържи се със спътник.",
      CARE: "Духовната градина е суха. Погрижи се за вътрешните кладенци."
    }
  };

  const activeQuests = quests[lang];
  if (unfinished.length === 0) return activeQuests.allDone;
  
  const selectedAction = unfinished[Math.floor(Math.random() * unfinished.length)];
  return activeQuests[selectedAction];
};

export const getTodayString = () => new Date().toISOString().split('T')[0];
