import { lazy, Suspense, useRef } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GameProvider } from '@/context/game-context';
import { Header } from '@/components/header';
import { Loading } from '@/components/loading';

const HomePage = lazy(() => import('./pages/home/home-page'));
const GamePage = lazy(() => import('./pages/game/game-page'));
const ScoreboardPage = lazy(() => import('./pages/scoreboard/scoreboard-page'));

const queryClient = new QueryClient();

function App() {
  const score = useRef<number>(0);

  return (
    <section className="flex min-h-screen flex-col gap-8">
      <Header />
      <Suspense fallback={<Loading>Loading...</Loading>}>
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
      </Suspense>
    </section>
  );
}

export default App;
