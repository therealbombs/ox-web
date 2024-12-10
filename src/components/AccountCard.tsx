import {
  Card,
  CardBody,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { Account } from '../services/api';

interface AccountCardProps {
  account: Account;
  onClick?: () => void;
}

export default function AccountCard({ account, onClick }: AccountCardProps) {
  const cardBg = useColorModeValue('white', 'gray.700');
  const cardHoverBg = useColorModeValue('gray.50', 'gray.600');

  return (
    <Card
      bg={cardBg}
      _hover={{
        bg: cardHoverBg,
        transform: 'translateY(-2px)',
        boxShadow: 'lg',
        cursor: 'pointer',
      }}
      transition="all 0.2s"
      onClick={onClick}
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
  );
}
