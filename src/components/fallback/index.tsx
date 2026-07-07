import { Link } from 'react-router';
import { Card, CardBody, CardFooter, CardHeader, Divider } from '@heroui/react';

interface ErrorProps extends React.HTMLAttributes<HTMLElement> {
  error: Error;
}

const Fallback = ({ error }: ErrorProps) => {
  console.error('Error component', error);
  const isError = error instanceof Error;

  return (
    <section className="flex justify-center">
      <Card className="m-12 grid justify-center text-center">
        <CardHeader className="grid grid-rows-2 justify-center gap-4">
          <h1 className="text-2xl">Oops!</h1>
          <p>Sorry, an unexpected error has occurred.</p>
        </CardHeader>
        <Divider />
        <CardBody>
          <p>{isError && <i>Error: {error.message}</i>}</p>
        </CardBody>
        <Divider />
        <CardFooter className="justify-center">
          <Link to={'/'}>Go Home</Link>
        </CardFooter>
      </Card>
    </section>
  );
};

export default Fallback;
