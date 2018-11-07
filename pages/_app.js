import React from 'react';
import App from 'next/app';
import { AppProvider } from '@shopify/polaris';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import '@shopify/polaris/styles.css';
import Head from 'next/head';

const client = new ApolloClient({
  fetchOptions: {
    credentials: 'include'
  }
});

class Wrapper extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <React.Fragment>
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
          //Will be updated to use app bridge method to get shop origin when we get our new polaris components
          forceRedirect
        >
          <ApolloProvider client={client}>{children}</ApolloProvider>
        </AppProvider>
      </React.Fragment>
    );
  }
}

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    );
  }
}
