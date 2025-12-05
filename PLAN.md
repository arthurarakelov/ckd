# CKD Food Scanner - Implementation Plan

## Quick Start for Claude Code

```bash
# 1. Initialize Next.js project
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"

# 2. Install dependencies
npm install @zxing/browser @zxing/library lucide-react
```

---

## Overview

Build a Next.js web app for CKD Stage 3 patients to scan food barcodes, track nutrients, and receive health warnings.

**User**: Elza Sato, 56yo female, CKD Stage 3, on Losartan/Aspirin/Propranolol

**Demo Flow**:
1. Home shows Elza already ate 1,500mg sodium (limit: 1,800mg)
2. Scan barcode → detects Pringles
3. Select "half can" → 600mg sodium → WARNING: over limit by 300mg
4. Show alternatives (carrot sticks) OR "have it anyway" → recovery plan
5. Second scan → Sweet Potato → Losartan + potassium = hyperkalemia warning
6. Symptom checklist appears

---

## File Structure

```
app/
├── layout.tsx              # Root layout with AppProvider
├── page.tsx                # Home dashboard
├── profile/page.tsx        # Health ID card
├── scan/page.tsx           # Camera scanner
├── scan-result/page.tsx    # Portion selector
├── analysis/page.tsx       # Warnings & recommendations  
├── daily-log/page.tsx      # Consumption history
└── globals.css

components/
├── layout/
│   ├── BottomNav.tsx
│   └── PageContainer.tsx
├── home/
│   ├── WelcomeHeader.tsx
│   ├── PriorityCards.tsx
│   ├── CKDSavingsCard.tsx
│   ├── WaterIntakeCard.tsx
│   ├── CKDSummaryCard.tsx
│   ├── DailyNutrientSummary.tsx
│   └── ScanFoodButton.tsx
├── scanner/
│   ├── BarcodeScanner.tsx
│   └── ScanningOverlay.tsx
├── food/
│   ├── FoodCard.tsx
│   ├── PortionSelector.tsx
│   └── NutritionBreakdown.tsx
├── warnings/
│   ├── SodiumWarning.tsx
│   ├── DrugInteractionWarning.tsx
│   ├── HyperkalemiaCheck.tsx
│   ├── AlternativesSuggestion.tsx
│   └── RecoveryPlan.tsx
└── ui/
    ├── Card.tsx
    ├── Button.tsx
    ├── ProgressBar.tsx
    └── NutrientGauge.tsx

context/
└── AppContext.tsx

data/
├── user-profile.ts
├── foods.ts
├── daily-log.ts
├── ckd-limits.ts
└── drug-interactions.ts

types/
└── index.ts
```

---

## Data Files

### `data/ckd-limits.ts`
```typescript
export const ckdStage3Limits = {
  sodium: { min: 1500, max: 2000, target: 1800, unit: 'mg', label: 'Sodium' },
  potassium: { min: 2000, max: 3000, target: 2500, unit: 'mg', label: 'Potassium' },
  phosphorus: { min: 700, max: 1000, target: 800, unit: 'mg', label: 'Phosphorus' },
  protein: { min: 36, max: 48, target: 42, unit: 'g', label: 'Protein' },
};
```

### `data/user-profile.ts`
```typescript
export const userProfile = {
  name: 'Elza Sato',
  demographics: {
    age: 56,
    dateOfBirth: '06/30/1969',
    gender: 'Female',
    height: "5'1\"",
    weight: '132 lb',
    bloodType: 'AB+',
  },
  ckdStage: 3,
  allergies: {
    medications: ['Penicillin', 'Ibuprofen'],
    foods: ['Hazelnuts', 'Peanuts'],
  },
  medications: [
    { name: 'Losartan', dosage: '50mg' },
    { name: 'Aspirin', dosage: '100mg' },
    { name: 'Propranolol', dosage: '10mg' },
  ],
  savings: { current: 62150, goal: 100000 },
};
```

