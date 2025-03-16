
import React from 'react';
import { MainLayout } from '@/components/layout/Sidebar';
import { PeriodCalendar } from '@/components/period/PeriodCalendar';
import { TrackerForm } from '@/components/period/TrackerForm';

const CalendarPage = () => {
  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-display font-bold text-periodpal-primary mb-2">
          Period Calendar
        </h1>
        <p className="text-muted-foreground mb-6">
          View and track your menstrual cycle, fertile window, and important dates
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <PeriodCalendar />
          </div>
          <div>
            <TrackerForm />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CalendarPage;
