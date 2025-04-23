
import React from 'react';
import { MainLayout } from '@/components/layout/Sidebar';
import { CycleSummary } from '@/components/period/CycleSummary';
import { PeriodCalendar } from '@/components/period/PeriodCalendar';
import { TrackerForm } from '@/components/period/TrackerForm';
import { AIChatbot } from '@/components/period/AIChatbot';
import { usePeriod } from '@/providers/PeriodProvider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const { isLoading } = usePeriod();
  const isMobile = useIsMobile();

  if (isLoading) {
    return (
      <MainLayout>
        <div className="max-w-6xl mx-auto space-y-6">
          <Skeleton className="h-[200px] w-full rounded-lg" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Skeleton className="h-[400px] w-full rounded-lg" />
            <Skeleton className="h-[400px] w-full rounded-lg md:col-span-2" />
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-display font-bold text-periodpal-primary mb-2">
            Welcome to HerChronos
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Track your cycle, monitor symptoms, and gain insights about your menstrual health
          </p>
          {!isMobile && (
            <div className="mt-4">
              <span className="text-sm text-muted-foreground">New here?</span>{" "}
              <a
                href="/register"
                className="text-periodpal-primary underline font-medium hover:text-periodpal-primary/90"
              >
                Register
              </a>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="md:col-span-2">
            <CycleSummary />
            <PeriodCalendar />
          </div>
          <div>
            <Tabs defaultValue="tracker" className="w-full">
              <TabsList className="w-full mb-4">
                <TabsTrigger value="tracker" className="flex-1">Track Today</TabsTrigger>
                <TabsTrigger value="chat" className="flex-1">Ask HerChronos</TabsTrigger>
              </TabsList>
              <TabsContent value="tracker">
                <TrackerForm />
              </TabsContent>
              <TabsContent value="chat">
                <AIChatbot />
              </TabsContent>
            </Tabs>
            {isMobile && (
              <div className="mt-6 text-center">
                <span className="text-sm text-muted-foreground">New here?</span>{" "}
                <a
                  href="/register"
                  className="text-periodpal-primary underline font-medium hover:text-periodpal-primary/90"
                >
                  Register
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
