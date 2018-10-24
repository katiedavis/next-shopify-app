import { Query } from 'react-apollo';
import { GET_PRODUCT } from '../graphql/Query';

const getProduct = () => {
  return (
    <Query query={GET_PRODUCT} variables={handle}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
        console.log(data);
        <div>hello</div>;
      }}
      }
    </Query>
  );
};

export default getProduct;
