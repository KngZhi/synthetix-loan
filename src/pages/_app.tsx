import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import ConnectorProvider from '@/containers/connector';
import { RecoilRoot } from 'recoil';
import '@/styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <ConnectorProvider.Provider>
          <Component {...pageProps} />
        </ConnectorProvider.Provider>
      </RecoilRoot>
    </ThemeProvider>
  );
}
