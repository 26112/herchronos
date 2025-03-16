
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePeriod } from '@/providers/PeriodProvider';
import { format } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Mood = () => {
  const { userProfile } = usePeriod();
  const [view, setView] = useState<'all' | 'common'>('common');
  
  // Flatten all moods from all cycles
  const allMoods = userProfile.cycleHistory.flatMap(cycle => cycle.moods);
  
  // Group moods by type
  const moodsByType = allMoods.reduce((acc, mood) => {
    const type = mood.type;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(mood);
    return acc;
  }, {} as Record<string, typeof allMoods>);
  
  // Sort mood types by frequency
  const sortedMoodTypes = Object.keys(moodsByType).sort(
    (a, b) => moodsByType[b].length - moodsByType[a].length
  );
  
  // Get common moods (top 5)
  const commonMoodTypes = sortedMoodTypes.slice(0, 5);

  // Get emoji for mood
  const getMoodEmoji = (type: string) => {
    const emojiMap: Record<string, string> = {
      'happy': '😊',
      'sad': '😔',
      'irritated': '😠',
      'anxious': '😰',
      'energetic': '✨',
      'tired': '😴',
      'emotional': '😢',
      'neutral': '😐',
    };
    
    return emojiMap[type] || '🙂';
  };

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-display font-bold text-periodpal-primary mb-2">
          Mood Tracker
        </h1>
        <p className="text-muted-foreground mb-6">
          Track and analyze your moods throughout your menstrual cycle
        </p>

        <div className="mb-6 flex justify-between items-center">
          <Tabs value={view} onValueChange={(v) => setView(v as 'all' | 'common')}>
            <TabsList>
              <TabsTrigger value="common">Common Moods</TabsTrigger>
              <TabsTrigger value="all">All Moods</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(view === 'common' ? commonMoodTypes : sortedMoodTypes).map((type) => (
            <Card key={type} className="overflow-hidden">
              <CardHeader className="bg-periodpal-light/30 pb-3">
                <CardTitle className="capitalize text-lg flex items-center gap-2">
                  <span className="text-2xl">{getMoodEmoji(type)}</span>
                  {type}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-sm text-muted-foreground mb-2">
                  Occurred {moodsByType[type].length} times
                </div>
                <ul className="space-y-2 max-h-[200px] overflow-y-auto">
                  {moodsByType[type].map((mood, index) => (
                    <li key={index} className="text-sm flex justify-between items-center">
                      <span>{format(new Date(mood.date), 'MMM d, yyyy')}</span>
                      <span className="bg-periodpal-accent/20 px-2 py-1 rounded text-xs">
                        Intensity: {mood.intensity}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}

          {(view === 'all' ? sortedMoodTypes : commonMoodTypes).length === 0 && (
            <div className="col-span-full">
              <Card className="p-6 text-center">
                <p className="text-muted-foreground">No moods recorded yet.</p>
              </Card>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Mood;
