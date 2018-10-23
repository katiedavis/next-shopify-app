import { GET_SHOP } from '../graphql/Query';
import { Query } from 'react-apollo';

export default () => (
  <Query query={GET_SHOP}>
    {queryResults => {
      if (queryResults.loading) return 'Loading...';
      if (queryResults.error) return `Error! ${queryResults.error.message}`;
      console.log(queryResults);
      return <h1>{queryResults.data.shop.name}</h1>;
    }}
  </Query>
);
