import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/index.css';
import { HashRouter } from 'react-router';
import App from '@/App.tsx';

document.documentElement.className = 'text-foreground bg-background';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
);
