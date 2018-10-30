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
import { Mutation } from 'react-apollo';
import { UPDATE_PRODUCT } from '../graphql/Mutations';

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
            <Layout.Section>
              {this.state.completed && (
                <Banner status="success">
                  Successfully updated
                  {mutationResults.data.productUpdate.product.title}
                </Banner>
              )}
              <br />
              <Form
                onSubmit={() => {
                  const productInput = {
                    title: this.state.name,
                    id: this.state.id
                  };
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
