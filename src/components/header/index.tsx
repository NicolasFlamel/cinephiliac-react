import { ModeToggle } from '@/components/mode-toggle';
import { LinkBtn } from '@/components/ui/link';
import { cn } from '@/lib/utils';

export const Header = () => {
  return (
    <header className={cn('flex flex-wrap gap-4', 'md:grid md:grid-cols-3')}>
      <h1 className="text-2xl font-bold w-full">Cinephiliac</h1>
      <nav className={'flex gap-2 justify-center'}>
        <LinkBtn to={'/'}>Home</LinkBtn>
        <LinkBtn to={'/scoreboard'}>Scoreboard</LinkBtn>
      </nav>
      <ModeToggle className={'ml-auto'} />
    </header>
  );
};

export default Header;
