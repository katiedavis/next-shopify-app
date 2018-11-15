import { Layout, EmptyState, Page, ResourcePicker } from '@shopify/polaris';
import store from 'store-js';
import ResourceListWithProducts from '../components/ResourceList';
import ResourcePickerComponent from '../components/ResourcePickerComponent';
class Index extends React.Component {
  state = {
    open: false
  };

  render() {
    const emptyState = !store.get('ids');
    return (
      <Page
        primaryAction={{
          content: 'Add products',
          onAction: () => this.setState({ open: true })
        }}
      >
        {emptyState ? (
          <Layout>
            <EmptyState
              heading="Discount your products temporarily"
              action={{
                content: 'Select Products',
                onAction: () => this.setState({ open: true })
              }}
              image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
            >
              <p>Select products and change their price temporarily.</p>
            </EmptyState>
            {this.state.open && (
              <ResourcePickerComponent
                update={this.handler}
                open={this.state.open}
              />
            )}
          </Layout>
        ) : (
          <ResourceListWithProducts />
        )}
      </Page>
    );
  }
  handler = () => {
    this.setState({
      open: false
    });
  };
}

export default Index;
