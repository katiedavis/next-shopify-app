import App from 'next/app';
import Head from 'next/head';
import { AppProvider } from '@shopify/polaris';
import '@shopify/polaris/styles.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  fetchOptions: {
    credentials: 'include'
  }
});
class Wrapper extends React.Component {
  state = { workaround: false };
  //this is trash to make  app provider work with ssr, it will be replaced with polaris 3.0
  componentDidMount() {
    this.setState({ workaround: true });
  }
  render() {
    const { children } = this.props;

    if (!this.state.workaround) {
      return <div>Loading</div>;
    }

    return (
      <React.Fragment>
        <Head>
          <title>Sample App</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
        </Head>
        <AppProvider apiKey={process.env.SHOPIFY_API_KEY} forceRedirect>
          <ApolloProvider client={client}>{children}</ApolloProvider>
        </AppProvider>
      </React.Fragment>
    );
  }
}

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    );
  }
}

export default MyApp;
