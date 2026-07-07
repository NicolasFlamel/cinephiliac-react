import { type ChangeEvent, useState } from 'react';
import { Link, useLocation } from 'react-router';
import type { Dispatcher } from '@/types';
import Sun from 'assets/img/sun.svg';
import Moon from 'assets/img/moon.svg';
import { Icon } from '@/components';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Switch,
} from '@heroui/react';

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  darkMode: boolean;
  setDarkMode: Dispatcher<boolean>;
}

type UpdateThemeParam = ChangeEvent<HTMLInputElement>;

const Header = ({ darkMode, setDarkMode }: HeaderProps) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const svgStyle: React.CSSProperties = { width: '1em' };

  const updateTheme = ({ currentTarget }: UpdateThemeParam) => {
    const { checked } = currentTarget;
    localStorage.setItem('darkMode', checked.toString());
    setDarkMode(checked);
  };

  return (
    <Navbar
      className="mb-4"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      shouldHideOnScroll
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden"
        />
        <NavbarBrand>
          <h1 className="text-2xl font-bold text-inherit">Cinephiliac</h1>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden flex-wrap gap-4 sm:flex"
        justify="center"
      >
        <NavbarItem isActive={location.pathname === '/'}>
          <Link href={'/'}>Home</Link>
        </NavbarItem>
        <NavbarItem isActive={location.pathname === '/scoreboard'}>
          <Link href={'/scoreboard'}>Scoreboard</Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end" className="hidden flex-wrap gap-4 sm:flex">
        <NavbarItem className="flex flex-wrap">
          <Switch
            size="lg"
            isSelected={darkMode}
            startContent={<Icon src={Sun} />}
            endContent={<Icon src={Moon} />}
            onChange={updateTheme}
          />
        </NavbarItem>
      </NavbarContent>

      {/* Navbar mobile menu */}
      <NavbarMenu className="m-4 w-auto gap-8 p-4">
        <NavbarMenuItem>
          <Link to={'/'} size="lg" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            to={'/scoreboard'}
            size="lg"
            onClick={() => setIsMenuOpen(false)}
          >
            Scoreboard
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Switch
            size="lg"
            isSelected={darkMode}
            startContent={<img src={Sun} style={svgStyle} />}
            endContent={<img src={Moon} style={svgStyle} />}
            onChange={updateTheme}
          />
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;