### `data/foods.ts`
```typescript
export const foods = {
  pringles: {
    id: 'pringles',
    name: 'Pringles Original',
    servingSize: '150g (1 can)',
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
    nutrition: { sodium: 70, potassium: 542, phosphorus: 62, protein: 2, calories: 112 },
    portions: [
      { label: 'Whole potato', multiplier: 1 },
      { label: 'Half', multiplier: 0.5 },
    ],
    warnings: ['high-potassium', 'losartan-interaction'],
  },
};

export const alternativeSnacks = [
  { name: 'Carrot sticks', sodium: 15, potassium: 80 },
  { name: 'Apple slices', sodium: 0, potassium: 50 },
  { name: 'Unsalted rice cakes', sodium: 10, potassium: 20 },
];
```

### `data/daily-log.ts`
```typescript
export const todaysFoodLog = [
  {
    id: '1', time: '7:30 AM', mealType: 'breakfast', name: 'Oatmeal with banana',
    nutrition: { sodium: 300, potassium: 450, phosphorus: 180, protein: 12, calories: 350 },
  },
  {
    id: '2', time: '12:30 PM', mealType: 'lunch', name: 'Turkey sandwich',
    nutrition: { sodium: 1200, potassium: 400, phosphorus: 150, protein: 14, calories: 450 },
  },
  {
    id: '3', time: '3:00 PM', mealType: 'snack', name: 'Apple',
    nutrition: { sodium: 0, potassium: 195, phosphorus: 50, protein: 2, calories: 95 },
  },
];
// Daily totals BEFORE scanning: sodium=1500mg, potassium=1045mg
```

### `data/drug-interactions.ts`
```typescript
export const hyperkalemiaSymptoms = [
  { id: 'weakness', label: 'Muscle weakness or fatigue', severity: 'moderate' },
  { id: 'numbness', label: 'Numbness or tingling', severity: 'moderate' },
  { id: 'nausea', label: 'Nausea', severity: 'mild' },
  { id: 'heartbeat', label: 'Irregular heartbeat or palpitations', severity: 'severe' },
  { id: 'breathing', label: 'Difficulty breathing', severity: 'severe' },
];
```

---

## Tailwind Config

Add these custom colors to `tailwind.config.ts`:
```typescript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#EEF4FF', 100: '#E0EAFF', 500: '#3B6CB5', 600: '#2D5A9E', 700: '#1E4785',
      },
      accent: { light: '#E8F4FC', DEFAULT: '#6BA5D9' },
      warning: { light: '#FEF3C7', DEFAULT: '#F59E0B', dark: '#D97706' },
      danger: { light: '#FEE2E2', DEFAULT: '#EF4444', dark: '#DC2626' },
      success: { light: '#D1FAE5', DEFAULT: '#10B981', dark: '#059669' },
    },
  },
}
```

---

## Key Components

### BarcodeScanner.tsx
- Uses `@zxing/browser` for camera access
- When ANY barcode detected, call `simulateScan()` from context
- This alternates between pringles and sweetPotato
- Show scanning animation with corner brackets and moving line

### Analysis Page Logic
```typescript
// Check sodium warning
const projectedSodium = dailyTotals.sodium + foodNutrition.sodium;
const hasSodiumWarning = projectedSodium > 1800;

// Check drug interaction (Losartan + potassium > 400mg)
const hasLosartan = user.medications.some(m => m.name === 'Losartan');
const hasPotassiumWarning = hasLosartan && foodNutrition.potassium >= 400;

// Flow:
// 1. Show warnings
// 2. If "have it anyway" clicked:
//    - If potassium warning: show HyperkalemiaCheck first
//    - Then if sodium warning: show RecoveryPlan
// 3. On accept: add to food log, return home
```

