
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { MainLayout } from "./components/layout/Sidebar";
import { AIChatbot } from "./components/period/AIChatbot";
import CalendarPage from "./pages/Calendar";
import CycleHistory from "./pages/CycleHistory";
import Symptoms from "./pages/Symptoms";
import Mood from "./pages/Mood";
import Health from "./pages/Health";
import Insights from "./pages/Insights";
import Resources from "./pages/Resources";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/chat" element={
            <MainLayout>
              <div className="max-w-4xl mx-auto py-6">
                <h1 className="text-3xl font-display font-bold text-periodpal-primary mb-6">
                  Ask PeriodPal
                </h1>
                <AIChatbot />
              </div>
            </MainLayout>
          } />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/history" element={<CycleHistory />} />
          <Route path="/symptoms" element={<Symptoms />} />
          <Route path="/mood" element={<Mood />} />
          <Route path="/health" element={<Health />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/resources" element={<Resources />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
