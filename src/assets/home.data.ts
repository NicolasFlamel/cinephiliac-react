import type { GameGenreType, GameModeType } from '@/types';

type GameModesListType = Array<{ label: string; value: GameModeType }>;
type GenresListType = Array<{ label: string; value: GameGenreType }>;

export const gameModes: GameModesListType = [
  { label: 'Box Office Mode', value: 'Box-Office' },
  { label: 'Ratings Mode', value: 'Ratings' },
];

export const genres: GenresListType = [
  { label: 'All Genres', value: 'All-Genres' },
  { label: 'Action', value: 'Action' },
  { label: 'Animation', value: 'Animation' },
  { label: 'Comedy', value: 'Comedy' },
  { label: 'Crime', value: 'Crime' },
  { label: 'Family', value: 'Family' },
  { label: 'Horror', value: 'Horror' },
  { label: 'Romance', value: 'Romance' },
  { label: 'Sci-Fi', value: 'Science Fiction' },
  { label: 'Thriller', value: 'Thriller' },
];
