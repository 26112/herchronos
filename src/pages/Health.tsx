
import React from 'react';
import { MainLayout } from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePeriod } from '@/providers/PeriodProvider';
import { format } from 'date-fns';
import { Heart, Activity, Calendar, Droplets } from 'lucide-react';

const Health = () => {
  const { userProfile } = usePeriod();
  
  // Generate some health metrics based on the user profile
  const cycleRegularity = userProfile.cycleHistory.length >= 3 ? 'Regular' : 'Tracking in progress';
  const periodDuration = `${userProfile.averagePeriodLength} days`;
  const averageCycleLength = `${userProfile.averageCycleLength} days`;
  
  // Count total symptoms
  const totalSymptoms = userProfile.cycleHistory.reduce(
    (acc, cycle) => acc + cycle.symptoms.length, 0
  );
  
  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-display font-bold text-periodpal-primary mb-2">
          Health Overview
        </h1>
        <p className="text-muted-foreground mb-6">
          Track your menstrual health metrics and overall wellbeing
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Cycle Length</p>
                  <h3 className="text-2xl font-bold">{averageCycleLength}</h3>
                </div>
                <Calendar className="h-8 w-8 text-periodpal-secondary opacity-80" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Period Duration</p>
                  <h3 className="text-2xl font-bold">{periodDuration}</h3>
                </div>
                <Droplets className="h-8 w-8 text-periodpal-primary opacity-80" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Cycle Regularity</p>
                  <h3 className="text-2xl font-bold">{cycleRegularity}</h3>
                </div>
                <Activity className="h-8 w-8 text-green-500 opacity-80" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Recorded Symptoms</p>
                  <h3 className="text-2xl font-bold">{totalSymptoms}</h3>
                </div>
                <Heart className="h-8 w-8 text-red-500 opacity-80" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Cycle Health Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-periodpal-secondary mb-1">Current Cycle</h3>
                <p className="text-sm">
                  {userProfile.lastPeriodStart ? (
                    `Your last period started on ${format(new Date(userProfile.lastPeriodStart), 'MMMM do, yyyy')}.`
                  ) : (
                    "No period data recorded yet."
                  )}
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-periodpal-secondary mb-1">Next Period</h3>
                <p className="text-sm">
                  {userProfile.nextPeriodPrediction ? (
                    `Your next period is expected to start around ${format(new Date(userProfile.nextPeriodPrediction), 'MMMM do, yyyy')}.`
                  ) : (
                    "Not enough data to predict your next period."
                  )}
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-periodpal-secondary mb-1">Fertility Window</h3>
                <p className="text-sm">
                  {userProfile.fertileDays ? (
                    `Your fertile window is from ${format(new Date(userProfile.fertileDays.start), 'MMMM do')} to ${format(new Date(userProfile.fertileDays.end), 'MMMM do, yyyy')}.`
                  ) : (
                    "Not enough data to predict your fertile window."
                  )}
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-periodpal-secondary mb-1">Ovulation</h3>
                <p className="text-sm">
                  {userProfile.ovulationPrediction ? (
                    `Your ovulation is predicted to occur around ${format(new Date(userProfile.ovulationPrediction), 'MMMM do, yyyy')}.`
                  ) : (
                    "Not enough data to predict your ovulation."
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Health Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="text-sm flex items-start gap-2">
                <span className="bg-green-100 text-green-800 p-1 rounded">•</span>
                <span>Keep tracking your cycle to improve prediction accuracy.</span>
              </li>
              <li className="text-sm flex items-start gap-2">
                <span className="bg-green-100 text-green-800 p-1 rounded">•</span>
                <span>Stay hydrated during your period to reduce bloating and cramps.</span>
              </li>
              <li className="text-sm flex items-start gap-2">
                <span className="bg-green-100 text-green-800 p-1 rounded">•</span>
                <span>Gentle exercise can help alleviate menstrual pain and improve mood.</span>
              </li>
              <li className="text-sm flex items-start gap-2">
                <span className="bg-green-100 text-green-800 p-1 rounded">•</span>
                <span>Consider taking iron-rich foods during your period to prevent anemia.</span>
              </li>
              <li className="text-sm flex items-start gap-2">
                <span className="bg-green-100 text-green-800 p-1 rounded">•</span>
                <span>If you experience severe pain or unusually heavy bleeding, consult a healthcare provider.</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Health;
