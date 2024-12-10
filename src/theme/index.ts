import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      50: '#f7fafc',
      100: '#edf2f7',
      500: '#1a365d',
      600: '#2a4365',
      700: '#1a365d',
      800: '#153e75',
      900: '#1a365d',
    },
  },
  styles: {
    global: {
      'html, body': {
        height: '100%',
        width: '100%',
      },
      '#root': {
        height: '100%',
        width: '100%',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
      },
      variants: {
        solid: {
          bg: 'brand.500',
          color: 'white',
          _hover: {
            bg: 'brand.600',
          },
        },
      },
    },
  },
})

export default theme;
