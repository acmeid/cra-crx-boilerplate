import { extendTheme, withDefaultColorScheme, defineStyleConfig } from '@chakra-ui/react'

export const defaultThemeObject = {
  fonts: {
    body: 'Inter, system-ui, sans-serif',
    heading: 'Work Sans, system-ui, sans-serif',
  },
  components: {
    Button: defineStyleConfig({
      sizes: {
        // md: {
        //   fontSize: 'sm',
        //   h: '33px',
        // },
      },
    }),
  },
  colors: {
    gray: {
      '650': '#444948',
    },
    primary: {
      '50': '#08CE9E',
      '100': '#08CE9E',
      '200': '#08CE9E',
      '300': '#08CE9E',
      '400': '#08CE9E',
      '500': '#08CE9E',
      '600': '#08CE9E',
      '700': '#08CE9E',
      '800': '#08CE9E',
      // '900': '#0d17a9',
      // '900': ''
    },
    green: {
      500: '#08CE9E',
      600: '#08BA8A',
      700: '#08A676',
      800: '#089262',
      900: '#089262',
    },
  },
  breakPoints: {
    sm: '30em',
    md: '48em',
    lg: '62em',
    xl: '80em',
    '2xl': '96em',
  },
  shadows: {
    largeSoft: 'rgba(60, 64, 67, 0.15) 0px 2px 10px 6px;',
  },
}

export const defaultTheme = extendTheme(defaultThemeObject, withDefaultColorScheme({ colorScheme: 'green' }))
// export const defaultTheme = extendTheme(withDefaultColorScheme(defaultThemeObject))
// export const defaultTheme = extendTheme(withDefaultColorScheme({colorScheme: 'green'}));
