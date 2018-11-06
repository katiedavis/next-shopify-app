import { Query } from 'react-apollo';
import { Card, ResourceList, TextStyle, Page } from '@shopify/polaris';
import gql from 'graphql-tag';
import EditProduct from './EditProduct';
import store from 'store';

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

class ResourceListWithProducts extends React.Component {
  state = {
    item: '',
    viewItem: false
  };
  render() {
    return (
      <Query query={GET_MANY_PRODUCTS} variables={{ id: store.get('ids') }}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;
          return !this.state.item ? (
            <Page>
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
                          this.setState({ item: item, viewItem: true })
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
            </Page>
          ) : (
            <EditProduct product={this.state.item} />
          );
        }}
      </Query>
    );
  }
}

export default ResourceListWithProducts;
