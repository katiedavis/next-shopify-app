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
import { CREATE_PRODUCT } from '../graphql/Mutation';
import { Mutation } from 'react-apollo';

class CreateProduct extends React.Component {
  state = {
    name: '',
    description: '',
    category: '',
    price: '',
    completed: false,
    test: ''
  };
  render() {
    const { name, description, category, price } = this.state;
    const options = [
      { label: 'Today', value: 'today' },
      { label: 'Yesterday', value: 'yesterday' },
      { label: 'Last 7 days', value: 'lastWeek' }
    ];

    return (
      <Mutation mutation={CREATE_PRODUCT} onCompleted={this.completedMutation}>
        {(handleSubmit, mutationResults) => {
          console.log(mutationResults);
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
                    productType: 'fart machine'
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
                    <FormLayout.Group>
                      <Select
                        label="Sample category"
                        options={options}
                        onChange={this.handleChange}
                        value={this.state.selected}
                      />
                      <TextField
                        value={price}
                        onChange={this.handleChange('price')}
                        label="Price"
                        type="test"
                      />
                    </FormLayout.Group>
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
