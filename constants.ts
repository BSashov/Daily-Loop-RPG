
import { LoopAction } from './types';

export const BASE_XP: Record<LoopAction, number> = {
  MOVE: 20,
  LEARN: 20,
  MAKE: 25,
  SHARE: 20,
  CARE: 15,
};

export const PERFECT_DAY_BONUS = 50;

export const CLASS_ICONS: Record<string, string> = {
  sentinel: '🛡️',
  sage: '📖',
  artificer: '🔨',
  speaker: '🎭',
  weaver: '🪄',
  neophyte: '🌱',
};

export interface HeroStage {
  icon: string;
  name: Record<'en' | 'de' | 'bg', string>;
}

export interface HeroTemplate {
  id: string;
  stages: HeroStage[];
  desc: Record<'en' | 'de' | 'bg', string>;
}

export const HERO_TEMPLATES: HeroTemplate[] = [
  { 
    id: 'wolf', 
    stages: [
      { icon: '🐶', name: { en: 'Wolf Pup', de: 'Wolfswelpe', bg: 'Вълче' } },
      { icon: '🐺', name: { en: 'Young Wolf', de: 'Junger Wolf', bg: 'Млад вълк' } },
      { icon: '🐺⚔️', name: { en: 'Dire Wolf', de: 'Schreckenswolf', bg: 'Страшен вълк' } },
      { icon: '🐺🌌', name: { en: 'Fenrir Spawn', de: 'Fenris-Brut', bg: 'Потомък на Фенрир' } },
    ],
    desc: { en: 'A loyal spirit with a balanced heart.', de: 'Ein treuer Geist mit einem ausgeglichenen Herzen.', bg: 'Лоялен дух с балансирано сърце.' } 
  },
  { 
    id: 'dog', 
    stages: [
      { icon: '🐕', name: { en: 'Scrappy Pup', de: 'Rauflustiger Welpe', bg: 'Пале' } },
      { icon: '🐕‍🦺', name: { en: 'Brave Hound', de: 'Tapferer Hund', bg: 'Смело куче' } },
      { icon: '🛡️🐕', name: { en: 'Guardian Mutt', de: 'Wächter-Hund', bg: 'Куче пазач' } },
      { icon: '🐕👑', name: { en: 'Celestial Canine', de: 'Himmlischer Hund', bg: 'Небесно куче' } },
    ],
    desc: { en: 'Endless resilience and a wagging tail.', de: 'Endlose Widerstandsfähigkeit und ein wedelnder Schwanz.', bg: 'Безкрайна издръжливост и махаща опашка.' } 
  },
  { 
    id: 'baby', 
    stages: [
      { icon: '👶', name: { en: 'Fated Infant', de: 'Schicksalskind', bg: 'Дете на съдбата' } },
      { icon: '🧒', name: { en: 'Curious Youth', de: 'Neugieriges Kind', bg: 'Любопитно дете' } },
      { icon: '👤', name: { en: 'Seasoned Hero', de: 'Erfahrener Held', bg: 'Опитен герой' } },
      { icon: '🧙', name: { en: 'Grand Archmage', de: 'Großer Erzmagier', bg: 'Велик Архимаг' } },
    ],
    desc: { en: 'Unlimited potential for growth.', de: 'Unbegrenztes Wachstumspotenzial.', bg: 'Неограничен потенциал за растеж.' } 
  },
  { 
    id: 'fox', 
    stages: [
      { icon: '🦊', name: { en: 'Ember Kit', de: 'Glut-Fuchs', bg: 'Огнено лисиче' } },
      { icon: '🦊🐾', name: { en: 'Cunning Fox', de: 'Schlauer Fuchs', bg: 'Хитра лисица' } },
      { icon: '🦊🔥', name: { en: 'Flame Tail', de: 'Flammenschweif', bg: 'Огнеопашка' } },
      { icon: '🦊🔮', name: { en: 'Nine-Tailed Myth', de: 'Neunschwänziger Mythus', bg: 'Деветоопашат мит' } },
    ],
    desc: { en: 'Cunning and quick to adapt.', de: 'Schlau und anpassungsfähig.', bg: 'Хитър и бързо адаптиращ се.' } 
  },
  { 
    id: 'bird', 
    stages: [
      { icon: '🐣', name: { en: 'Sky Hatchling', de: 'Himmelsküken', bg: 'Птиче' } },
      { icon: '🐦', name: { en: 'Swift Swift', de: 'Schneller Segler', bg: 'Бързолет' } },
      { icon: '🐥', name: { en: 'Storm Hawk', de: 'Sturmfalke', bg: 'Буреносен ястреб' } },
      { icon: '🦅', name: { en: 'Sun Phoenix', de: 'Sonnenphönix', bg: 'Слънчев феникс' } },
    ],
    desc: { en: 'A swift messenger with a view from above.', de: 'Ein flinker Bote mit dem Blick von oben.', bg: 'Бърз вестоносец с поглед отвисоко.' } 
  },
  { 
    id: 'cat', 
    stages: [
      { icon: '🐱', name: { en: 'Stray Kitten', de: 'Streunendes Kätzchen', bg: 'Малко коте' } },
      { icon: '🐈', name: { en: 'Shadow Cat', de: 'Schattenkatze', bg: 'Сенчеста котка' } },
      { icon: '🐆', name: { en: 'Night Prowler', de: 'Nachtjäger', bg: 'Нощен ловец' } },
      { icon: '🦁', name: { en: 'Primal Apex', de: 'Urzeitlicher Jäger', bg: 'Първичен хищник' } },
    ],
    desc: { en: 'Mysterious, agile, and always curious.', de: 'Geheimnisvoll, agil und immer neugierig.', bg: 'Мистериозен, пъргав и винаги любопитен.' } 
  },
  { 
    id: 'cow', 
    stages: [
      { icon: '🐮', name: { en: 'Earth Calf', de: 'Erdkalb', bg: 'Теленце' } },
      { icon: '🐄', name: { en: 'Steady Bovine', de: 'Beständiges Rind', bg: 'Мирна крава' } },
      { icon: '🐂', name: { en: 'Mighty Ox', de: 'Mächtiger Ochse', bg: 'Мощен бик' } },
      { icon: '🐃', name: { en: 'Behemoth', de: 'Behemoth', bg: 'Бегемот' } },
    ],
    desc: { en: 'Steady, strong, and deeply grounded.', de: 'Beständig, stark und tief verwurzelt.', bg: 'Постоянен, силен и дълбоко заземен.' } 
  },
  { 
    id: 'goat', 
    stages: [
      { icon: '🐐', name: { en: 'Hill Kid', de: 'Hügelkitz', bg: 'Яре' } },
      { icon: '🐏', name: { en: 'Peak Goat', de: 'Berghippe', bg: 'Планинска коза' } },
      { icon: '🐐⛰️', name: { en: 'Summit Ram', de: 'Gipfelwidder', bg: 'Върхов овен' } },
      { icon: '🐐🌟', name: { en: 'Astral Capricorn', de: 'Astraler Steinbock', bg: 'Астрален Козирог' } },
    ],
    desc: { en: 'Stubborn persistence that conquers any hill.', de: 'Hartnäckige Ausdauer, die jeden Hügel bezwingt.', bg: 'Упорит стремеж, който покорява всеки хълм.' } 
  },
  { 
    id: 'bunny', 
    stages: [
      { icon: '🐰', name: { en: 'Meadow Kit', de: 'Wiesenkit', bg: 'Зайче' } },
      { icon: '🐇', name: { en: 'Swift Rabbit', de: 'Flinker Hase', bg: 'Бърз заек' } },
      { icon: '🐇✨', name: { en: 'Moon Leaper', de: 'Mondspringer', bg: 'Лунен скачач' } },
      { icon: '🐇🌙', name: { en: 'Lunar Deity', de: 'Mondgottheit', bg: 'Лунно божество' } },
    ],
    desc: { en: 'Bursting with energy and gentle speed.', de: 'Voller Energie und sanfter Geschwindigkeit.', bg: 'Пълен с енергия и нежна скорост.' } 
  },
  { 
    id: 'turtle', 
    stages: [
      { icon: '🥚', name: { en: 'Tide Egg', de: 'Gezeitenei', bg: 'Морско яйце' } },
      { icon: '🐢', name: { en: 'Hatchling', de: 'Schlüpfling', bg: 'Костенурка' } },
      { icon: '🐢🛡️', name: { en: 'Shell Guard', de: 'Panzerwache', bg: 'Брониран пазител' } },
      { icon: '🐢🐲', name: { en: 'World Tortoise', de: 'Welten-Schildkröte', bg: 'Световна костенурка' } },
    ],
    desc: { en: 'Wisdom found in the slow and steady path.', de: 'Weisheit auf dem langsamen und stetigen Pfad.', bg: 'Мъдрост, открита в бавния и постоянен път.' } 
  },
];

