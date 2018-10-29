import { EmptyState } from '@shopify/polaris';
import { ResourcePicker } from '@shopify/polaris/embedded';
import { composeGid } from '@shopify/admin-graphql-api-utilities';
import ResourceListWithProducts from '../components/ResourceListWithProducts';

class Index extends React.Component {
  state = { open: false, resources: '' };

  render() {
    return (
      <React.Fragment>
        {console.log('parent props', this.state)}
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
              allowMultiple
              open={this.state.open}
              onSelection={resources => {
                const idsFromProducts = resources.products.map(product =>
                  composeGid('Product', product.id)
                );
                this.onSelectedProducts(idsFromProducts);
              }}
              onCancel={() => this.setState({ open: false })}
            />
          </div>
        ) : (
          <ResourceListWithProducts ids={this.state.resources} />
        )}
      </React.Fragment>
    );
  }
  onSelectedProducts = idsFromProducts => {
    this.setState({ open: false, resources: idsFromProducts });
  };
}

export default Index;
