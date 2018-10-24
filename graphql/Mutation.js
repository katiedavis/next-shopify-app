import gql from 'graphql-tag';

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($product: ProductInput!) {
    productCreate(input: $product) {
      product {
        id
        title
      }
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation productUpdate($product: ProductInput!) {
    productUpdate(input: $product) {
      userErrors {
        field
        message
      }
      product {
        id
        title
      }
    }
  }
`;
