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
import EditProduct from './EditProduct';

class DisplayProducts extends React.Component {
  state = {
    showEdit: false
  };
  render() {
    return (
      <Query
        query={GET_PRODUCT}
        variables={{ handle: this.props.product.handle }}
      >
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          return !this.state.showEdit ? (
            <Page>
              <Card sectioned>
                <ResourceList.Item
                  onClick={() => this.setState({ showEdit: true })}
                >
                  <h3>
                    <TextStyle variation="strong">
                      {data.shop.productByHandle.title}
                    </TextStyle>
                  </h3>
                </ResourceList.Item>
              </Card>
            </Page>
          ) : (
            <EditProduct product={this.props.product} />
          );
        }}
      </Query>
    );
  }

  handleChange = field => {
    return value => this.setState({ [field]: value });
  };

  completedMutation = () => {
    this.setState({ completed: true });
  };
}

export default DisplayProducts;
