
import React, { useState } from 'react';
import { CustomCalendar } from '@/components/ui/CustomCalendar';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { format, isToday, isSameMonth, addMonths } from 'date-fns';
import { Droplets, Calendar as CalendarIcon, AlertCircle } from 'lucide-react';
import { usePeriod } from '@/providers/PeriodProvider';

export const PeriodCalendar = () => {
  const { userProfile, getCurrentPeriodDates } = usePeriod();
  const [month, setMonth] = useState<Date>(new Date());

  const periodDates = getCurrentPeriodDates();
  const { ovulationPrediction, fertileDays, nextPeriodPrediction } = userProfile;

  // Add console.log to debug
  console.log("Period Calendar Data:", {
    periodDates,
    ovulationPrediction,
    fertileDays,
    nextPeriodPrediction
  });

  const handleMonthChange = (increment: number) => {
    setMonth(prev => addMonths(prev, increment));
  };

  return (
    <Card className="w-full mb-6">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-display">Cycle Calendar</CardTitle>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setMonth(new Date())}
            >
              Today
            </Button>
            <Select
              value={format(month, 'MMMM-yyyy')}
              onValueChange={(value) => {
                const [monthName, year] = value.split('-');
                const date = new Date(parseInt(year), new Date(`${monthName} 1, 2000`).getMonth(), 1);
                setMonth(date);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent>
                {Array(12).fill(0).map((_, i) => {
                  const date = new Date(month.getFullYear(), i, 1);
                  return (
                    <SelectItem 
                      key={i} 
                      value={format(date, 'MMMM-yyyy')}
                    >
                      {format(date, 'MMMM yyyy')}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>
        <CardDescription>
          Track your period, fertile window, and ovulation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md p-4 bg-secondary">
          <div className="mb-4 flex justify-between items-center">
            <Button 
              variant="ghost" 
              onClick={() => handleMonthChange(-1)}
              size="sm"
            >
              Previous
            </Button>
            <h3 className="text-lg font-semibold">
              {format(month, 'MMMM yyyy')}
            </h3>
            <Button 
              variant="ghost" 
              onClick={() => handleMonthChange(1)}
              size="sm"
            >
              Next
            </Button>
          </div>
          
          <CustomCalendar 
            mode="single"
            month={month}
            onMonthChange={setMonth}
            periodDates={periodDates.map(date => new Date(date))}
            ovulationDate={ovulationPrediction ? new Date(ovulationPrediction) : undefined}
            fertileDays={fertileDays ? {
              start: new Date(fertileDays.start),
              end: new Date(fertileDays.end)
            } : undefined}
            showOutsideDays
            className="rounded-md"
          />
          
          <div className="mt-4 flex justify-center space-x-6">
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-periodpal-pink mr-2"></div>
              <span className="text-sm">Period</span>
            </div>
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-periodpal-accent mr-2"></div>
              <span className="text-sm">Ovulation</span>
            </div>
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-periodpal-light mr-2"></div>
              <span className="text-sm">Fertile Window</span>
            </div>
          </div>
        </div>

        {nextPeriodPrediction && (
          <div className="mt-4 p-4 rounded-md bg-periodpal-light flex items-start space-x-3">
            <Droplets className="h-5 w-5 text-periodpal-primary mt-0.5" />
            <div>
              <h4 className="font-medium">Next Period Expected</h4>
              <p className="text-sm text-gray-700">
                Your next period is expected to start on {format(new Date(nextPeriodPrediction), 'EEEE, MMMM do')}
              </p>
            </div>
          </div>
        )}
        
        {ovulationPrediction && isSameMonth(new Date(ovulationPrediction), month) && (
          <div className="mt-2 p-4 rounded-md bg-periodpal-accent/30 flex items-start space-x-3">
            <CalendarIcon className="h-5 w-5 text-periodpal-secondary mt-0.5" />
            <div>
              <h4 className="font-medium">Ovulation Day</h4>
              <p className="text-sm text-gray-700">
                {isToday(new Date(ovulationPrediction)) 
                  ? "Today is your ovulation day"
                  : `Your ovulation day is ${format(new Date(ovulationPrediction), 'EEEE, MMMM do')}`
                }
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
