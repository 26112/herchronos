
import React, { createContext, useState, useContext, useEffect } from 'react';
import { UserProfile, CycleData, Mood, Symptom } from '@/types/period';
import useLocalStorage from '@/hooks/useLocalStorage';
import { generateMockProfile, updatePredictions } from '@/services/periodUtils';
import { addDays, format } from 'date-fns';
import { toast } from '@/hooks/use-toast';

interface PeriodContextType {
  userProfile: UserProfile;
  isLoading: boolean;
  updateProfile: (data: Partial<UserProfile>) => void;
  addCycle: (cycle: Omit<CycleData, 'id'>) => void;
  addMood: (mood: Mood) => void;
  addSymptom: (symptom: Symptom) => void;
  getCurrentPeriodDates: () => Date[];
}

const PeriodContext = createContext<PeriodContextType | undefined>(undefined);

export const PeriodProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useLocalStorage<UserProfile>('periodpal-user-profile', generateMockProfile());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => setIsLoading(false), 800);
  }, []);

  // Schedule notifications for upcoming period
  useEffect(() => {
    if (userProfile.nextPeriodPrediction) {
      const nextPeriod = new Date(userProfile.nextPeriodPrediction);
      const today = new Date();
      const threeDaysBefore = addDays(nextPeriod, -3);
      
      // If three days before next period, show notification
      if (format(today, 'yyyy-MM-dd') === format(threeDaysBefore, 'yyyy-MM-dd')) {
        toast({
          title: "Period Reminder",
          description: `Your next period is expected to start in 3 days, on ${format(nextPeriod, 'MMMM do')}.`,
          duration: 5000,
        });
      }
    }
  }, [userProfile.nextPeriodPrediction]);

  const updateProfile = (data: Partial<UserProfile>) => {
    setUserProfile((prev) => {
      const updatedProfile = { ...prev, ...data };
      return updatePredictions(updatedProfile);
    });
  };

  const addCycle = (cycle: Omit<CycleData, 'id'>) => {
    setUserProfile((prev) => {
      const newCycle: CycleData = {
        ...cycle,
        id: Date.now().toString(),
      };
      
      const updatedProfile = {
        ...prev,
        cycleHistory: [...prev.cycleHistory, newCycle],
        lastPeriodStart: cycle.startDate,
        lastPeriodEnd: cycle.endDate,
      };
      
      return updatePredictions(updatedProfile);
    });
  };

  const addMood = (mood: Mood) => {
    setUserProfile((prev) => {
      // Find the current cycle to add the mood to
      const updatedCycleHistory = [...prev.cycleHistory];
      const currentCycleIndex = updatedCycleHistory.length - 1;
      
      if (currentCycleIndex >= 0) {
        const currentCycle = { ...updatedCycleHistory[currentCycleIndex] };
        currentCycle.moods = [...currentCycle.moods, mood];
        updatedCycleHistory[currentCycleIndex] = currentCycle;
      }
      
      return {
        ...prev,
        cycleHistory: updatedCycleHistory,
      };
    });
  };

  const addSymptom = (symptom: Symptom) => {
    setUserProfile((prev) => {
      // Find the current cycle to add the symptom to
      const updatedCycleHistory = [...prev.cycleHistory];
      const currentCycleIndex = updatedCycleHistory.length - 1;
      
      if (currentCycleIndex >= 0) {
        const currentCycle = { ...updatedCycleHistory[currentCycleIndex] };
        currentCycle.symptoms = [...currentCycle.symptoms, symptom];
        updatedCycleHistory[currentCycleIndex] = currentCycle;
      }
      
      return {
        ...prev,
        cycleHistory: updatedCycleHistory,
      };
    });
  };

  const getCurrentPeriodDates = (): Date[] => {
    if (!userProfile.lastPeriodStart) return [];
    
    const dates: Date[] = [];
    const startDate = new Date(userProfile.lastPeriodStart);
    const periodLength = userProfile.averagePeriodLength || 5;
    
    for (let i = 0; i < periodLength; i++) {
      dates.push(addDays(startDate, i));
    }
    
    return dates;
  };

  return (
    <PeriodContext.Provider
      value={{
        userProfile,
        isLoading,
        updateProfile,
        addCycle,
        addMood,
        addSymptom,
        getCurrentPeriodDates,
      }}
    >
      {children}
    </PeriodContext.Provider>
  );
};

export const usePeriod = () => {
  const context = useContext(PeriodContext);
  if (context === undefined) {
    throw new Error('usePeriod must be used within a PeriodProvider');
  }
  return context;
};
