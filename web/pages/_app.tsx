import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider, AppShell, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { AppNavbar } from '../components/sidebar';
import { useToggle } from '@mantine/hooks';
import { AppHeader } from '../components/header';
import store from '../store';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { NotificationsProvider } from '@mantine/notifications';

const queryClient = new QueryClient();

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const [colorScheme, toggleColorScheme] = useToggle<ColorScheme>('dark', ['light', 'dark']);

  return (
    <>
      <Head>
        <title>Jira Clone</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider
              withGlobalStyles
              withNormalizeCSS
              theme={{
                colorScheme
              }}
              >
              <NotificationsProvider>
                <AppShell
                  padding="md"
                  navbar={<AppNavbar />}
                  header={<AppHeader />}
                  styles={(theme) => ({
                    main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
                  })}
                  >
                  <Component {...pageProps} />
                </AppShell>
              </NotificationsProvider>
              <ReactQueryDevtools />
            </MantineProvider>
          </ColorSchemeProvider>
        </QueryClientProvider>
      </Provider>
    </>
  );
}
