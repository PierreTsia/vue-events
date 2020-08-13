import { gql } from "apollo-boost";

export const GET_EVENTS = gql`
  query {
    events {
      id
      title
      creator {
        id
        username
      }
      startDate
      endDate
      active
      location
      attendants {
        id
        username
      }
    }
  }
`;
