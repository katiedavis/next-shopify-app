import { Page, EmptyState } from '@shopify/polaris';
import { ResourcePicker } from '@shopify/polaris/embedded';
import CreateProduct from '../components/CreateProduct';
class Index extends React.Component {
  state = { open: false, resources: '' };

  onSelectedProducts = resources => {
    this.setState({ open: false, resources: resources.products });
  };

  render() {
    return (
      <Page
        primaryAction={{
          content: 'Add products',
          onAction: () => this.setState({ open: true })
        }}
      >
        {!this.state.resources ? (
          <div>
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
              open={this.state.open}
              onSelection={resources => {
                this.onSelectedProducts(resources);
              }}
              onCancel={() => this.setState({ open: false })}
            />
          </div>
        ) : (
          this.state.resources.map(product => (
            <CreateProduct key={product.created_at} product={product} />
          ))
        )}
      </Page>
    );
  }
}

export default Index;
