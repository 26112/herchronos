
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { PeriodProvider } from './providers/PeriodProvider'

createRoot(document.getElementById("root")!).render(
  <PeriodProvider>
    <App />
  </PeriodProvider>
);
