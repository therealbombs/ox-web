import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';

const LoginForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    clientId: '',
    abi: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(formData);
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: t('login.error'),
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Box as="form" onSubmit={handleSubmit} width="100%" maxWidth="400px">
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>{t('login.clientId')}</FormLabel>
          <Input
            name="clientId"
            value={formData.clientId}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>{t('login.abi')}</FormLabel>
          <Input
            name="abi"
            value={formData.abi}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>{t('login.password')}</FormLabel>
          <Input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
        </FormControl>

        <Button
          type="submit"
          width="100%"
          isLoading={isLoading}
          colorScheme="brand"
        >
          {t('login.submit')}
        </Button>
      </VStack>
    </Box>
  );
};

export default LoginForm;
