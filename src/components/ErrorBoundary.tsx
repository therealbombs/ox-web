import { Component, ErrorInfo, ReactNode } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
} from '@chakra-ui/react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <Container maxW="lg" py={10}>
          <VStack spacing={6} align="center">
            <Heading color="red.500">Oops!</Heading>
            <Text align="center">
              Si è verificato un errore imprevisto. Riprova più tardi.
            </Text>
            {this.state.error && (
              <Box
                p={4}
                bg="gray.100"
                borderRadius="md"
                width="100%"
                overflow="auto"
              >
                <Text fontFamily="mono" fontSize="sm">
                  {this.state.error.toString()}
                </Text>
              </Box>
            )}
            <Button
              colorScheme="brand"
              onClick={this.handleReload}
            >
              Ricarica la pagina
            </Button>
          </VStack>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
