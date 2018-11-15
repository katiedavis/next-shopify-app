import {
  Banner,
  Card,
  DisplayText,
  Form,
  FormLayout,
  Layout,
  PageActions,
  Spinner,
  TextField,
  Toast
} from '@shopify/polaris';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const UPDATE_PRICE = gql`
  mutation productVariantUpdate($input: ProductVariantInput!) {
    productVariantUpdate(input: $input) {
      userErrors {
        field
        message
      }
      product {
        title
      }
      productVariant {
        id
        price
      }
    }
  }
`;
class EditProduct extends React.Component {
  state = {
    id: this.props.id,
    price: this.props.product.variants.edges[0].node.price,
    discount: '',
    variantId: this.props.product.variants.edges[0].node.id,
    showToast: false
  };

  componentDidMount() {
    this.setState({ discount: this.createDiscount() });
  }

  render() {
    const { name, price, discount, variantId, showToast } = this.state;
    const toastMarkup = showToast ? (
      <Toast
        content={`Succesfully updated ${this.props.product.title}`}
        onDismiss={this.toggleToast}
      />
    ) : null;
    return (
      <Mutation mutation={UPDATE_PRICE} onCompleted={this.completedMutation}>
        {(handleSubmit, { error }) => {
          if (error) return <Banner status="critical">{error.message}</Banner>;
          return (
            <React.Fragment>
              {toastMarkup}
              <Layout.Section />
              <Layout.Section>
                <DisplayText size="large">{name}</DisplayText>
                <Form>
                  <Card sectioned>
                    <FormLayout>
                      <FormLayout.Group>
                        <TextField
                          prefix="$"
                          value={price}
                          disabled={true}
                          onChange={this.handleChange('price')}
                          label="Original price"
                          type="price"
                        />
                        <TextField
                          prefix="$"
                          value={discount}
                          onChange={this.handleChange('discount')}
                          label="Discounted price"
                          type="discount"
                        />
                      </FormLayout.Group>
                      <p>
                        This sale price will expire in two weeks on{' '}
                        {this.props.expires}
                      </p>
                    </FormLayout>
                  </Card>
                  <PageActions
                    primaryAction={[
                      {
                        content: 'Save',
                        onAction: () => {
                          const productVariableInput = {
                            id: variantId,
                            price: discount
                          };
                          handleSubmit({
                            variables: { input: productVariableInput }
                          });
                        }
                      }
                    ]}
                    secondaryActions={[
                      {
                        content: 'Remove Discount'
                      }
                    ]}
                  />
                </Form>
              </Layout.Section>
            </React.Fragment>
          );
        }}
      </Mutation>
    );
  }

  handleChange = field => {
    return value => this.setState({ [field]: value });
  };

  createDiscount = () => {
    const discounter = this.state.price * 0.1;
    return (this.state.price - discounter).toFixed(2);
  };
  completedMutation = () => {
    this.setState({ showToast: true });
    this.props.displayList();
  };
  toggleToast = () => {
    this.setState(({ showToast }) => ({ showToast: !showToast }));
  };
}

export default EditProduct;
