import { Query } from 'react-apollo';
import { GET_MANY_PRODUCTS } from '../graphql/Query';
import { Page, ResourceList, Card } from '@shopify/polaris';
import ResourceListWithData from './ResourceList';
const ResourceListWithProducts = props => {
  const ids = props.ids;

  return (
    <Query query={GET_MANY_PRODUCTS} variables={{ id: ids }}>
      {({ loading, error, data }) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;

        return (
          <div>
            {console.log('inside', data)}
            <ResourceListWithData resources={data} />
          </div>
        );
      }}
    </Query>
  );
};
export default ResourceListWithProducts;
