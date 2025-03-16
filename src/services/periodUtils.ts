
import { addDays, subDays, differenceInDays } from 'date-fns';
import { CycleData, UserProfile } from '@/types/period';

// Calculate average cycle length from history
export const calculateAverageCycleLength = (cycleHistory: CycleData[]): number => {
  if (cycleHistory.length < 2) return 28; // Default to 28 days if not enough data
  
  const sum = cycleHistory
    .slice(0, -1) // Exclude the most recent cycle as it might be ongoing
    .reduce((acc, cycle, index, array) => {
      if (index < array.length - 1) {
        const nextCycle = array[index + 1];
        const cycleDuration = differenceInDays(nextCycle.startDate, cycle.startDate);
        return acc + cycleDuration;
      }
      return acc;
    }, 0);
  
  return Math.round(sum / (cycleHistory.length - 2));
};

// Calculate average period length from history
export const calculateAveragePeriodLength = (cycleHistory: CycleData[]): number => {
  if (cycleHistory.length === 0) return 5; // Default to 5 days if no data
  
  const sum = cycleHistory.reduce((acc, cycle) => acc + cycle.periodLength, 0);
  return Math.round(sum / cycleHistory.length);
};

// Predict next period date
export const predictNextPeriod = (lastPeriodStart: Date, averageCycleLength: number): Date => {
  return addDays(lastPeriodStart, averageCycleLength);
};

// Predict ovulation date (typically 14 days before the next period)
export const predictOvulation = (nextPeriodDate: Date): Date => {
  return subDays(nextPeriodDate, 14);
};

// Calculate fertile window (typically 5 days before ovulation until 1 day after)
export const calculateFertileWindow = (ovulationDate: Date): { start: Date, end: Date } => {
  return {
    start: subDays(ovulationDate, 5),
    end: addDays(ovulationDate, 1)
  };
};

// Generate dates for the current period
export const generatePeriodDates = (
  startDate: Date, 
  periodLength: number
): Date[] => {
  const dates: Date[] = [];
  for (let i = 0; i < periodLength; i++) {
    dates.push(addDays(startDate, i));
  }
  return dates;
};

// Update user profile with predictions
export const updatePredictions = (profile: UserProfile): UserProfile => {
  if (!profile.lastPeriodStart) return profile;
  
  const updatedProfile = { ...profile };
  
  // Calculate next period date
  updatedProfile.nextPeriodPrediction = predictNextPeriod(
    profile.lastPeriodStart, 
    profile.averageCycleLength
  );
  
  // Calculate ovulation date
  updatedProfile.ovulationPrediction = predictOvulation(
    updatedProfile.nextPeriodPrediction
  );
  
  // Calculate fertile window
  if (updatedProfile.ovulationPrediction) {
    updatedProfile.fertileDays = calculateFertileWindow(
      updatedProfile.ovulationPrediction
    );
  }
  
  return updatedProfile;
};

// Mock data for initial testing
export const generateMockProfile = (): UserProfile => {
  const today = new Date();
  const lastPeriodStart = subDays(today, 15);
  const lastPeriodEnd = addDays(lastPeriodStart, 5);
  
  const mockProfile: UserProfile = {
    averageCycleLength: 28,
    averagePeriodLength: 5,
    cycleHistory: [
      {
        id: '1',
        startDate: subDays(lastPeriodStart, 56),
        endDate: subDays(lastPeriodStart, 51),
        length: 28,
        periodLength: 5,
        symptoms: [],
        moods: []
      },
      {
        id: '2',
        startDate: subDays(lastPeriodStart, 28),
        endDate: subDays(lastPeriodStart, 23),
        length: 28,
        periodLength: 5,
        symptoms: [],
        moods: []
      },
      {
        id: '3',
        startDate: lastPeriodStart,
        endDate: lastPeriodEnd,
        length: 28,
        periodLength: 5,
        symptoms: [],
        moods: []
      }
    ],
    lastPeriodStart,
    lastPeriodEnd
  };
  
  return updatePredictions(mockProfile);
};
