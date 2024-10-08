import { useEffect } from 'react';
import { MovieWithStats } from 'types';
import { Image } from '@nextui-org/react';
import { UseQueryResult } from '@tanstack/react-query';
import noImg from 'assets/img/no-image-placeholder.png';
import { useMutateMoviePair } from 'api';
import { removeMovieFromDB } from 'utils/MovieDB';
import { useGameState } from 'context/GameContext';

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
    <section className="grid grid-rows-[auto max-content auto] gap-4">
      <h2 className="row-start-1">
        {gameMode +
          ': ' +
          (showStat
            ? gameMode === 'Box-Office'
              ? data.boxOffice
              : data.rating || 'Loading'
            : '???')}
      </h2>
      <Image
        width={300}
        height={400}
        className="row-start-2"
        src={isPending ? undefined : data.posterUrl || noImg}
        alt={data.title + ' poster'}
      />
      <h2 className="mt-auto row-start-3">{data.title}</h2>
    </section>
  );
};

export default MovieCard;
