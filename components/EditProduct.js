import React from 'react';
import {
  Card,
  Form,
  FormLayout,
  TextField,
  Banner,
  Button,
  Layout,
  Stack
} from '@shopify/polaris';
import { UPDATE_PRODUCT } from '../graphql/Mutations';
import { Mutation } from 'react-apollo';
import { composeGid } from '@shopify/admin-graphql-api-utilities';

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
        {handleSubmit => {
          return (
            <Layout.Section>
              {this.state.completed && (
                <Banner status="success">Successfully updated!</Banner>
              )}
              <br />
              <Form
                onSubmit={() => {
                  const productInput = {
                    title: this.state.name,
                    id: composeGid('Product', `${this.state.id}`)
                  };
                  console.log('product input', productInput);
                  handleSubmit({ variables: { product: productInput } });
                }}
              >
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
                <br />
                <Stack distribution="trailing">
                  <Button primary submit>
                    Save
                  </Button>
                </Stack>
              </Form>
            </Layout.Section>
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
