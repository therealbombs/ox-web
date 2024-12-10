import { Center, Spinner, SpinnerProps } from '@chakra-ui/react';

interface LoadingSpinnerProps extends SpinnerProps {
  fullScreen?: boolean;
}

export default function LoadingSpinner({ fullScreen, ...props }: LoadingSpinnerProps) {
  if (fullScreen) {
    return (
      <Center h="100vh">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="brand.500"
          size="xl"
          {...props}
        />
      </Center>
    );
  }

  return (
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="brand.500"
      {...props}
    />
  );
}
