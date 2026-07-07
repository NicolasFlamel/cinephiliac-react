import { useEffect, useState } from 'react';
import type { GameProps } from '@/types';
import {
  useGetMovieList,
  useMutateNextMovie,
  useMutateRemovePair,
} from '@/api';
import { useGameState } from '@/context/game-context';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { GameOver } from '@/components/game-over';
import { Loading } from '@/components/loading';
import { Fallback } from '@/components/fallback';
import { MovieMotion } from '@/components/movie-motion';
import { ArrowBigUp, ArrowBigDown } from 'lucide-react';

export const GamePage = ({ score }: GameProps) => {
  const {
    gameMode,
    gameIsOver,
    listQuery,
    pairQuery,
    firstMovie,
    secondMovie,
    handleAnswerClick,
  } = useGame(score);

  // conditional rendering
  if (gameIsOver) return <GameOver score={score} />;
  else if (listQuery.isPending) return <Loading>Fetching Movies</Loading>;
  else if (listQuery.isError) return <Fallback error={listQuery.error} />;
  else if (pairQuery.isPending) return <Loading>Getting Movie Pair</Loading>;
  else if (pairQuery.isError) return <Fallback error={pairQuery.error} />;

  return (
    <main className="flex flex-col gap-8 items-center w-full max-w-3xl mx-auto my-8">
      <h2 className="max-w-max text-center">
        Does <em> {pairQuery.data[1].title} </em>
        have a higher or lower {gameMode} amount than
        <em> {pairQuery.data[0].title}</em>?
      </h2>
      <MovieMotion
        moviePair={[firstMovie, secondMovie]}
        backupData={pairQuery.data}
        className="grid divide-y-large md:grid-cols-2 md:gap-4 md:divide-y-0"
      />
      <section className={'flex gap-8'}>
        <Button
          variant={'default'}
          onClick={() => handleAnswerClick('>')}
          className={
            'bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:text-zinc-950 dark:hover:bg-emerald-400'
          }
        >
          <ArrowBigUp data-icon={'inline-start'} />
          Higher
        </Button>
        <Button
          variant={'default'}
          onClick={() => handleAnswerClick('<')}
          className={
            'bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:text-zinc-950 dark:hover:bg-red-400'
          }
        >
          <ArrowBigDown data-icon={'inline-start'} />
          Lower
        </Button>
      </section>
    </main>
  );
};

const useGame = (score: GameProps['score']) => {
  const qClient = useQueryClient();
  const { gameGenre, gameMode } = useGameState();
  const [gameIsOver, setGameIsOver] = useState(false);
  const [listQuery, pairQuery, [firstMovie, secondMovie]] =
    useGetMovieList(gameGenre);
  const { mutate: nextMovie } = useMutateNextMovie(gameGenre);
  const { mutate: removePair } = useMutateRemovePair(gameGenre);

  useEffect(() => {
    score.current = 0;

    return () => {
      // clear the pair cache so wont appear on next game
      const queryKey = ['moviePair', gameGenre];
      qClient.resetQueries({ queryKey, exact: true });
    };
  }, [score, gameGenre, qClient]);

  useEffect(() => {
    if (!pairQuery.data) return;

    removePair();
  }, [pairQuery.data, removePair]);

  const compareMovies = (choice: '>' | '<') => {
    const compareFunction = {
      '>': (secondStat: number, firstStat: number) => {
        return secondStat > firstStat;
      },
      '<': (secondStat: number, firstStat: number) => {
        return secondStat < firstStat;
      },
    };

    if (firstMovie.isLoading || secondMovie.isLoading) return;
    else if (firstMovie.isError || secondMovie.isError) return;
    else if (!firstMovie.data || !secondMovie.data) return;

    const [firstStat, secondStat] = [firstMovie, secondMovie].map(({ data }) =>
      gameMode === 'Box-Office'
        ? Number(data.boxOffice.match(/\d+/g)?.join(''))
        : Number(data.rating),
    );

    return compareFunction[choice](secondStat, firstStat);
  };

  const handleAnswerClick = (choice: '>' | '<') => {
    if (!compareMovies(choice)) return gameOver();

    score.current++;

    if (!listQuery.data) throw new Error('listQuery.data undefined');

    if (listQuery.data.length > 0) {
      nextMovie();
    } else {
      gameOver();
    }
  };

  const gameOver = () => {
    setGameIsOver(true);
  };

  return {
    gameGenre,
    gameMode,
    gameIsOver,
    listQuery,
    pairQuery,
    firstMovie,
    secondMovie,
    handleAnswerClick,
  };
};
