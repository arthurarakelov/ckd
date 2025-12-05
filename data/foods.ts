import { FoodItem, AlternativeSnack } from '@/types';

export const foods: Record<string, FoodItem> = {
  pringles: {
    id: 'pringles',
    name: 'Pringles Original',
    servingSize: '150g (1 can)',
    emoji: '🥫',
    nutrition: { sodium: 1200, potassium: 450, phosphorus: 150, protein: 8, calories: 800 },
    portions: [
      { label: 'Whole can', multiplier: 1 },
      { label: 'About half', multiplier: 0.5 },
      { label: 'A quarter', multiplier: 0.25 },
    ],
    warnings: ['high-sodium'],
  },
  sweetPotato: {
    id: 'sweetPotato',
    name: 'Sweet Potato',
    servingSize: '130g (1 medium)',
    emoji: '🍠',
    nutrition: { sodium: 70, potassium: 542, phosphorus: 62, protein: 2, calories: 112 },
    portions: [
      { label: 'Whole potato', multiplier: 1 },
      { label: 'Half', multiplier: 0.5 },
    ],
    warnings: ['high-potassium', 'losartan-interaction'],
  },
  wheatThins: {
    id: 'wheatThins',
    name: 'Wheat Thins Original',
    servingSize: '29g (16 crackers)',
    emoji: '🍘',
    nutrition: { sodium: 200, potassium: 70, phosphorus: 60, protein: 2, calories: 140 },
    portions: [
      { label: '16 crackers', multiplier: 1 },
      { label: '8 crackers', multiplier: 0.5 },
    ],
    warnings: [],
  },
};

export const alternativeSnacks: AlternativeSnack[] = [
  { name: 'Carrot sticks', sodium: 15, potassium: 80 },
  { name: 'Apple slices', sodium: 0, potassium: 50 },
  { name: 'Unsalted rice cakes', sodium: 10, potassium: 20 },
];

export const alternativesForPringles: AlternativeSnack[] = [
  { name: 'Carrot sticks', sodium: 15, potassium: 80 },
  { name: 'Apple slices', sodium: 0, potassium: 50 },
  { name: 'Unsalted rice cakes', sodium: 10, potassium: 20 },
];

export const alternativesForSweetPotato: AlternativeSnack[] = [
  { name: 'Cauliflower mash', sodium: 30, potassium: 150 },
  { name: 'White rice', sodium: 5, potassium: 35 },
  { name: 'Turnips (boiled)', sodium: 20, potassium: 190 },
];

export const alternativesForWheatThins: AlternativeSnack[] = [
  { name: 'Unsalted crackers', sodium: 0, potassium: 40 },
  { name: 'Rice cakes (plain)', sodium: 10, potassium: 20 },
  { name: 'Low-sodium pretzels', sodium: 80, potassium: 30 },
];
