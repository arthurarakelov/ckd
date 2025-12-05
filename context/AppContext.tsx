'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserProfile, FoodLogEntry, NutritionInfo, ScannedFood, FoodItem } from '@/types';
import { userProfile } from '@/data/user-profile';
import { initialFoodLog } from '@/data/daily-log';
import { foods } from '@/data/foods';

interface AppContextType {
  user: UserProfile;
  foodLog: FoodLogEntry[];
  dailyTotals: NutritionInfo;
  scannedFood: ScannedFood | null;
  scanCount: number;
  needsSymptomCheck: boolean;

  setScannedFood: (food: ScannedFood | null) => void;
  addFoodToLog: (entry: FoodLogEntry, foodId?: string) => void;
  simulateScan: (isFreshProduce?: boolean, isShoppingMode?: boolean) => FoodItem;
  dismissSymptomCheck: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user] = useState<UserProfile>(userProfile);
  const [foodLog, setFoodLog] = useState<FoodLogEntry[]>(initialFoodLog);
  const [scannedFood, setScannedFood] = useState<ScannedFood | null>(null);
  const [scanCount, setScanCount] = useState(0);
  const [needsSymptomCheck, setNeedsSymptomCheck] = useState(false);

  // Calculate daily totals from food log
  const dailyTotals: NutritionInfo = foodLog.reduce(
    (totals, entry) => ({
      sodium: totals.sodium + entry.nutrition.sodium,
      potassium: totals.potassium + entry.nutrition.potassium,
      phosphorus: totals.phosphorus + entry.nutrition.phosphorus,
      protein: totals.protein + entry.nutrition.protein,
      calories: totals.calories + entry.nutrition.calories,
    }),
    { sodium: 0, potassium: 0, phosphorus: 0, protein: 0, calories: 0 }
  );

  const addFoodToLog = (entry: FoodLogEntry, foodId?: string) => {
    setFoodLog([...foodLog, entry]);

    // Check if this is a high-potassium food with drug interaction
    if (foodId === 'sweetPotato') {
      const hasLosartan = user.medications.some((m) => m.name === 'Losartan');
      if (hasLosartan) {
        setNeedsSymptomCheck(true);
      }
    }
  };

  const dismissSymptomCheck = () => {
    setNeedsSymptomCheck(false);
  };

  // Simulates scanning
  const simulateScan = (isFreshProduce = false, isShoppingMode = false): FoodItem => {
    // Shopping mode always returns wheat thins
    if (isShoppingMode) {
      return foods.wheatThins;
    }

    // Fresh produce (no barcode) always returns sweet potato
    if (isFreshProduce) {
      return foods.sweetPotato;
    }

    // Barcode scan always returns pringles (packaged food)
    return foods.pringles;
  };

  return (
    <AppContext.Provider
      value={{
        user,
        foodLog,
        dailyTotals,
        scannedFood,
        scanCount,
        needsSymptomCheck,
        setScannedFood,
        addFoodToLog,
        simulateScan,
        dismissSymptomCheck,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
