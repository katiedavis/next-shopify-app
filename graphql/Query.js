import gql from 'graphql-tag';

export const GET_SHOP = gql`
  query {
    shop {
      name
    }
  }
`;
