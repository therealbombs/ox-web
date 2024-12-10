import {
  Box,
  Container,
  Heading,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import LoginForm from '../components/LoginForm';

export default function Login() {
  const { t } = useTranslation();

  return (
    <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
      <VStack spacing="8">
        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={{ base: 'none', sm: 'md' }}
          borderRadius={{ base: 'none', sm: 'xl' }}
          width="100%"
        >
          <VStack spacing="6">
            <Heading size="lg" color="brand.700">
              {t('login.title')}
            </Heading>
            <LoginForm />
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}
