export interface NutritionInfo {
  sodium: number;
  potassium: number;
  phosphorus: number;
  protein: number;
  calories: number;
}

export interface NutrientLimit {
  min: number;
  max: number;
  target: number;
  unit: string;
  label: string;
}

export interface Portion {
  label: string;
  multiplier: number;
}

export interface FoodItem {
  id: string;
  name: string;
  servingSize: string;
  emoji?: string;
  nutrition: NutritionInfo;
  portions: Portion[];
  warnings: string[];
}

export interface FoodLogEntry {
  id: string;
  time: string;
  mealType: string;
  name: string;
  nutrition: NutritionInfo;
}

export interface Medication {
  name: string;
  dosage: string;
}

export interface UserProfile {
  name: string;
  demographics: {
    age: number;
    dateOfBirth: string;
    gender: string;
    height: string;
    weight: string;
    bloodType: string;
  };
  ckdStage: number;
  allergies: {
    medications: string[];
    foods: string[];
  };
  medications: Medication[];
  savings: {
    current: number;
    goal: number;
  };
}

export interface ScannedFood {
  food: FoodItem;
  portion: Portion;
  actualNutrition: NutritionInfo;
}

export interface AlternativeSnack {
  name: string;
  sodium: number;
  potassium: number;
}

export interface HyperkalemiaSymptom {
  id: string;
  label: string;
  severity: 'mild' | 'moderate' | 'severe';
}
