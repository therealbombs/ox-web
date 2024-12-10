import { ReactNode } from 'react';
import {
  Box,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
} from '@chakra-ui/react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

interface LayoutProps extends BoxProps {
  children: ReactNode;
}

export default function Layout({ children, ...rest }: LayoutProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg="gray.100">
      <Sidebar
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <Sidebar onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <Navbar onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4" {...rest}>
        {children}
      </Box>
    </Box>
  );
}
