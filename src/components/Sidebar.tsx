import {
  Box,
  CloseButton,
  Flex,
  Icon,
  Text,
  BoxProps,
  VStack,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiHome, FiCreditCard, FiLogOut } from 'react-icons/fi';

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

interface LinkItemProps {
  name: string;
  icon: any;
  path: string;
}

export default function Sidebar({ onClose, ...rest }: SidebarProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const LinkItems: Array<LinkItemProps> = [
    { name: t('dashboard.menu.dashboard'), icon: FiHome, path: '/dashboard' },
    { name: t('dashboard.menu.accounts'), icon: FiCreditCard, path: '/accounts' },
    { name: t('dashboard.menu.logout'), icon: FiLogOut, path: '/logout' },
  ];

  const handleNavigation = (path: string) => {
    if (path === '/logout') {
      localStorage.removeItem('token');
      navigate('/login');
    } else {
      navigate(path);
    }
  };

  return (
    <Box
      bg="white"
      borderRight="1px"
      borderRightColor="gray.200"
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontWeight="bold" color="brand.500">
          OX Bank
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      <VStack spacing={4} align="stretch" mt={4}>
        {LinkItems.map((link) => (
          <Box
            key={link.name}
            p={3}
            mx={4}
            borderRadius="md"
            cursor="pointer"
            bg={location.pathname === link.path ? 'brand.50' : 'transparent'}
            color={location.pathname === link.path ? 'brand.500' : 'gray.600'}
            _hover={{
              bg: 'brand.50',
              color: 'brand.500',
            }}
            onClick={() => handleNavigation(link.path)}
          >
            <Flex align="center">
              <Icon as={link.icon} mr={3} />
              <Text>{link.name}</Text>
            </Flex>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
