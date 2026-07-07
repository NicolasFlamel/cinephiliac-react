import type { GameModeType, ScoreData } from '@/types';
import useLocalScores from '@/hooks/use-local-scores';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export const ScoreboardPage = () => {
  const { scores, deleteScore } = useLocalScores();

  const boxOfficeScores = scores.filter(
    (score) => score.gameMode === 'Box-Office',
  );
  const ratingsScores = scores.filter((score) => score.gameMode === 'Ratings');
  const board = [
    ['Box-Office', boxOfficeScores],
    ['Ratings', ratingsScores],
  ] as const;

  return (
    <main className={'flex flex-col gap-8 mx-4'}>
      {board.map(([mode, boardScores]) => (
        <section
          key={mode}
          className={'flex flex-col gap-4 max-h-[min(100vh,500px)] py-4'}
        >
          <h2 className="text-2xl font-bold text-inherit">
            {mode === 'Box-Office' ? 'Box Office Mode' : 'Ratings Mode'}
          </h2>
          <ScoreTable
            mode={mode}
            scores={boardScores}
            deleteScore={deleteScore}
          />
        </section>
      ))}
    </main>
  );
};

type ScoreTableProps = {
  mode: GameModeType;
  scores: ScoreData[];
  deleteScore: (id: string) => void;
};

const ScoreTable = ({ mode, scores, deleteScore }: ScoreTableProps) => {
  const handleDelete = (id: string) => () => {
    deleteScore(id);
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'score', label: 'Score' },
    { key: 'genre', label: 'Genre' },
    { key: 'action', label: 'Action' },
  ];

  return (
    <Table aria-label={mode + ' scores'}>
      <TableHeader>
        <TableRow>
          {columns.map(({ key, label }) => (
            <TableHead key={key}>{label}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {scores
          .filter((score) => score.gameMode === mode)
          .map((score) => (
            <TableRow key={score.id}>
              <TableCell>{score.username}</TableCell>
              <TableCell>{score.score}</TableCell>
              <TableCell>{score.gameGenre}</TableCell>
              <TableCell>
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={handleDelete(score.id)}
                >
                  <Trash2 />
                  <span className="sr-only">Delete</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};
