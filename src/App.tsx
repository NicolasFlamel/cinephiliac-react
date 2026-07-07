import { useRef, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GameProvider } from '@/context/game-context';
import { Header } from '@/components/header';
import { HomePage } from './pages/home/page';
import { GamePage } from './pages/game/page';
import { ScoreboardPage } from './pages/scoreboard/page';

const queryClient = new QueryClient();

function App() {
  const score = useRef<number>(0);
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  const [darkMode, setDarkMode] = useState(isDarkMode);
  const docClassList = document.documentElement.classList;

  if (darkMode) docClassList.add('dark');
  else docClassList.remove('dark');

  return (
    <div className="App grid min-h-screen sm:grid-rows-[0.3fr_auto_1fr]">
      <div className="container mx-auto min-h-150 max-w-5xl bg-foreground-200 p-4 sm:row-start-2">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <GameProvider>
                  <HomePage />
                </GameProvider>
              }
            />
            <Route
              path="/game"
              element={
                <GameProvider>
                  <QueryClientProvider client={queryClient}>
                    <GamePage score={score} />
                  </QueryClientProvider>
                </GameProvider>
              }
            />
            <Route path="/scoreboard" element={<ScoreboardPage />} />
            <Route path="/*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
