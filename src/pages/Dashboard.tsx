import { useEffect, useState } from 'react';
import {
  Box,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Card,
  CardBody,
  Heading,
  Spinner,
  Center,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import Layout from '../components/Layout';
import { getTotalBalance, getAccounts, Account } from '../services/api';

export default function Dashboard() {
  const { t } = useTranslation();
  const [totalBalance, setTotalBalance] = useState<number | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [balanceData, accountsData] = await Promise.all([
          getTotalBalance(),
          getAccounts(),
        ]);
        setTotalBalance(balanceData.totalBalance);
        setAccounts(accountsData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
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
          {t('dashboard.welcome')}
        </Heading>
        
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={{ base: 5, lg: 8 }}>
          <Card>
            <CardBody>
              <Stat>
                <StatLabel fontSize="lg">{t('dashboard.totalBalance')}</StatLabel>
                <StatNumber fontSize="3xl" color="brand.500">
                  €{totalBalance?.toLocaleString()}
                </StatNumber>
                <StatHelpText>
                  {accounts.length} {t('dashboard.accounts')}
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          {accounts.map((account) => (
            <Card key={account.accountId}>
              <CardBody>
                <Stat>
                  <StatLabel fontSize="lg">{account.accountType}</StatLabel>
                  <StatNumber fontSize="2xl" color="brand.500">
                    €{account.balance?.toLocaleString()}
                  </StatNumber>
                  <StatHelpText>{account.iban}</StatHelpText>
                </Stat>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </Box>
    </Layout>
  );
}
