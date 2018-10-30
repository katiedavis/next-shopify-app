import { Query } from 'react-apollo';
import { Card, ResourceList, TextStyle } from '@shopify/polaris';
import gql from 'graphql-tag';
import { ContextConsumer } from '../providers/Context';
import EditProduct from './EditProduct';

const GET_MANY_PRODUCTS = gql`
  query getproducts($id: [ID!]!) {
    nodes(ids: $id) {
      ... on Product {
        title
        handle
        descriptionHtml
        id
      }
    }
  }
`;

const ResourceListWithProducts = () => (
  <ContextConsumer>
    {({ state, updateParentState }) => (
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
                      onClick={() =>
                        updateParentState({ item: item, clicked: true })
                      }
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
