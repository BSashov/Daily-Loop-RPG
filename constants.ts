
import { LoopAction } from './types';

export const BASE_XP: Record<LoopAction, number> = {
  MOVE: 20,
  LEARN: 20,
  MAKE: 25,
  SHARE: 20,
  CARE: 15,
};

export const PERFECT_DAY_BONUS = 50;

export const HERO_TEMPLATES = [
  { id: 'wolf', icon: '🐺', name: { en: 'The Wolf Pup', de: 'Der Wolfswelpe', bg: 'Вълчето' }, desc: { en: 'A loyal spirit with a balanced heart.', de: 'Ein treuer Geist mit einem ausgeglichenen Herzen.', bg: 'Лоялен дух с балансирано сърце.' } },
  { id: 'dog', icon: '🐕', name: { en: 'The Brave Hound', de: 'Der tapfere Hund', bg: 'Смелото куче' }, desc: { en: 'Endless resilience and a wagging tail.', de: 'Endlose Widerstandsfähigkeit und ein wedelnder Schwanz.', bg: 'Безкрайна издръжливост и махаща опашка.' } },
  { id: 'baby', icon: '👶', name: { en: 'The Fated Child', de: 'Das Schicksalskind', bg: 'Детето на съдбата' }, desc: { en: 'Unlimited potential for growth.', de: 'Unbegrenztes Wachstumspotenzial.', bg: 'Неограничен потенциал за растеж.' } },
  { id: 'fox', icon: '🦊', name: { en: 'The Ember Kit', de: 'Der Glut-Fuchs', bg: 'Огненото лисиче' }, desc: { en: 'Cunning and quick to adapt.', de: 'Schlau und anpassungsfähig.', bg: 'Хитър и бързо адаптиращ се.' } },
  { id: 'bird', icon: '🐦', name: { en: 'The Sky Herald', de: 'Der Himmelsbote', bg: 'Небесният вестоносец' }, desc: { en: 'A swift messenger with a view from above.', de: 'Ein flinker Bote mit dem Blick von oben.', bg: 'Бърз вестоносец с поглед отвисоко.' } },
  { id: 'cat', icon: '🐈', name: { en: 'The Shadow Stalker', de: 'Der Schattenschleicher', bg: 'Сенчестият ловец' }, desc: { en: 'Mysterious, agile, and always curious.', de: 'Geheimnisvoll, agil und immer neugierig.', bg: 'Мистериозен, пъргав и винаги любопитен.' } },
  { id: 'cow', icon: '🐄', name: { en: 'The Earth Guardian', de: 'Der Erdwächter', bg: 'Земният пазител' }, desc: { en: 'Steady, strong, and deeply grounded.', de: 'Beständig, stark und tief verwurzelt.', bg: 'Постоянен, силен и дълбоко заземен.' } },
  { id: 'goat', icon: '🐐', name: { en: 'The Peak Climber', de: 'Der Gipfelstürmer', bg: 'Планинският катерач' }, desc: { en: 'Stubborn persistence that conquers any hill.', de: 'Hartnäckige Ausdauer, die jeden Hügel bezwingt.', bg: 'Упорит стремеж, който покорява всеки хълм.' } },
  { id: 'bunny', icon: '🐰', name: { en: 'The Meadow Jumper', de: 'Der Wiesenhopser', bg: 'Ливадният скачач' }, desc: { en: 'Bursting with energy and gentle speed.', de: 'Voller Energie und sanfter Geschwindigkeit.', bg: 'Пълен с енергия и нежна скорост.' } },
  { id: 'turtle', icon: '🐢', name: { en: 'The Tide Walker', de: 'Der Gezeitenwandler', bg: 'Пътешественикът' }, desc: { en: 'Wisdom found in the slow and steady path.', de: 'Weisheit auf dem langsamen und stetigen Pfad.', bg: 'Мъдрост, открита в бавния и постоянен път.' } },
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
      neophyte: "Neophyte"
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
      neophyte: "Neophyt"
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
      neophyte: "Неофит"
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
