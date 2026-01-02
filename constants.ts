
import { LoopAction, LootCard } from './types';

export const BASE_XP: Record<LoopAction, number> = {
  MOVE: 20,
  LEARN: 20,
  MAKE: 25,
  SHARE: 20,
  CARE: 15,
};

export const PERFECT_DAY_BONUS = 50;
export const STREAK_BASE_BONUS = 5;
export const STREAK_MAX_BONUS = 30;

export const STAT_MAPPING: Record<LoopAction, string> = {
  MOVE: 'stamina',
  LEARN: 'intelligence',
  MAKE: 'craft',
  SHARE: 'charisma',
  CARE: 'mana',
};

export const POWER_LEVELS: Record<number, string> = {
  1: "Wet Noodle",
  2: "Sentient Potato",
  3: "Vulnerable to Breezes",
  5: "Aspiring Villager",
  8: "Aggressive Neophyte",
  10: "Local Legend's Intern",
  15: "Certified Protagonist",
  25: "Godling in Training",
  40: "Herald of the Loop",
  50: "Cosmic Entity",
};

export const LOOT_POOL: LootCard[] = [
  { id: '1', name: 'Wanderer\'s Compass', description: 'Points toward a balanced life.', rarity: 'Common' },
  { id: '2', name: 'Artisan\'s Thimble', description: 'A tiny tool for great makes.', rarity: 'Common' },
  { id: '3', name: 'Scholar\'s Quill', description: 'Never runs out of ink or ideas.', rarity: 'Uncommon' },
  { id: '4', name: 'Messenger\'s Horn', description: 'Your voice carries further than before.', rarity: 'Uncommon' },
  { id: '5', name: 'Vial of Pure Focus', description: 'Drink to see the invisible loops.', rarity: 'Rare' },
  { id: '6', name: 'Sovereign\'s Crest', description: 'The mark of a true daily hero.', rarity: 'Legendary' },
  { id: '7', name: 'Void Lantern', description: 'Illuminates the path through dark days.', rarity: 'Rare' },
  { id: '8', name: 'Eternal Loop', description: 'A ring that hums with consistent energy.', rarity: 'Legendary' },
  { id: '9', name: 'Drake Scale', description: 'Toughness earned through movement.', rarity: 'Uncommon' },
  { id: '10', name: 'Scroll of Ages', description: 'Wisdom collected over time.', rarity: 'Rare' },
];

export const CLASS_TITLES = [
  { name: 'Arcane Analyst', condition: (s: any) => s.intelligence > 10 && s.mana > 10 },
  { name: 'Creative Bard', condition: (s: any) => s.craft > 10 && s.charisma > 10 },
  { name: 'Divine Sentinel', condition: (s: any) => s.stamina > 10 && s.mana > 10 },
  { name: 'Master Crafter', condition: (s: any) => s.craft > 15 },
  { name: 'Lorekeeper', condition: (s: any) => s.intelligence > 15 },
  { name: 'Iron Titan', condition: (s: any) => s.stamina > 15 },
  { name: 'Social Architect', condition: (s: any) => s.charisma > 15 },
  { name: 'Spirit Guide', condition: (s: any) => s.mana > 15 },
  { name: 'Neophyte', condition: () => true }, // Default fallback
];

export const MEDALS = [
  { id: 'm1', title: 'The Awakened', description: 'First loop completed.', icon: '📜', color: 'slate' },
  { id: 'm2', title: 'Sun Gazer', description: 'Achieved a 5-star day.', icon: '☀️', color: 'amber' },
  { id: 'm3', title: 'Flame Bearer', description: 'Maintained a 7-day streak.', icon: '🔥', color: 'orange' },
  { id: 'm4', title: 'Iron Will', description: 'Reached Level 10 Stamina.', icon: '🛡️', color: 'emerald' },
  { id: 'm5', title: 'Great Sage', description: 'Reached Level 10 Intelligence.', icon: '🔮', color: 'blue' },
  { id: 'm6', title: 'Artisan King', description: 'Reached Level 10 Craft.', icon: '⚙️', color: 'yellow' },
  { id: 'm7', title: 'Silver Tongue', description: 'Reached Level 10 Charisma.', icon: '🕯️', color: 'pink' },
  { id: 'm8', title: 'Star Child', description: 'Reached Level 10 Mana.', icon: '✨', color: 'violet' },
  { id: 'm9', title: 'Transcendent', description: 'Unlocked a Specialized Class.', icon: '💎', color: 'indigo' },
  { id: 'm10', title: 'Eternal Voyager', description: 'Reached Character Level 20.', icon: '🌌', color: 'purple' },
];

export const ACHIEVEMENTS = MEDALS; // Maintaining alias for compatibility if needed
