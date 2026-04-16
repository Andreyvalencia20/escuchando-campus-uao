import { createTheme } from '@mui/material/styles';

const uaoTheme = createTheme({
  palette: {
    primary: {
      main: '#FF051E',
      dark: '#ae002d',
      light: '#FF3D4F',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#79102D',
      dark: '#4A0A1C',
      light: '#ae002d',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FAFAFA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1B1B1B',
      secondary: '#616161',
    },
    divider: 'rgba(0,0,0,0.08)',
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica Neue", Arial, sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    h1: { fontWeight: 300, fontSize: '3rem', letterSpacing: '-0.02em', lineHeight: 1.15 },
    h2: { fontWeight: 300, fontSize: '2.25rem', letterSpacing: '-0.015em', lineHeight: 1.2 },
    h3: { fontWeight: 300, fontSize: '1.75rem', letterSpacing: '-0.01em', lineHeight: 1.3 },
    h4: { fontWeight: 300, fontSize: '1.5rem', letterSpacing: '-0.005em', lineHeight: 1.35 },
    h5: { fontWeight: 400, fontSize: '1.25rem', lineHeight: 1.4 },
    h6: { fontWeight: 400, fontSize: '1.1rem', lineHeight: 1.4 },
    subtitle1: { fontWeight: 300, fontSize: '1rem', lineHeight: 1.5, letterSpacing: '0.01em' },
    body1: { fontWeight: 300, fontSize: '1rem', lineHeight: 1.7 },
    body2: { fontWeight: 300, fontSize: '0.875rem', lineHeight: 1.6 },
    caption: { fontWeight: 300, fontSize: '0.75rem', lineHeight: 1.5, letterSpacing: '0.03em' },
    button: { fontWeight: 400, textTransform: 'none' as const, letterSpacing: '0.02em' },
    overline: { fontWeight: 400, fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const },
  },
  shape: {
    borderRadius: 16,
  },
  spacing: 8,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*': { boxSizing: 'border-box' },
        'html, body, #root': { height: '100%', width: '100%' },
        body: {
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
        '::selection': {
          background: 'rgba(255,5,30,0.15)',
          color: '#1B1B1B',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 28px',
          fontSize: '0.875rem',
          transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
        },
        contained: {
          boxShadow: '0 2px 8px rgba(255,5,30,0.25)',
          '&:hover': {
            boxShadow: '0 4px 16px rgba(255,5,30,0.35)',
            transform: 'translateY(-1px)',
          },
          '&:active': { transform: 'translateY(0)' },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 400,
          fontSize: '0.75rem',
          letterSpacing: '0.02em',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          '& .MuiSlider-thumb': {
            transition: 'box-shadow 200ms',
            '&:hover': { boxShadow: '0 0 0 8px rgba(255,5,30,0.12)' },
          },
        },
      },
    },
  },
});

export default uaoTheme;
