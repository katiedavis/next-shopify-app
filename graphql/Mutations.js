import gql from 'graphql-tag';

export const UPDATE_PRODUCT = gql`
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
