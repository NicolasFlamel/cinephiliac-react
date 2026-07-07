import { useRef } from 'react';
import { useNavigate } from 'react-router';
import type { GameProps } from '@/types';
import { addScore } from '@/hooks/use-local-scores';
import { useGameState } from '@/context/game-context';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '../ui/separator';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const GameOver = ({ score }: GameProps) => {
  const { gameGenre, gameMode } = useGameState();
  const username = useRef('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (username.current === '') return;

    const userScore = {
      id: crypto.randomUUID(),
      gameMode,
      gameGenre,
      score: score.current,
      username: username.current,
    };

    addScore(userScore);
    navigate('/scoreboard');
  };

  return (
    <section className="flex justify-center">
      <Card className="inline-block justify-center gap-4">
        <CardHeader>
          <p>Game over!</p>
        </CardHeader>
        <Separator />
        <CardContent id="score" className="grid gap-4">
          {/* display results */}
          <section>
            <p>You're score was: {score.current}</p>
            <p>
              Game mode: {gameMode === 'Box-Office' ? 'Box Office' : 'Ratings'}
            </p>
            <p>
              Genre: {gameGenre === 'All-Genres' ? 'All Genres' : gameGenre}
            </p>
          </section>
          <section id="user-info">
            {/* user inputs info for scoreboard */}
            <form
              onSubmit={handleSubmit}
              className="flex w-full flex-wrap gap-4 md:flex-nowrap"
            >
              <Label htmlFor={'username'}>Username</Label>
              <Input
                id={'username'}
                type="text"
                name="username"
                onChange={(e) => (username.current = e.target.value)}
                required
              />
              <Button className="m-auto" type="submit" id="save-btn">
                Submit
              </Button>
            </form>
          </section>
        </CardContent>
      </Card>
    </section>
  );
};

export default GameOver;
