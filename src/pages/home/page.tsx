import { useNavigate } from 'react-router';
import { genres, gameModes } from './data';
import { useGameDispatch, useGameState } from '@/context/game-context';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Field, FieldLabel } from '@/components/ui/field';
import { isGameGenreType, isGameModeType } from '@/types';

interface FormElements extends HTMLFormControlsCollection {
  game: HTMLInputElement;
  genre: HTMLInputElement;
}

interface YourFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export const HomePage = () => {
  const navigate = useNavigate();
  const { gameGenre, gameMode } = useGameState();
  const { setGameGenre, setGameMode } = useGameDispatch();

  const formSubmitHandler = (e: React.SubmitEvent<YourFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const gameMode = formData.get('game');
    const gameGenre = formData.get('genre');

    if (!isGameModeType(gameMode) || !isGameGenreType(gameGenre)) return;

    setGameMode(gameMode);
    setGameGenre(gameGenre);
    navigate('/game');
  };

  return (
    <main>
      <Card className={'max-w-xl m-auto'}>
        <CardHeader>
          <CardTitle>Welcome to Cinephiliac!</CardTitle>
          <CardDescription>
            <p>
              A simple higher/lower game based on movie data. Guess if the
              second movie's stats are HIGHER or LOWER than the first. Each
              correct answer gives you one point and your final score will be
              saved locally to teh scoreboard.
            </p>
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent>
          <form
            id="game-form"
            onSubmit={formSubmitHandler}
            className={'grid grid-cols-2 gap-8'}
          >
            <Field>
              <FieldLabel htmlFor={'game'}>Select a mode</FieldLabel>
              <Select
                id={'game'}
                name={'game'}
                items={gameModes}
                defaultValue={gameMode}
              >
                <SelectTrigger className={'w-full'}>
                  <SelectValue placeholder={'Select a mode'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Game mode</SelectLabel>
                    {gameModes.map(({ label, value }) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel htmlFor={'genre'}>Select a genre</FieldLabel>
              <Select
                id={'genre'}
                name={'genre'}
                items={genres}
                defaultValue={gameGenre}
              >
                <SelectTrigger className={'w-full'}>
                  <SelectValue placeholder={'Select a genre'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Game genre</SelectLabel>
                    {genres.map(({ label, value }) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          </form>
        </CardContent>
        <CardFooter className={'flex-col'}>
          <Button type="submit" form={'game-form'} className="w-full">
            Start
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
};
