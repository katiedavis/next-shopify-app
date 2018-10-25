import React from 'react';
import App, { Container } from 'next/app';
import { AppProvider } from '@shopify/polaris';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import '@shopify/polaris/styles.css';
import { Page } from '@shopify/polaris';
import Head from 'next/head';

const client = new ApolloClient({
  fetchOptions: {
    credentials: 'include'
  }
});

class Wrapper extends React.Component {
  state = { workaround: false };

  componentDidMount() {
    this.setState({ workaround: true });
  }
  render() {
    const { children } = this.props;

    if (!this.state.workaround) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1"
            katie="hi"
          />
          <meta charSet="utf-8" />
        </Head>
        <AppProvider
          apiKey="process.env.SHOPIFY_API_KEY"
          shopOrigin="https://webpackstore.myshopify.com"
          forceRedirect
        >
          <ApolloProvider client={client}>{children}</ApolloProvider>
        </AppProvider>
      </div>
    );
  }
}

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Wrapper>
        <Page
          primaryAction={{
            content: 'Add products',
            onAction: () => this.setState({ open: true })
          }}
        >
          <Component {...pageProps} />
        </Page>
      </Wrapper>
    );
  }
}
