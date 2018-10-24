import gql from 'graphql-tag';

export const GET_SHOP = gql`
  query {
    shop {
      name
    }
  }
`;

export const GET_PRODUCT = gql`
  query($handle: String!) {
    shop {
      productByHandle(handle: $handle) {
        title
      }
    }
  }
`;
