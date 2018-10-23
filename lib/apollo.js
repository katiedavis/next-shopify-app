import { withData } from 'next-apollo';
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  fetchOptions: {
    credentials: 'include'
  }
});

export default withData(client);
