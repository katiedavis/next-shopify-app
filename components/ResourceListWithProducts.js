import { Query } from 'react-apollo';
import { Page, Card, ResourceList, TextStyle } from '@shopify/polaris';

import { GET_MANY_PRODUCTS } from '../graphql/Query';
import ResourceListWithData from './ResourceList';
import { ContextConsumer } from './Context';
import EditProduct from './EditProduct';

const ResourceListWithProducts = () => (
  <ContextConsumer>
    {({ state, updateStateWithProduct }) => (
      <Query query={GET_MANY_PRODUCTS} variables={{ id: state.resources }}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;
          return !state.clicked ? (
            <Card sectioned>
              <ResourceList
                resourceName={{ singular: 'Product', plural: 'Products' }}
                items={data.nodes}
                renderItem={item => {
                  return (
                    <ResourceList.Item
                      id={item.id}
                      accessibilityLabel={`View details for ${item.title}`}
                      onClick={() => updateStateWithProduct(item)}
                    >
                      <h3>
                        <TextStyle variation="strong">{item.title}</TextStyle>
                      </h3>
                    </ResourceList.Item>
                  );
                }}
              />
            </Card>
          ) : (
            <EditProduct product={state.item} />
          );
        }}
      </Query>
    )}
  </ContextConsumer>
);

export default ResourceListWithProducts;
