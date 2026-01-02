
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
  logs: Record<LoopAction, string>; // What the user did
  xpEarned: number;
}

export interface Stats {
  stamina: number;  // MOVE
  intelligence: number; // LEARN
  craft: number; // MAKE
  charisma: number; // SHARE
  mana: number; // CARE
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  isUnlocked: boolean;
}

export interface LootCard {
  id: string;
  name: string;
  description: string;
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Legendary';
}

export interface UserState {
  totalXp: number;
  level: number;
  history: HistoryEntry[];
  today: DailyActions;
  todayLogs: Record<LoopAction, string>;
  allocatedPoints: Stats;
  freePoints: number;
  streak: number;
  lastCompletedDate: string | null;
  unlockedLoot: LootCard[];
}
