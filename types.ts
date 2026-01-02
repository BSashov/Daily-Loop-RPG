
export type LoopAction = 'MOVE' | 'LEARN' | 'MAKE' | 'SHARE' | 'CARE';

export interface DailyActions {
  MOVE: boolean;
  LEARN: boolean;
  MAKE: boolean;
  SHARE: boolean;
  CARE: boolean;
}

export interface HistoryEntry {
  date: string; // ISO Date String YYYY-MM-DD
  actions: DailyActions;
  logs: Record<LoopAction, string>;
  xpEarned: number;
}

export interface Stats {
  stamina: number;  // MOVE
  intelligence: number; // LEARN
  craft: number; // MAKE
  charisma: number; // SHARE
  mana: number; // CARE
}

export interface AppSettings {
  language: 'en' | 'de' | 'bg';
  reminderTime: string;
  notificationsEnabled: boolean;
}

export interface Relic {
  id: string;
  name: string;
  icon: string;
  unlockedAt: string;
}

export interface UserState {
  totalXp: number;
  level: number;
  history: HistoryEntry[];
  today: DailyActions;
  todayLogs: Record<LoopAction, string>;
  streak: number;
  lastCompletedDate: string | null;
  settings: AppSettings;
  relics: Relic[];
  selectedHeroId: string | null;
}
