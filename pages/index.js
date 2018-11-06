import { EmptyState, Page } from '@shopify/polaris';
import { ResourcePicker } from '@shopify/polaris/embedded';
import { composeGid } from '@shopify/admin-graphql-api-utilities';
import store from 'store';
import ResourceList from '../components/ResourceList';

class Index extends React.Component {
  state = {
    emptyState: true,
    open: false
  };
  render() {
    return (
      <Page
        primaryAction={{
          content: 'Add products',
          onAction: () => this.setState({ open: true })
        }}
      >
        {!store.get('ids') ? (
          <React.Fragment>
            <EmptyState
              heading="Add products to start"
              action={{
                content: 'Add Products',
                onAction: () => this.setState({ open: true })
              }}
              image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
            >
              <p>To get started, add some products from your shop</p>
            </EmptyState>
            <ResourcePicker
              products
              allowMultiple
              open={this.state.open}
              onSelection={resources => {
                const idsFromProducts = resources.products.map(product =>
                  composeGid('Product', product.id)
                );
                this.setState({
                  resources: idsFromProducts,
                  emptyState: false
                });
                store.set('ids', idsFromProducts);
              }}
              onCancel={() => this.setState({ open: false })}
            />
          </React.Fragment>
        ) : (
          <ResourceList ids={store.get('ids')} />
        )}
      </Page>
    );
  }
}

export default Index;
