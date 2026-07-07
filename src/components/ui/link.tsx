import type { ComponentProps } from 'react';
import { Link } from 'react-router';
import { buttonVariants } from './button';
import type { VariantProps } from 'class-variance-authority';

export const LinkBtn = ({
  children,
  className,
  variant = 'link',
  size = 'default',
  ...props
}: ComponentProps<typeof Link> & VariantProps<typeof buttonVariants>) => {
  return (
    <Link {...props} className={buttonVariants({ variant, size, className })}>
      {children}
    </Link>
  );
};
