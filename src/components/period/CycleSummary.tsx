
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format, differenceInDays, addDays } from 'date-fns';
import { usePeriod } from '@/providers/PeriodProvider';
import { Droplets, Calendar, LineChart } from 'lucide-react';

export const CycleSummary = () => {
  const { userProfile } = usePeriod();
  const { 
    averageCycleLength, 
    averagePeriodLength, 
    lastPeriodStart, 
    nextPeriodPrediction 
  } = userProfile;

  const today = new Date();
  const daysSinceLastPeriod = lastPeriodStart 
    ? differenceInDays(today, new Date(lastPeriodStart))
    : 0;
  
  const daysUntilNextPeriod = nextPeriodPrediction 
    ? differenceInDays(new Date(nextPeriodPrediction), today) 
    : 0;

  const cycleDay = (daysSinceLastPeriod % averageCycleLength) + 1;

  const getCyclePhase = (): { phase: string; color: string } => {
    if (!lastPeriodStart) return { phase: 'Unknown', color: 'bg-gray-500' };

    if (cycleDay <= averagePeriodLength) {
      return { phase: 'Menstrual', color: 'bg-pink-500' };
    } else if (cycleDay <= 7) {
      return { phase: 'Follicular', color: 'bg-purple-500' };
    } else if (cycleDay <= 14) {
      return { phase: 'Ovulatory', color: 'bg-indigo-500' };
    } else {
      return { phase: 'Luteal', color: 'bg-blue-500' };
    }
  };

  const { phase, color } = getCyclePhase();

  if (!lastPeriodStart) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl font-display">Cycle Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No period data available yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-display">Cycle Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-periodpal-light rounded-lg p-4 flex flex-col items-center justify-center">
            <div className="mb-2 text-periodpal-primary">
              <Droplets className="h-8 w-8" />
            </div>
            <p className="text-sm text-gray-500">Current Cycle Day</p>
            <p className="text-2xl font-bold">{cycleDay}</p>
          </div>
          
          <div className="bg-periodpal-light rounded-lg p-4 flex flex-col items-center justify-center">
            <div className="mb-2 text-periodpal-primary">
              <Calendar className="h-8 w-8" />
            </div>
            <p className="text-sm text-gray-500">Days Until Next Period</p>
            <p className="text-2xl font-bold">{daysUntilNextPeriod}</p>
          </div>

          <div className="bg-periodpal-light rounded-lg p-4 flex flex-col items-center justify-center">
            <div className="mb-2 text-periodpal-primary">
              <LineChart className="h-8 w-8" />
            </div>
            <p className="text-sm text-gray-500">Avg. Cycle Length</p>
            <p className="text-2xl font-bold">{averageCycleLength} days</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Current Phase</span>
              <Badge className={color}>{phase}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              You are in your {phase.toLowerCase()} phase, day {cycleDay} of your cycle.
            </p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Last Period</span>
            </div>
            <p className="text-sm">
              Started on {format(new Date(lastPeriodStart), 'MMMM do')} ({daysSinceLastPeriod} days ago)
            </p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Next Period</span>
            </div>
            <p className="text-sm">
              Expected on {format(new Date(nextPeriodPrediction!), 'MMMM do')} (in {daysUntilNextPeriod} days)
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
