import { EmptyState, Page } from '@shopify/polaris';
import { ResourcePicker } from '@shopify/polaris/embedded';
import { composeGid } from '@shopify/admin-graphql-api-utilities';
import ResourceListWithProducts from '../components/ResourceListWithProducts';
import { ContextConsumer } from '../components/Context';

const Index = () => (
  <ContextConsumer>
    {({ state, updateParentState }) => (
      <Page
        primaryAction={{
          content: 'Add products',
          onAction: () => updateParentState({ open: true })
        }}
      >
        {!state.resources ? (
          <div>
            <EmptyState
              heading="Add products to start"
              action={{
                content: 'Add Products',
                onAction: () => updateParentState({ open: true })
              }}
              image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
            >
              <p>To get started, add some products from your shop</p>
            </EmptyState>
            <ResourcePicker
              products
              allowMultiple
              open={state.open}
              onSelection={resources => {
                const idsFromProducts = resources.products.map(product =>
                  composeGid('Product', product.id)
                );
                updateParentState({ resources: idsFromProducts });
              }}
              onCancel={() => updateParentState({ open: false })}
            />
          </div>
        ) : (
          <ResourceListWithProducts />
        )}
      </Page>
    )}
  </ContextConsumer>
);

export default Index;
