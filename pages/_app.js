import React from 'react';
import App, { Container } from 'next/app';
import { AppProvider } from '@shopify/polaris';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import '@shopify/polaris/styles.css';

const client = new ApolloClient({
  fetchOptions: {
    credentials: 'include'
  }
});

class Layout extends React.Component {
  state = { workaround: false };

  componentDidMount() {
    this.setState({ workaround: true });
  }
  render() {
    const { children } = this.props;

    if (!this.state.workaround) {
      return <div>loading...</div>;
    }
    return (
      <AppProvider
        apiKey="process.env.SHOPIFY_API_KEY"
        shopOrigin="https://webpackstore.myshopify.com"
        forceRedirect
      >
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
