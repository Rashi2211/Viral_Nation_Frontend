import { gql } from "@apollo/client";

// GraphQL query to fetch a list of movies with pagination, sorting, and searching options
export const GET_ALL_MOVIES = gql`
  query Query(
    $moviesId: Int
    $page: Int
    $rows: Int
    $sort: sortOrder
    $search: String
  ) {
    movies(
      id: $moviesId
      page: $page
      rows: $rows
      sort: $sort
      search: $search
    ) {
      movies {
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
      total_rows
    }
  }
`;
