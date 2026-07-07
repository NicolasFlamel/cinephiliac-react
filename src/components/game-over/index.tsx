import { useState, type ChangeEventHandler } from 'react';
import { useNavigate } from 'react-router';
import type { GameProps } from '@/types';
import { addScore } from '@/hooks/use-local-scores';
import { useGameState } from '@/context/game-context';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export const GameOver = ({ score }: GameProps) => {
  const { gameGenre, gameMode } = useGameState();
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleInputChange: ChangeEventHandler<
    HTMLInputElement,
    HTMLInputElement
  > = (e) => {
    setUsername(e.currentTarget.value);
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!username) return;

    const userScore = {
      id: crypto.randomUUID(),
      gameMode,
      gameGenre,
      score: score.current,
      username,
    };

    addScore(userScore);
    navigate('/scoreboard');
  };

  return (
    <Card className={'mx-auto w-lg'}>
      <CardHeader className={'justify-center'}>
        <CardTitle className={'text-6xl'}>Game over!</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className={'flex flex-col items-center'}>
        <p className={'text-3xl my-8'}>
          Final Score: <span className={'text-primary'}>{score.current}</span>
        </p>
        <div className="text-xl grid grid-cols-2 gap-2">
          <span>Game:</span>
          <span>{gameMode === 'Box-Office' ? 'Box Office' : 'Ratings'}</span>

          <span>Genre:</span>
          <span>{gameGenre === 'All-Genres' ? 'All Genres' : gameGenre}</span>
        </div>
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSubmit} className={'flex flex-col gap-4 w-full'}>
          <Label htmlFor={'username'}>
            <span className="sr-only">Username</span>
          </Label>
          <Input
            id={'username'}
            type="text"
            name={'username'}
            onChange={handleInputChange}
            placeholder={'Username*'}
            required
          />
          <Button type="submit">Submit</Button>
        </form>
      </CardFooter>
    </Card>
  );
};
