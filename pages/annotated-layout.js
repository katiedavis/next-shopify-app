import {
  Layout,
  Card,
  Button,
  TextField,
  Heading,
  Form,
  FormLayout,
  Stack,
  Page
} from '@shopify/polaris';
import store from 'store';

class AnnotatedLayout extends React.Component {
  state = {
    name: '',
    email: '',
    phone: '',
    address: ''
  };

  render() {
    const { name, email, phone, address } = this.state;

    return (
      <Page>
        <Layout>
          <Layout.AnnotatedSection
            title="Account info"
            description="Shopify and your customers will use this information to contact you."
          >
            <Card sectioned>
              <Form onSubmit={this.handleSubmit}>
                <TextField
                  value={name}
                  onChange={this.handleChange('name')}
                  label="name"
                  type="name"
                />
                <TextField
                  value={address}
                  onChange={this.handleChange('address')}
                  label="address"
                  type="address"
                />

                <FormLayout>
                  <FormLayout.Group>
                    <TextField
                      value={email}
                      onChange={this.handleChange('email')}
                      label="email"
                      type="email"
                    />
                    <TextField
                      value={phone}
                      onChange={this.handleChange('phone')}
                      label="phone"
                      type="phone"
                    />
                  </FormLayout.Group>
                  <Button primary submit>
                    Save
                  </Button>
                </FormLayout>
              </Form>
            </Card>
          </Layout.AnnotatedSection>
          <Layout.AnnotatedSection
            title="Enable/disable toggle"
            description="Use this description area to explain any additional details that
              might be important for a merchant to know."
          >
            <Card sectioned>
              <Stack>
                <p>
                  Sample users do not receive notifications when new products
                  are added to your store
                </p>
                <Button primary> Enable</Button>
              </Stack>
            </Card>
          </Layout.AnnotatedSection>
        </Layout>
        <Button onClick={store.clearAll()}>Clear Store</Button>
      </Page>
    );
  }

  handleSubmit = event => {
    this.setState({
      name: '',
      email: '',
      phone: '',
      address: ''
    });
    console.log('submission', this.state);
  };

  handleChange = field => {
    return value => this.setState({ [field]: value });
  };
}

export default AnnotatedLayout;
