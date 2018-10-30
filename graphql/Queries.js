import gql from 'graphql-tag';

export const GET_MANY_PRODUCTS = gql`
  query getproducts($id: [ID!]!) {
    nodes(ids: $id) {
      ... on Product {
        title
        handle
        descriptionHtml
        id
      }
    }
  }
`;
