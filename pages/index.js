import Link from 'next/link';
import '@shopify/polaris/styles.css';
import { AppProvider, Card, Page, TextStyle } from '@shopify/polaris';
import { Query } from 'react-apollo';
import withData from '../lib/apollo';
import { GET_SHOP } from '../graphql/Query';

export default withData(props => (
  <AppProvider>
    <Page>
      <Card>
        <Link href="/about">
          <button>Go to About Page</button>
        </Link>
        <Query query={GET_SHOP}>
          {queryResults => {
            if (queryResults.loading) return 'Loading...';
            if (queryResults.error)
              return `Error! ${queryResults.error.message}`;
            console.log(queryResults);
            return <h1>{queryResults.data.shop.name}</h1>;
          }}
        </Query>
      </Card>
    </Page>
  </AppProvider>
));
