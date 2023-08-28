import { gql } from "@apollo/client";

// GraphQL mutation to delete a movie
export const DELETE_MOVIE = gql`
  mutation DeleteMovie($deleteMovieId: Int!) {
    deleteMovie(id: $deleteMovieId) {
      user {
        email
        id
        userName
      }
      creatorId
      description
      directorName
      id
      name
      releaseDate
    }
  }
`;
