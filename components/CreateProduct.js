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
    category: '',
    price: '',
    completed: false,
    type: this.props.product.product_type
  };
  render() {
    console.log(this.props);
    const { name, description, category, price } = this.state;
    const options = [
      { label: 'Today', value: 'today' },
      { label: 'Yesterday', value: 'yesterday' },
      { label: 'Last 7 days', value: 'lastWeek' }
    ];

    console.log('this state', this.state);

    return (
      <Mutation mutation={UPDATE_PRODUCT} onCompleted={this.completedMutation}>
        {(handleSubmit, mutationResults) => {
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
                    productType: 'test'
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
