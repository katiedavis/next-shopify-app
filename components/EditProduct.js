import React from 'react';
import {
  Card,
  Form,
  FormLayout,
  TextField,
  Banner,
  Layout,
  PageActions
} from '@shopify/polaris';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const UPDATE_PRODUCT = gql`
  mutation ProductUpdate($product: ProductInput!) {
    productUpdate(input: $product) {
      userErrors {
        field
        message
      }
      product {
        title
      }
    }
  }
`;

class CreateProduct extends React.Component {
  state = {
    name: this.props.product.title,
    description: this.props.product.body_html,
    completed: false,
    id: this.props.product.id
  };
  render() {
    const { name, description } = this.state;

    return (
      <Mutation mutation={UPDATE_PRODUCT} onCompleted={this.completedMutation}>
        {(handleSubmit, mutationResults) => {
          return (
            <React.Fragment>
              <Layout.Section>
                {this.state.completed && (
                  <Banner status="success">
                    Successfully updated{' '}
                    {mutationResults.data.productUpdate.product.title}
                  </Banner>
                )}
              </Layout.Section>
              <Layout.Section>
                <Form>
                  <Card sectioned>
                    <FormLayout>
                      <TextField
                        value={name}
                        onChange={this.handleChange('name')}
                        label="Product name"
                        type="name"
                      />
                      <TextField
                        value={description}
                        onChange={this.handleChange('description')}
                        label="Tagline"
                        type="test"
                      />
                    </FormLayout>
                  </Card>
                  <PageActions
                    primaryAction={[
                      {
                        content: 'Save',
                        onAction: () => {
                          const productInput = {
                            title: this.state.name,
                            id: this.state.id
                          };
                          handleSubmit({
                            variables: { product: productInput }
                          });
                        }
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

  completedMutation = () => {
    this.setState({ completed: true });
  };
}

export default CreateProduct;
