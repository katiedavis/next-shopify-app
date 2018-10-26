import {
  Avatar,
  Card,
  Label,
  List,
  Page,
  ResourceList,
  TextStyle
} from '@shopify/polaris';
import { GET_PRODUCT } from '../graphql/Query';
import { Query } from 'react-apollo';

const ProductList = props => {
  const product = props.product.handle;
  console.log(props.product);
  return (
    <Query query={GET_PRODUCT} variables={{ handle: product }}>
      {({ loading, error, data }) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;
        console.log(data);

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
};
export default ProductList;