export const TRANSLATIONS = {
  en: {
    title: "Daily Loop",
    quests: "Quests",
    hero: "Hero",
    tome: "Tome",
    settings: "Settings",
    currentQuest: "Current Quest",
    alignment: "Daily Alignment",
    level: "Level",
    streak: "Streak",
    attributes: "Attributes",
    valor: "Relic Treasury",
    export: "Export Soul",
    import: "Import Tome",
    eval: "Astral Evaluation",
    strongest: "Ascendant Stat",
    neglected: "Neglected Star",
    reminder: "Reminder Time",
    lang: "Language",
    enableNotif: "Enable Notifications",
    activeNotif: "Notifications Active",
    details: "Chronicle Details",
    noEntries: "The Tome is empty. Close a loop to begin.",
    editEntry: "Edit Chronicle",
    saveEntry: "Seal Changes",
    relicUnlocked: "Artifact Manifested!",
    chooseHero: "Summon Thy Spirit",
    chooseHeroDesc: "Choose your companion for the loops ahead. This choice is final.",
    embark: "Embark on Journey",
    evolution: {
      baby: "Neophyte",
      young: "Acolyte",
      warrior: "Guardian",
      ascendant: "Legend"
    },
    actions: {
      MOVE: { label: "Physical", sub: "Stamina", placeholder: "Movement log..." },
      LEARN: { label: "Mental", sub: "Intelligence", placeholder: "Study notes..." },
      MAKE: { label: "Creative", sub: "Craft", placeholder: "Manifestation..." },
      SHARE: { label: "Social", sub: "Charisma", placeholder: "Connection..." },
      CARE: { label: "Soul", sub: "Mana", placeholder: "Healing..." },
    },
    stats: {
      stamina: "Stamina",
      intelligence: "Intelligence",
      craft: "Craft",
      charisma: "Charisma",
      mana: "Mana"
    },
    classes: {
      sentinel: "Divine Sentinel",
      sage: "Arcane Sage",
      artificer: "Master Artificer",
      speaker: "World Speaker",
      weaver: "Spirit Weaver",
      neophyte: "Beginner"
    },
    relics: {
      r1: "Titan Belt",
      r2: "Sage Glass",
      r3: "Master Hammer",
      r4: "Gold Tongue",
      r5: "Spirit Orb",
      r6: "Alpha Mantle",
      r7: "Sun Plate"
    },
    powerLevels: {
      pup: "Pup",
      seeker: "Seeker",
      warrior: "Warrior",
      alpha: "Alpha",
      celestial: "Celestial"
    }
  },
  de: {
    title: "Täglicher Loop",
    quests: "Quests",
    hero: "Held",
    tome: "Foliant",
    settings: "Einstellungen",
    currentQuest: "Aktuelle Quest",
    alignment: "Tägliche Ausrichtung",
    level: "Stufe",
    streak: "Serie",
    attributes: "Attribute",
    valor: "Reliktkammer",
    export: "Seele Exportieren",
    import: "Foliant Importieren",
    eval: "Astrale Auswertung",
    strongest: "Aufsteigender Stat",
    neglected: "Vernachlässigter Stern",
    reminder: "Erinnerungszeit",
    lang: "Sprache",
    enableNotif: "Benachrichtigungen Aktivieren",
    activeNotif: "Benachrichtigungen Aktiv",
    details: "Chronik-Details",
    noEntries: "Der Foliant ist leer. Schließe einen Loop, um zu beginnen.",
    editEntry: "Chronik Bearbeiten",
    saveEntry: "Änderungen Siegeln",
    relicUnlocked: "Artefakt Manifestiert!",
    chooseHero: "Beschwöre deinen Geist",
    chooseHeroDesc: "Wähle deinen Begleiter für die kommenden Loops. Diese Wahl ist endgültig.",
    embark: "Die Reise antreten",
    evolution: {
      baby: "Neophyt",
      young: "Akolyth",
      warrior: "Wächter",
      ascendant: "Legende"
    },
    actions: {
      MOVE: { label: "Physisch", sub: "Ausdauer", placeholder: "Bewegungsprotokoll..." },
      LEARN: { label: "Mental", sub: "Intelligenz", placeholder: "Studiennotizen..." },
      MAKE: { label: "Kreativ", sub: "Handwerk", placeholder: "Manifestation..." },
      SHARE: { label: "Sozial", sub: "Charisma", placeholder: "Verbindung..." },
      CARE: { label: "Seele", sub: "Mana", placeholder: "Heilung..." },
    },
    stats: {
      stamina: "Ausdauer",
      intelligence: "Intelligenz",
      craft: "Handwerk",
      charisma: "Charisma",
      mana: "Mana"
    },
    classes: {
      sentinel: "Göttlicher Wächter",
      sage: "Arkaner Weiser",
      artificer: "Meister-Handwerker",
      speaker: "Welten-Sprecher",
      weaver: "Geister-Weber",
      neophyte: "Anfänger"
    },
    relics: {
      r1: "Titanengürtel",
      r2: "Weisheitsglas",
      r3: "Meisterhammer",
      r4: "Goldzunge",
      r5: "Geisterkugel",
      r6: "Alpha-Mantel",
      r7: "Sonnenplatte"
    },
    powerLevels: {
      pup: "Welpe",
      seeker: "Sucher",
      warrior: "Krieger",
      alpha: "Alpha",
      celestial: "Himmlisch"
    }
  },
  bg: {
    title: "Дневен Цикъл",
    quests: "Куестове",
    hero: "Герой",
    tome: "Том",
    settings: "Настройки",
    currentQuest: "Текуща Мисия",
    alignment: "Дневно Подравняване",
    level: "Ниво",
    streak: "Серия",
    attributes: "Атрибути",
    valor: "Съкровищница",
    export: "Експорт на Душа",
    import: "Импорт на Том",
    eval: "Астрална Оценка",
    strongest: "Възходящ Стат",
    neglected: "Пренебрегната Звезда",
    reminder: "Време за Напомняне",
    lang: "Език",
    enableNotif: "Включи Известия",
    activeNotif: "Известията са Включени",
    details: "Детайли на Хрониката",
    noEntries: "Томът е празен. Затворете цикъл, за да започнете.",
    editEntry: "Редактирай Хрониката",
    saveEntry: "Запечатай Промените",
    relicUnlocked: "Артефактът се прояви!",
    chooseHero: "Призови своя дух",
    chooseHeroDesc: "Избери своя спътник за цикъла. Този избор е окончателен.",
    embark: "Започни приключението",
    evolution: {
      baby: "Неофит",
      young: "Аколит",
      warrior: "Пазител",
      ascendant: "Легенда"
    },
    actions: {
      MOVE: { label: "Физически", sub: "Издръжливост", placeholder: "Дневник на движението..." },
      LEARN: { label: "Ментално", sub: "Интелект", placeholder: "Бележки за учене..." },
      MAKE: { label: "Творчески", sub: "Занаят", placeholder: "Манифестация..." },
      SHARE: { label: "Социално", sub: "Харизма", placeholder: "Връзка..." },
      CARE: { label: "Душа", sub: "Мана", placeholder: "Изцеление..." },
    },
    stats: {
      stamina: "Издръжливост",
      intelligence: "Интелект",
      craft: "Занаят",
      charisma: "Харизма",
      mana: "Мана"
    },
    classes: {
      sentinel: "Божествен страж",
      sage: "Арканен мъдрец",
      artificer: "Майстор занаятчия",
      speaker: "Говорещ със светове",
      weaver: "Духовен Тъкач",
      neophyte: "Начинаещ"
    },
    relics: {
      r1: "Титански колан",
      r2: "Мъдро стъкло",
      r3: "Майсторски чук",
      r4: "Златен език",
      r5: "Духовна сфера",
      r6: "Алфа мантия",
      r7: "Слънчева плоча"
    },
    powerLevels: {
      pup: "Кутре",
      seeker: "Търсач",
      warrior: "Воин",
      alpha: "Алфа",
      celestial: "Небесен"
    }
  }
};

