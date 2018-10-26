import { Page, EmptyState, ResourceList } from '@shopify/polaris';
import { ResourcePicker } from '@shopify/polaris/embedded';
import CreateProduct from '../components/EditProduct';
import DisplayProducts from '../components/DisplayProducts';
import { composeGid } from '@shopify/admin-graphql-api-utilities';
import ResourceListWithProducts from '../components/ResourceListWithProducts';

class Index extends React.Component {
  state = { open: false, resources: '' };

  render() {
    return (
      <React.Fragment>
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
                console.log(resources);
                const idsFromProducts = resources.products.map(product =>
                  composeGid('Product', product.id)
                );
                console.log('ids from product', idsFromProducts);
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
    console.log(this.state);
  };
}

export default Index;
