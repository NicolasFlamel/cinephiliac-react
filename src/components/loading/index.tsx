import { Spinner } from '@/components/ui/spinner';

interface LoadingProps extends React.HTMLAttributes<HTMLElement> {
  value?: number;
}

export const Loading = ({ children }: LoadingProps) => {
  return (
    <section className="grid justify-center p-4">
      <Spinner className="mx-auto size-12" aria-label="Loading..." />
      <section>{children}</section>
    </section>
  );
};
