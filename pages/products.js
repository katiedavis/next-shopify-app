import {
  Avatar,
  Card,
  Label,
  List,
  Page,
  ResourceList,
  TextStyle
} from '@shopify/polaris';
import { GET_PRODUCTS } from '../graphql/Query';
import { Query } from 'react-apollo';

const ProductList = () => (
  <Query query={GET_PRODUCTS}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;

      return (
        <Page>
          <Card sectioned>
            <ResourceList
              resourceName={{ singular: 'customer', plural: 'customers' }}
              items={data.products.edges}
              renderItem={item => {
                console.log(item);
                return (
                  <ResourceList.Item
                    id={item.node.id}
                    accessibilityLabel={`View details for ${item.node.title}`}
                  >
                    <h3>
                      <TextStyle variation="strong">
                        {item.node.title}
                      </TextStyle>
                    </h3>
                  </ResourceList.Item>
                );
              }}
            />
          </Card>
        </Page>
      );
    }}
  </Query>
);
export default ProductList;
