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

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

interface LinkItemProps {
  name: string;
  icon: React.ComponentType<any>;
  path: string;
}

const HomeIcon = (props: any) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
    />
  </Icon>
);

const CreditCardIcon = (props: any) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M21 4H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H3V6h18v12z"
    />
  </Icon>
);

const LogoutIcon = (props: any) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"
    />
  </Icon>
);

export default function Sidebar({ onClose, ...rest }: SidebarProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const LinkItems: Array<LinkItemProps> = [
    { name: t('dashboard.menu.dashboard'), icon: HomeIcon, path: '/dashboard' },
    { name: t('dashboard.menu.accounts'), icon: CreditCardIcon, path: '/accounts' },
    { name: t('dashboard.menu.logout'), icon: LogoutIcon, path: '/logout' },
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
