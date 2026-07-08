import { ModeToggle } from '@/components/mode-toggle';
import { LinkBtn } from '@/components/ui/link';
import { cn } from '@/lib/utils';

export const Header = () => {
  return (
    <header className={'bg-card text-card-foreground w-full border-b p-2'}>
      <div
        className={cn(
          'm-auto flex max-w-5xl flex-wrap gap-4',
          'md:grid md:grid-cols-3',
        )}
      >
        <h1 className="w-full text-2xl font-bold">Cinephiliac</h1>
        <nav className={'flex justify-center gap-2'}>
          <LinkBtn to={'/'}>Home</LinkBtn>
          <LinkBtn to={'/scoreboard'}>Scoreboard</LinkBtn>
        </nav>
        <ModeToggle className={'ml-auto'} />
      </div>
    </header>
  );
};

export default Header;
