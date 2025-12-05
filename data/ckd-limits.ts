import { NutrientLimit } from '@/types';

export const ckdStage3Limits: Record<string, NutrientLimit> = {
  sodium: { min: 1500, max: 2000, target: 1800, unit: 'mg', label: 'Sodium' },
  potassium: { min: 2000, max: 3000, target: 2500, unit: 'mg', label: 'Potassium' },
  phosphorus: { min: 700, max: 1000, target: 800, unit: 'mg', label: 'Phosphorus' },
  protein: { min: 36, max: 48, target: 42, unit: 'g', label: 'Protein' },
};
