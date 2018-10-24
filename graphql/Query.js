import gql from 'graphql-tag';

export const GET_PRODUCTS = gql`
  query shop {
    products(first: 250) {
      edges {
        node {
          id
          title
        }
      }
      pageInfo {
        hasNextPage
      }
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
