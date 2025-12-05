import { FoodLogEntry } from '@/types';

export const initialFoodLog: FoodLogEntry[] = [
  {
    id: '1',
    time: '7:30 AM',
    mealType: 'breakfast',
    name: 'Oatmeal with banana',
    nutrition: { sodium: 300, potassium: 450, phosphorus: 180, protein: 12, calories: 350 },
  },
  {
    id: '2',
    time: '12:30 PM',
    mealType: 'lunch',
    name: 'Turkey sandwich',
    nutrition: { sodium: 1200, potassium: 400, phosphorus: 150, protein: 14, calories: 450 },
  },
  {
    id: '3',
    time: '3:00 PM',
    mealType: 'snack',
    name: 'Apple',
    nutrition: { sodium: 0, potassium: 195, phosphorus: 50, protein: 2, calories: 95 },
  },
];
