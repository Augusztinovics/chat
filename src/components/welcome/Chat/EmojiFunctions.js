import { SMILES, HANDS, PEAPLE, OFFICE, PLACES, TRANSPORT, ANIMALS, FOODS, PLANTS, SPORTS, EARTH, CLOTHINGS, ENTERTAINMENT, SYMBOLS } from './EmojiSets.js';
export const GROUPS = [
    {
        id: 'RECENT',
        label: '->.<-',
    },
    {
        id: 'SMILES',
        label: '😀...🤬',
    },
    {
        id: 'HANDS',
        label: '✋...🤳',
    },
    {
        id: 'PEAPLE',
        label: '👮...🩼',
    },
    {
        id: 'OFFICE',
        label: '💺...🗳',
    },
    {
        id: 'PLACES',
        label: '⛲...🗺',
    },
    {
        id: 'TRANSPORT',
        label: '🏍...🛼',
    },
    {
        id: 'ANIMALS',
        label: '🐀...🦯',
    },
    {
        id: 'FOODS',
        label: '☕...🧂',
    },
    {
        id: 'PLANTS',
        label: '🌰...💮',
    },
    {
        id: 'SPORTS',
        label: '⚽...🧩',
    },
    {
        id: 'EARTH',
        label: '🌌...🌬',
    },
    {
        id: 'CLOTHINGS',
        label: '👔...🧤',
    },
    {
        id: 'ENTERTAINMENT',
        label: '🎘...🧨',
    },
    {
        id: 'SYMBOLS',
        label: '💰...🕹',
    },
    {
        id: 'ALL',
        label: '{...}',
    },
];

export const ALL = SMILES.concat(HANDS, PEAPLE, OFFICE, PLACES, TRANSPORT, ANIMALS, FOODS, PLANTS, SPORTS, EARTH, CLOTHINGS, ENTERTAINMENT, SYMBOLS);

export function selectByCategory(category) {
    switch (category) {
        case 'SMILES':
            return SMILES;
        case 'HANDS':
            return HANDS;
        case 'PEAPLE':
            return PEAPLE;
        case 'OFFICE':
            return OFFICE;
        case 'PLACES':
            return PLACES;
        case 'TRANSPORT':
            return TRANSPORT;
        case 'ANIMALS':
            return ANIMALS;
        case 'FOODS':
            return FOODS;
        case 'PLANTS':
            return PLANTS;
        case 'SPORTS':
            return SPORTS;
        case 'EARTH':
            return EARTH;
        case 'CLOTHINGS':
            return CLOTHINGS;
        case 'ENTERTAINMENT':
            return ENTERTAINMENT;
        case 'SYMBOLS':
            return SYMBOLS;
        case 'RECENT':
            // TODO save and read to from local storage
            return [];
        default:
            return ALL;
    }
};

export function searchEmojis(searchText) {
    return ALL.filter((e) => {
        return e.name.toLowerCase().includes(searchText.toLowerCase());
    });
};