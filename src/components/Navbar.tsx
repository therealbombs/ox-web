import {
  Flex,
  IconButton,
  Text,
  useColorModeValue,
  FlexProps,
} from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';

interface NavbarProps extends FlexProps {
  onOpen: () => void;
}

export default function Navbar({ onOpen, ...rest }: NavbarProps) {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontWeight="bold"
        color="brand.500">
        OX Bank
      </Text>
    </Flex>
  );
}
