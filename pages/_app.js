import React from 'react';
import App, { Container } from 'next/app';
import { AppProvider } from '@shopify/polaris';

class Layout extends React.Component {
  render() {
    const { children } = this.props;
    return <AppProvider>{children}</AppProvider>;
  }
}

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  }
}
