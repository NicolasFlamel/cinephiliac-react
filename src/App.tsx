import { useRef } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GameProvider } from '@/context/game-context';
import { Header } from '@/components/header';
import { HomePage } from './pages/home/page';
import { ScoreboardPage } from './pages/scoreboard/page';
import { GamePage } from './pages/game/page';

const queryClient = new QueryClient();

function App() {
  const score = useRef<number>(0);

  return (
    <section className="flex min-h-screen flex-col gap-8">
      <Header />
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
        *
        <Route path="/scoreboard" element={<ScoreboardPage />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </section>
  );
}

export default App;
