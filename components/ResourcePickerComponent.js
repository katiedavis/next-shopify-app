import { ResourcePicker } from '@shopify/polaris';
import store from 'store-js';

class ResourcePickerComponent extends React.Component {
  state = {
    open: this.props.open
  };
  render() {
    console.log(this.props);
    return (
      <ResourcePicker
        resourceType="Product"
        showVariants={false}
        open={this.state.open}
        onSelection={resources => {
          this.handleSelection(resources);
          this.props.update();
        }}
        onCancel={() => this.setState({ open: false })}
      />
    );
  }
  handleSelection(resources) {
    const idsFromResources = resources.selection.map(product => product.id);
    store.set('ids', idsFromResources);
    console.log(store.get('ids'));
    this.setState({ open: false });
  }
}

export default ResourcePickerComponent;
