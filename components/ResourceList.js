import { Page, Card, ResourceList, TextStyle } from '@shopify/polaris';

const ResourceListWithProps = props => {
  console.log(props);
  return (
    <Page>
      <Card sectioned>
        <ResourceList
          resourceName={{ singular: 'Product', plural: 'Products' }}
          items={props.resources.nodes}
          renderItem={item => {
            console.log('item', item);
            return (
              <ResourceList.Item
                id={item.id}
                accessibilityLabel={`View details for ${item.title}`}
              >
                <h3>
                  <TextStyle variation="strong">{item.title}</TextStyle>
                </h3>
              </ResourceList.Item>
            );
          }}
        />
      </Card>
    </Page>
  );
};
export default ResourceListWithProps;
