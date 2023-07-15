'use client';
import './globals.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import GNB from '@/components/GNB'
import { createTheme } from '@mui/material'
import { ThemeProvider } from 'styled-components'
import { SnackbarProvider } from 'notistack';


const theme = createTheme({
  typography: {
    fontFamily: [
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={3}>
            <GNB />
            {children}
          </SnackbarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
