import { gql } from "apollo-boost";
export const WHO_AM_I = gql`
  query {
    whoAmI {
      id
      username
      handle
      email
      avatar
    }
  }
`;
