import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider as ThemeProviderMUI } from '@material-ui/styles';
import { ThemeProvider } from 'styled-components';
import CssBaseline from '@material-ui/core/CssBaseline';
import muiTheme from 'css/theme';
import GlobalStyles from 'css/global';
import { variables as theme } from 'css/variables.css';
import { prod } from 'constants/index';
import { initLogRocket } from 'utils/initLogRocket';

export default class MyApp extends App {
  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }

    if (prod) {
      initLogRocket();
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
        <ThemeProvider theme={theme}>
          <ThemeProviderMUI theme={muiTheme}>
            <CssBaseline />
            <GlobalStyles />
            <Component {...pageProps} />
          </ThemeProviderMUI>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}
