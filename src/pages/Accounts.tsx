import { useEffect, useState } from 'react';
import {
  Box,
  SimpleGrid,
  Card,
  CardBody,
  Heading,
  Text,
  VStack,
  Spinner,
  Center,
  useColorModeValue,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Layout from '../components/Layout';
import { getAccounts, Account } from '../services/api';

export default function Accounts() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const cardBg = useColorModeValue('white', 'gray.700');
  const cardHoverBg = useColorModeValue('gray.50', 'gray.600');

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const data = await getAccounts();
        setAccounts(data);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  if (isLoading) {
    return (
      <Layout>
        <Center h="100vh">
          <Spinner size="xl" color="brand.500" />
        </Center>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box maxW="7xl" mx="auto" pt={5} px={{ base: 2, sm: 12, md: 17 }}>
        <Heading mb={6} color="brand.700">
          {t('dashboard.accounts')}
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={{ base: 5, lg: 8 }}>
          {accounts.map((account) => (
            <Card
              key={account.accountId}
              bg={cardBg}
              _hover={{
                bg: cardHoverBg,
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
                cursor: 'pointer',
              }}
              transition="all 0.2s"
              onClick={() => navigate(`/accounts/${account.accountId}`)}
            >
              <CardBody>
                <VStack align="stretch" spacing={3}>
                  <Text fontSize="lg" fontWeight="bold" color="brand.500">
                    {account.accountType}
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    {account.accountNumber}
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    {account.iban}
                  </Text>
                  <Text fontSize="xl" fontWeight="bold">
                    €{account.balance?.toLocaleString()}
                  </Text>
                  <Text fontSize="sm" color={account.status === 'ACTIVE' ? 'green.500' : 'red.500'}>
                    {account.status}
                  </Text>
                </VStack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </Box>
    </Layout>
  );
}
