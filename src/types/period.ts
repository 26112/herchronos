
export interface PeriodDay {
  date: Date;
  flow?: 'light' | 'medium' | 'heavy';
}

export interface CycleData {
  id: string;
  startDate: Date;
  endDate: Date;
  length: number;
  periodLength: number;
  symptoms: Symptom[];
  moods: Mood[];
  notes?: string;
}

export interface Mood {
  date: Date;
  type: 'happy' | 'sad' | 'irritated' | 'anxious' | 'energetic' | 'tired' | 'emotional' | 'neutral';
  intensity: 1 | 2 | 3;
  notes?: string;
}

export interface Symptom {
  date: Date;
  type: 'cramps' | 'headache' | 'bloating' | 'backPain' | 'breastTenderness' | 'acne' | 'fatigue' | 'cravings' | 'nausea' | 'spotting' | 'insomnia' | 'other';
  intensity: 1 | 2 | 3;
  notes?: string;
}

export interface UserProfile {
  averageCycleLength: number;
  averagePeriodLength: number;
  cycleHistory: CycleData[];
  lastPeriodStart?: Date;
  lastPeriodEnd?: Date;
  nextPeriodPrediction?: Date;
  ovulationPrediction?: Date;
  fertileDays?: { start: Date, end: Date };
}
