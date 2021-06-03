import NextApp, { AppProps } from 'next/app';
import Head from 'next/head';
import React, { FC } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import reset from 'styled-reset';

const Meta: FC = () => {
  const tagline = 'Twitch streamers using the Shure SM7B';
  return (
    <Head>
      <title>NextJS TypeScript Template</title>

      <link href="/static/manifest.json" rel="manifest" />
    </Head>
  );
};

const GlobalStyle = createGlobalStyle`
  ${reset};
  html {
    font-size: 62.5%;
    text-size-adjust: 100%;
  }
  body {
    font-family: Roboto;
    font-size: 1.3rem;
    overflow-x: hidden;
  }
`;

const Main = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={{}}>
        <Meta />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

export default class App extends NextApp {
  render() {
    return <Main {...this.props} />;
  }
}
