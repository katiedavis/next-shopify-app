import { ResourcePicker } from '@shopify/polaris/embedded';
import { Button } from '@shopify/polaris';

class Resources extends React.Component {
  state = { open: false };

  render() {
    return (
      <div>
        <Button onClick={() => this.setState({ open: true })}>
          Make the resource picker launch
        </Button>
        <ResourcePicker
          products
          allowMultiple
          open={this.state.open}
          onSelection={resources => {
            console.log('Selected products: ', resources.products);
            this.setState({ open: false });
          }}
          onCancel={() => this.setState({ open: false })}
        />
      </div>
    );
  }
}

export default Resources;
