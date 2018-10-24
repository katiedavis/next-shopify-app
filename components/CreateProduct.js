import React from 'react';
import {
  Card,
  Form,
  Select,
  FormLayout,
  TextField,
  Banner,
  Button,
  Layout,
  Stack
} from '@shopify/polaris';
import { UPDATE_PRODUCT } from '../graphql/Mutation';
import { Mutation } from 'react-apollo';

class CreateProduct extends React.Component {
  state = {
    name: this.props.product.title,
    description: this.props.product.body_html,
    completed: false,
    id: this.props.product.id
  };
  render() {
    const { name, description } = this.state;
    console.log(this.props);
    return (
      <Mutation mutation={UPDATE_PRODUCT} onCompleted={this.completedMutation}>
        {(handleSubmit, mutationResults) => {
          console.log(mutationResults);
          console.log('state', this.state);
          return (
            <Layout.Section>
              {this.state.completed && (
                <Banner status="success">Successfully updated!</Banner>
              )}
              <br />
              <Form
                onSubmit={event => {
                  event.preventDefault();
                  const productInput = {
                    title: this.state.name,
                    productType: 'test',
                    id: this.state.id
                  };
                  console.log('product input', productInput);
                  handleSubmit({ variables: { productInput } });
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
