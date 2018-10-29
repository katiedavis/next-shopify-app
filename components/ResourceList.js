import { Page, Card, ResourceList, TextStyle } from '@shopify/polaris';
import EditProduct from './EditProduct';

class ResourceListWithProps extends React.Component {
  state = {
    clicked: false,
    item: ''
  };
  render() {
    return (
      <Page>
        {!this.state.clicked ? (
          <Card sectioned>
            <ResourceList
              resourceName={{ singular: 'Product', plural: 'Products' }}
              items={this.props.resources.nodes}
              renderItem={item => {
                return (
                  <ResourceList.Item
                    id={item.id}
                    accessibilityLabel={`View details for ${item.title}`}
                    onClick={() => this.setState({ clicked: true, item: item })}
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
          <EditProduct product={this.state.item} />
        )}
      </Page>
    );
  }
}
export default ResourceListWithProps;
