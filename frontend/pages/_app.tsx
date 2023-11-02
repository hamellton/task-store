import '@/styles/globals.css';
import { reflexTheme } from '@/styles/theme';
import type { AppProps } from 'next/app';
import { ThemeProvider as ReflexThemeProvider } from 'reflexjs';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReflexThemeProvider theme={reflexTheme}>
      <Component {...pageProps} />
    </ReflexThemeProvider>
  );
}
