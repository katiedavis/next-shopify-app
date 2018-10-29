import { Query } from 'react-apollo';
import { GET_MANY_PRODUCTS } from '../graphql/Query';
import ResourceListWithData from './ResourceList';

const ResourceListWithProducts = props => {
  const ids = props.ids;

  return (
    <Query query={GET_MANY_PRODUCTS} variables={{ id: ids }}>
      {({ loading, error, data }) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;
        return <ResourceListWithData resources={data} />;
      }}
    </Query>
  );
};
export default ResourceListWithProducts;
