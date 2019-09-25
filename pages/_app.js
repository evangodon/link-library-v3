import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/styles';
import { ModalProvider, LinksProvider } from 'context';
import CssBaseline from '@material-ui/core/CssBaseline';
import muiTheme from 'css/theme';
import GlobalStyles from 'css/global';

export default class MyApp extends App {
  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <React.Fragment>
        <Head>
          <title>LinkLib</title>
          <link rel="shortcut icon" type="image/x-icon" href="/static/favicon.ico" />
        </Head>
        <ThemeProvider theme={muiTheme}>
          <CssBaseline />
          <GlobalStyles />
          <ModalProvider>
            <LinksProvider>
              <Component {...pageProps} data-testid="hello" />
            </LinksProvider>
          </ModalProvider>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}
