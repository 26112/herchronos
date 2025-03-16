
import React from 'react';
import { MainLayout } from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePeriod } from '@/providers/PeriodProvider';
import { format } from 'date-fns';
import { Calendar, Droplets } from 'lucide-react';

const CycleHistory = () => {
  const { userProfile } = usePeriod();
  const { cycleHistory } = userProfile;

  // Sort cycles by start date (newest first)
  const sortedCycles = [...cycleHistory].sort((a, b) => 
    new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-display font-bold text-periodpal-primary mb-2">
          Cycle History
        </h1>
        <p className="text-muted-foreground mb-6">
          Review your past menstrual cycles and track patterns over time
        </p>

        <div className="space-y-6">
          {sortedCycles.map((cycle) => (
            <Card key={cycle.id} className="overflow-hidden">
              <CardHeader className="bg-periodpal-light/30 pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Droplets className="h-5 w-5 text-periodpal-primary" />
                    <span>Cycle: {format(new Date(cycle.startDate), 'MMM d')} - {format(new Date(cycle.endDate), 'MMM d, yyyy')}</span>
                  </CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{cycle.length} days total • {cycle.periodLength} days period</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-2 text-periodpal-secondary">Symptoms</h3>
                    {cycle.symptoms.length > 0 ? (
                      <ul className="space-y-2">
                        {cycle.symptoms.map((symptom, index) => (
                          <li key={index} className="flex justify-between text-sm">
                            <span className="font-medium">{symptom.type}</span>
                            <span className="text-muted-foreground">
                              {format(new Date(symptom.date), 'MMM d')} • Intensity: {symptom.intensity}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">No symptoms recorded</p>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium mb-2 text-periodpal-secondary">Moods</h3>
                    {cycle.moods.length > 0 ? (
                      <ul className="space-y-2">
                        {cycle.moods.map((mood, index) => (
                          <li key={index} className="flex justify-between text-sm">
                            <span className="font-medium">{mood.type}</span>
                            <span className="text-muted-foreground">
                              {format(new Date(mood.date), 'MMM d')} • Intensity: {mood.intensity}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">No moods recorded</p>
                    )}
                  </div>
                </div>
                {cycle.notes && (
                  <div className="mt-4 pt-4 border-t">
                    <h3 className="font-medium mb-2">Notes</h3>
                    <p className="text-sm">{cycle.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}

          {cycleHistory.length === 0 && (
            <Card className="p-6 text-center">
              <p className="text-muted-foreground">No cycle history available yet.</p>
            </Card>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default CycleHistory;
