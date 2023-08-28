import { gql } from "@apollo/client";
// GraphQL mutation to create a new movie
export const CREATE_MOVIE = gql`
  mutation CreateMovie(
    $description: String!
    $directorName: String!
    $name: String!
    $releaseDate: String!
    $image: String
  ) {
    createMovie(
      description: $description
      directorName: $directorName
      name: $name
      releaseDate: $releaseDate
      image: $image
    ) {
      creatorId
      description
      directorName
      id
      image
      name
      releaseDate
      user {
        email
        id
        userName
      }
    }
  }
`;
