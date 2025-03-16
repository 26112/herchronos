
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, ResponsiveContainer, XAxis, YAxis, Bar, Tooltip, Legend } from 'recharts';
import { usePeriod } from '@/providers/PeriodProvider';
import { format, differenceInDays } from 'date-fns';

export const CycleStats = () => {
  const { userProfile } = usePeriod();
  const { cycleHistory } = userProfile;

  // Prepare cycle length data for the chart
  const cycleLengthData = cycleHistory.slice(0, -1).map((cycle, index) => {
    let cycleLength = cycle.length;
    
    // Calculate actual cycle length if we have the next cycle's start date
    if (index < cycleHistory.length - 1) {
      cycleLength = differenceInDays(
        new Date(cycleHistory[index + 1].startDate),
        new Date(cycle.startDate)
      );
    }
    
    return {
      cycle: `Cycle ${index + 1}`,
      length: cycleLength,
      periodLength: cycle.periodLength,
      startDate: format(new Date(cycle.startDate), 'MMM d'),
    };
  });

  // Prepare symptom data
  const getSymptomData = () => {
    const symptomCounts: Record<string, number> = {};
    
    cycleHistory.forEach(cycle => {
      cycle.symptoms.forEach(symptom => {
        if (!symptomCounts[symptom.type]) {
          symptomCounts[symptom.type] = 0;
        }
        symptomCounts[symptom.type] += 1;
      });
    });
    
    return Object.entries(symptomCounts).map(([type, count]) => ({
      name: type.charAt(0).toUpperCase() + type.slice(1),
      count
    })).sort((a, b) => b.count - a.count).slice(0, 5);
  };

  // Prepare mood data
  const getMoodData = () => {
    const moodCounts: Record<string, number> = {};
    
    cycleHistory.forEach(cycle => {
      cycle.moods.forEach(mood => {
        if (!moodCounts[mood.type]) {
          moodCounts[mood.type] = 0;
        }
        moodCounts[mood.type] += 1;
      });
    });
    
    return Object.entries(moodCounts).map(([type, count]) => ({
      name: type.charAt(0).toUpperCase() + type.slice(1),
      count
    })).sort((a, b) => b.count - a.count).slice(0, 5);
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-display">Cycle Length Trends</CardTitle>
        </CardHeader>
        <CardContent>
          {cycleLengthData.length > 0 ? (
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={cycleLengthData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                >
                  <XAxis
                    dataKey="startDate" 
                    label={{ value: 'Cycle Start Date', position: 'insideBottom', offset: -10 }}
                  />
                  <YAxis 
                    label={{ value: 'Days', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip 
                    formatter={(value, name) => [`${value} days`, name === 'length' ? 'Cycle Length' : 'Period Length']}
                    labelFormatter={(label) => `Cycle starting ${label}`}
                  />
                  <Legend />
                  <Bar 
                    dataKey="length" 
                    name="Cycle Length" 
                    fill="#9b87f5" 
                    radius={[4, 4, 0, 0]} 
                  />
                  <Bar 
                    dataKey="periodLength" 
                    name="Period Length" 
                    fill="#FFDEE2" 
                    radius={[4, 4, 0, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">
              Not enough cycle data to display trends.
            </p>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-display">Top Symptoms</CardTitle>
          </CardHeader>
          <CardContent>
            {getSymptomData().length > 0 ? (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={getSymptomData()}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 70, bottom: 5 }}
                  >
                    <XAxis type="number" />
                    <YAxis 
                      type="category" 
                      dataKey="name" 
                      width={60}
                    />
                    <Tooltip formatter={(value) => [`${value} times`, 'Occurrences']} />
                    <Bar 
                      dataKey="count" 
                      name="Occurrences" 
                      fill="#7E69AB" 
                      radius={[0, 4, 4, 0]} 
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No symptom data available yet.
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-display">Mood Patterns</CardTitle>
          </CardHeader>
          <CardContent>
            {getMoodData().length > 0 ? (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={getMoodData()}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 70, bottom: 5 }}
                  >
                    <XAxis type="number" />
                    <YAxis 
                      type="category" 
                      dataKey="name" 
                      width={60}
                    />
                    <Tooltip formatter={(value) => [`${value} times`, 'Occurrences']} />
                    <Bar 
                      dataKey="count" 
                      name="Occurrences" 
                      fill="#D6BCFA" 
                      radius={[0, 4, 4, 0]} 
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No mood data available yet.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
