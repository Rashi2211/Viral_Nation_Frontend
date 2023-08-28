import { gql } from "@apollo/client";

// GraphQL mutation to edit/update a movie
export const EDIT_MOVIES = gql`
  mutation Mutation(
    $idToUpdated: Int!
    $description: String!
    $directorName: String!
    $name: String!
    $releaseDate: String!
    $image: String
  ) {
    updateMovie(
      idToUpdated: $idToUpdated
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
