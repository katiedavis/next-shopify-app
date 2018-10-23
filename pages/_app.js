import React from 'react';
import App, { Container } from 'next/app';
import { AppProvider } from '@shopify/polaris';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  fetchOptions: {
    credentials: 'include'
  }
});

class Layout extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <AppProvider>
        <ApolloProvider client={client}>{children}</ApolloProvider>
      </AppProvider>
    );
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
