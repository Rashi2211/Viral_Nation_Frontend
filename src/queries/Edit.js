import { gql } from "@apollo/client";

// GraphQL mutation to edit/update a movie
export const EDIT_MOVIES = gql`
  mutation Mutation(
    $idToUpdated: Int!         // ID of the movie to be updated
    $description: String!      // Updated description
    $directorName: String!     // Updated director name
    $name: String!             // Updated movie title
    $releaseDate: String!      // Updated release date
    $image: String             // Updated image URL
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
