
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePeriod } from '@/providers/PeriodProvider';
import { format } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

const Symptoms = () => {
  const { userProfile } = usePeriod();
  const [view, setView] = useState<'all' | 'common'>('common');
  
  // Flatten all symptoms from all cycles
  const allSymptoms = userProfile.cycleHistory.flatMap(cycle => cycle.symptoms);
  
  // Group symptoms by type
  const symptomsByType = allSymptoms.reduce((acc, symptom) => {
    const type = symptom.type;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(symptom);
    return acc;
  }, {} as Record<string, typeof allSymptoms>);
  
  // Sort symptom types by frequency
  const sortedSymptomTypes = Object.keys(symptomsByType).sort(
    (a, b) => symptomsByType[b].length - symptomsByType[a].length
  );
  
  // Get common symptoms (top 5)
  const commonSymptomTypes = sortedSymptomTypes.slice(0, 5);

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-display font-bold text-periodpal-primary mb-2">
          Symptom Tracker
        </h1>
        <p className="text-muted-foreground mb-6">
          Track and analyze your symptoms throughout your menstrual cycle
        </p>

        <div className="mb-6 flex justify-between items-center">
          <Tabs value={view} onValueChange={(v) => setView(v as 'all' | 'common')}>
            <TabsList>
              <TabsTrigger value="common">Common Symptoms</TabsTrigger>
              <TabsTrigger value="all">All Symptoms</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(view === 'common' ? commonSymptomTypes : sortedSymptomTypes).map((type) => (
            <Card key={type} className="overflow-hidden">
              <CardHeader className="bg-periodpal-light/30 pb-3">
                <CardTitle className="capitalize text-lg">{type}</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-sm text-muted-foreground mb-2">
                  Occurred {symptomsByType[type].length} times
                </div>
                <ul className="space-y-2 max-h-[200px] overflow-y-auto">
                  {symptomsByType[type].map((symptom, index) => (
                    <li key={index} className="text-sm flex justify-between items-center">
                      <span>{format(new Date(symptom.date), 'MMM d, yyyy')}</span>
                      <span className="bg-periodpal-accent/20 px-2 py-1 rounded text-xs">
                        Intensity: {symptom.intensity}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}

          {(view === 'all' ? sortedSymptomTypes : commonSymptomTypes).length === 0 && (
            <div className="col-span-full">
              <Card className="p-6 text-center">
                <p className="text-muted-foreground">No symptoms recorded yet.</p>
              </Card>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Symptoms;