export const CLASS_TITLES = [
  { id: 'sentinel', condition: (s: any) => s.stamina >= s.intelligence && s.stamina >= s.craft && s.stamina >= s.charisma && s.stamina >= s.mana && s.stamina > 5 },
  { id: 'sage', condition: (s: any) => s.intelligence >= s.stamina && s.intelligence >= s.craft && s.intelligence >= s.charisma && s.intelligence >= s.mana && s.intelligence > 5 },
  { id: 'artificer', condition: (s: any) => s.craft >= s.stamina && s.craft >= s.intelligence && s.craft >= s.charisma && s.craft >= s.mana && s.craft > 5 },
  { id: 'speaker', condition: (s: any) => s.charisma >= s.stamina && s.charisma >= s.intelligence && s.charisma >= s.craft && s.charisma >= s.mana && s.charisma > 5 },
  { id: 'weaver', condition: (s: any) => s.mana >= s.stamina && s.mana >= s.intelligence && s.mana >= s.craft && s.mana >= s.charisma && s.mana > 5 },
  { id: 'neophyte', condition: () => true },
];

export const RELIC_DEFINITIONS = [
  { id: 'r1', name: 'Titan Belt', icon: '🎗️', requirement: (s: any, l: number) => s.stamina >= 10 },
  { id: 'r2', name: 'Sage Glass', icon: '🔮', requirement: (s: any, l: number) => s.intelligence >= 10 },
  { id: 'r3', name: 'Master Hammer', icon: '🛠️', requirement: (s: any, l: number) => s.craft >= 10 },
  { id: 'r4', name: 'Gold Tongue', icon: '🎭', requirement: (s: any, l: number) => s.charisma >= 10 },
  { id: 'r5', name: 'Spirit Orb', icon: '✨', requirement: (s: any, l: number) => s.mana >= 10 },
  { id: 'r6', name: 'Alpha Mantle', icon: '🧥', requirement: (s: any, l: number) => l >= 20 },
  { id: 'r7', name: 'Sun Plate', icon: '🛡️', requirement: (s: any, l: number) => l >= 40 },
];

export const POWER_LEVELS: Record<number, string> = {
  1: "pup",
  5: "seeker",
  10: "warrior",
  20: "alpha",
  40: "celestial",
};