### RecoveryPlan
If user goes over sodium limit:
- Calculate overAmount = projectedSodium - 1800
- Spread recovery over 3 days
- Each day: reduce limit by overAmount/3
- Example: Over by 300mg → next 3 days limit = 1700mg instead of 1800mg

### HyperkalemiaCheck
- Show symptom checkboxes
- If "severe" symptom selected (heartbeat, breathing): show critical message
- If "moderate/mild" symptoms: show monitoring message
- If none: proceed with food

---

## Page Implementations

### Home (app/page.tsx)
- WelcomeHeader: Blue gradient, "Hi there, Elza Sato", avatar
- PriorityCards: Daily rewards, Planning, Connect (3 columns)
- ScanFoodButton: Large primary button
- CKDSavingsCard: $62,150/$100K with progress bar
- DailyNutrientSummary: 4 NutrientGauges (sodium, potassium, phosphorus, protein)
- Grid: WaterIntakeCard + CKDSummaryCard

### Profile (app/profile/page.tsx)
- Blue gradient header with avatar
- QR code icon (placeholder)
- Cards: User ID (demographics), Allergies, Medications, Health conditions

### Scan (app/scan/page.tsx)
- Full screen camera view
- Corner bracket overlay with scanning line animation
- On barcode detect: show ScanningOverlay, delay 1.5s, navigate to scan-result
- Store detected food in sessionStorage

### Scan Result (app/scan-result/page.tsx)
- FoodCard showing detected item
- PortionSelector with options
- On select: calculate actual nutrition, store in sessionStorage, navigate to analysis

### Analysis (app/analysis/page.tsx)
- FoodCard with portion
- SodiumWarning (if applicable)
- DrugInteractionWarning (if applicable)
- HyperkalemiaCheck (if needed)
- NutritionBreakdown
- AlternativesSuggestion
- RecoveryPlan (if needed)
- Action buttons: "Choose alternative" / "I'll have it anyway" / "Accept plan"

### Daily Log (app/daily-log/page.tsx)
- Date header
- Current totals with NutrientGauges
- Food log entries with meal icons and nutrition info

---

## Context (AppContext.tsx)

```typescript
interface AppContextType {
  user: UserProfile;
  foodLog: FoodLogEntry[];
  dailyTotals: NutritionInfo;
  scannedFood: ScannedFood | null;
  scanCount: number;
  
  setScannedFood: (food: ScannedFood | null) => void;
  addFoodToLog: (entry: FoodLogEntry) => void;
  simulateScan: () => FoodItem; // Alternates pringles/sweetPotato
}
```

---

## Design Notes

- Mobile-first (max-w-md container)
- Rounded cards with subtle shadows
- Blue gradient headers (#3B6CB5 → #1E4785)
- Bottom navigation with floating scan button
- Progress bars show range (min-target-max)
- Warning cards: red border for danger, amber for warnings, green for success

---

## Vercel Deployment

1. Push to GitHub
2. Go to vercel.com, sign in with GitHub
3. Click "Add New" → "Project"
4. Select the repository
5. Click "Deploy" (no env vars needed)
6. Get URL like `ckd-xyz.vercel.app`

---

## Demo Script

**First Scan (Pringles):**
1. Home → "You've consumed 1,500mg sodium"
2. Tap "Scan Food"
3. Point at any barcode
4. "Pringles detected!" → Select "About half"
5. ⚠️ SODIUM WARNING: 2,100mg projected (over by 300mg)
6. Show carrot sticks as alternative
7. "I'll have it anyway" → Recovery Plan: 1,700mg limit for 3 days
8. Accept → Home shows updated totals

**Second Scan (Sweet Potato):**
1. Tap "Scan Food" again
2. Scan any barcode
3. "Sweet Potato detected!" → Select portion
4. ⚠️ MEDICATION ALERT: Losartan + 542mg potassium
5. "Are you experiencing symptoms?" checklist
6. Select "None of these" → Proceed
7. If select "Irregular heartbeat" → "Seek medical attention"
