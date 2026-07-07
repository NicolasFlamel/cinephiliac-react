import { AnimatePresence, Reorder } from 'framer-motion';
import MovieCard from '@/components/movie-card';
import type { UseQueryResult } from '@tanstack/react-query';
import type { MoviePair, MovieWithStats } from '@/types';

interface MovieMotionProps extends React.HTMLAttributes<HTMLElement> {
  moviePair: [
    UseQueryResult<MovieWithStats, Error>,
    UseQueryResult<MovieWithStats, Error>,
  ];
  backupData: MoviePair;
}

export const MovieMotion = (props: MovieMotionProps) => {
  const { moviePair, backupData, className } = props;
  const reorderAnimationProps = {
    initial: {
      x: 100,
      y: -200,
      opacity: 0,
    },
    animate: {
      x: 0,
      y: 0,
      opacity: 1,
    },
    exit: { x: -100, y: 200, opacity: 0 },
    transition: { duration: 0.8 },
  } as const;

  return (
    <Reorder.Group
      as="section"
      values={moviePair}
      onReorder={() => {}}
      className={className}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {moviePair.map((movie, index) => {
          return (
            <Reorder.Item
              as="article"
              key={movie.data?.imdbId || backupData[index].imdbId}
              value={movie.data?.imdbId || backupData[index].imdbId}
              {...reorderAnimationProps}
              drag={false}
              className="grid justify-items-center gap-4 p-4 text-center"
            >
              <MovieCard movieData={movie} showStat={!index} />
            </Reorder.Item>
          );
        })}
      </AnimatePresence>
    </Reorder.Group>
  );
};

export default MovieMotion;
