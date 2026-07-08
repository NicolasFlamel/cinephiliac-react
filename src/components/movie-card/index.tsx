import { useEffect } from 'react';
import type { MovieWithStats } from '@/types';
import type { UseQueryResult } from '@tanstack/react-query';
import noImg from '@/assets/img/no-image-placeholder.png';
import { useMutateMoviePair } from '@/api';
import { removeMovieFromDB } from '@/lib/movie-db';
import { useGameState } from '@/context/game-context';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface MovieCardProps {
  movieData: UseQueryResult<MovieWithStats, Error>;
  showStat?: boolean;
}

const MovieCard = ({ movieData, showStat }: MovieCardProps) => {
  const { isError, error, isPending, data } = movieData;
  const { gameMode, gameGenre } = useGameState();
  const { mutate: changePair } = useMutateMoviePair(gameGenre);

  // if isError then change the movie
  useEffect(() => {
    if (isError) {
      if (typeof error.cause === 'string') {
        const imdbId = error.cause;
        removeMovieFromDB(imdbId);
        changePair(imdbId);
      } else console.error(error);
    }
  }, [isError, error, changePair]);

  // remove this pending and instead use it inside normal return
  if (isPending) return <h1>Loading stats</h1>;
  else if (isError) return <h1>Error, grabbing new movie</h1>;

  return (
    <Card>
      <CardHeader>
        <h2
          className={cn(
            'rounded-md p-2',
            showStat
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground',
          )}
        >
          {gameMode +
            ': ' +
            (showStat
              ? gameMode === 'Box-Office'
                ? data.boxOffice
                : data.rating || 'Loading'
              : '???')}
        </h2>
      </CardHeader>
      <CardContent className={'flex flex-col gap-4'}>
        <img
          width={300}
          height={400}
          src={data.posterUrl || noImg}
          alt={data.title + ' poster'}
          className={'h-100 w-75 rounded-md'}
        />
        <p className="row-start-3 mt-auto">{data.title}</p>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
