
import React from 'react';
import { MainLayout } from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePeriod } from '@/providers/PeriodProvider';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Insights = () => {
  const { userProfile } = usePeriod();
  const { cycleHistory } = userProfile;

  // Count symptoms by type
  const symptomCounts = cycleHistory.flatMap(cycle => cycle.symptoms)
    .reduce((acc, symptom) => {
      acc[symptom.type] = (acc[symptom.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const symptomData = Object.entries(symptomCounts)
    .map(([name, value]) => ({ name: name.charAt(0).toUpperCase() + name.slice(1), value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8); // Display top 8 symptoms

  // Count moods by type
  const moodCounts = cycleHistory.flatMap(cycle => cycle.moods)
    .reduce((acc, mood) => {
      acc[mood.type] = (acc[mood.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const moodData = Object.entries(moodCounts)
    .map(([name, value]) => ({ name: name.charAt(0).toUpperCase() + name.slice(1), value }));

  // Cycle length chart data
  const cycleLengthData = cycleHistory.map(cycle => ({
    id: cycle.id,
    length: cycle.length,
  }));

  // Colors for charts
  const COLORS = ['#FF8A80', '#EA80FC', '#8C9EFF', '#80D8FF', '#A7FFEB', '#CCFF90', '#FFD180', '#FF9E80'];

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-display font-bold text-periodpal-primary mb-2">
          Cycle Insights
        </h1>
        <p className="text-muted-foreground mb-6">
          Visualize patterns and trends in your menstrual health data
        </p>

        {cycleHistory.length > 0 ? (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Symptom Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      width={500}
                      height={300}
                      data={symptomData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#8884d8">
                        {symptomData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mood Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart width={400} height={400}>
                      <Pie
                        data={moodData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {moodData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {cycleLengthData.length > 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Cycle Length History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        width={500}
                        height={300}
                        data={cycleLengthData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="id" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="length" name="Cycle Length (days)" fill="#FF8A80" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          <Card className="p-6 text-center">
            <p className="text-muted-foreground mb-4">Not enough data to generate insights.</p>
            <p className="text-sm">Continue tracking your period and symptoms to see personalized insights.</p>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};

export default Insights;
