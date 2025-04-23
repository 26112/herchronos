import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
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
import Settings from "./pages/Settings";
import { ThemeProvider } from "./providers/ThemeProvider";
import { initDatabase } from "./services/databaseService";
import Register from "./pages/Register";
import { ProtectedRoute } from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    initDatabase().then(success => {
      if (success) {
        console.log("Database initialized successfully");
      } else {
        console.error("Failed to initialize database");
      }
    });

    document.addEventListener('backbutton', handleBackButton, false);

    const isCapacitor = window.matchMedia('(display-mode: standalone)').matches || 
                        window.navigator.standalone || 
                        window.location.href.includes('?forceHideBadge=true');
    
    if (isCapacitor) {
      document.documentElement.classList.add('capacitor-app');
      document.body.style.overscrollBehavior = 'none';
    }

    return () => {
      document.removeEventListener('backbutton', handleBackButton);
    };
  }, []);

  const handleBackButton = () => {
    const { pathname } = window.location;
    if (pathname === '/') {
      return false;
    }
    return true;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/register" element={<Register />} />
              <Route 
                path="/" 
                element={
                  <ProtectedRoute>
                    <Index />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/chat" 
                element={
                  <ProtectedRoute>
                    <MainLayout>
                      <div className="max-w-4xl mx-auto py-4 md:py-6">
                        <h1 className="text-2xl md:text-3xl font-display font-bold text-periodpal-primary mb-4 md:mb-6">
                          Ask HerChronos
                        </h1>
                        <AIChatbot />
                      </div>
                    </MainLayout>
                  </ProtectedRoute>
                } 
              />
              <Route path="/calendar" element={<ProtectedRoute><CalendarPage /></ProtectedRoute>} />
              <Route path="/history" element={<ProtectedRoute><CycleHistory /></ProtectedRoute>} />
              <Route path="/symptoms" element={<ProtectedRoute><Symptoms /></ProtectedRoute>} />
              <Route path="/mood" element={<ProtectedRoute><Mood /></ProtectedRoute>} />
              <Route path="/health" element={<ProtectedRoute><Health /></ProtectedRoute>} />
              <Route path="/insights" element={<ProtectedRoute><Insights /></ProtectedRoute>} />
              <Route path="/resources" element={<ProtectedRoute><Resources /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
