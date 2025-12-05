import { UserProfile } from '@/types';

export const userProfile: UserProfile = {
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
