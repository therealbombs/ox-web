import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Card,
  CardBody,
  Heading,
  Text,
  VStack,
  Spinner,
  Center,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import Layout from '../components/Layout';
import { getAccountBalance, Account } from '../services/api';

export default function AccountDetail() {
  const { t } = useTranslation();
  const { accountId } = useParams();
  const [account, setAccount] = useState<Account | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAccount = async () => {
      if (!accountId) return;
      try {
        const data = await getAccountBalance(accountId);
        setAccount(data);
      } catch (error) {
        console.error('Error fetching account:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccount();
  }, [accountId]);

  if (isLoading) {
    return (
      <Layout>
        <Center h="100vh">
          <Spinner size="xl" color="brand.500" />
        </Center>
      </Layout>
    );
  }

  if (!account) {
    return (
      <Layout>
        <Center h="100vh">
          <Text>Account not found</Text>
        </Center>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box maxW="7xl" mx="auto" pt={5} px={{ base: 2, sm: 12, md: 17 }}>
        <Card mb={6}>
          <CardBody>
            <VStack spacing={4} align="stretch">
              <Heading size="lg" color="brand.700">
                {t('account.details')}
              </Heading>
              
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <GridItem>
                  <Text fontWeight="bold">{t('account.accountNumber')}</Text>
                  <Text>{account.accountNumber}</Text>
                </GridItem>
                
                <GridItem>
                  <Text fontWeight="bold">{t('account.type')}</Text>
                  <Text>{account.accountType}</Text>
                </GridItem>
                
                <GridItem>
                  <Text fontWeight="bold">{t('account.iban')}</Text>
                  <Text>{account.iban}</Text>
                </GridItem>
                
                <GridItem>
                  <Text fontWeight="bold">{t('account.status')}</Text>
                  <Text>{account.status}</Text>
                </GridItem>
                
                <GridItem colSpan={2}>
                  <Text fontWeight="bold" fontSize="xl" color="brand.500">
                    {t('account.balance')}
                  </Text>
                  <Text fontSize="2xl">€{account.balance?.toLocaleString()}</Text>
                </GridItem>
              </Grid>
            </VStack>
          </CardBody>
        </Card>
      </Box>
    </Layout>
  );
}
