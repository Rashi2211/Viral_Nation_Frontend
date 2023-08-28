import { gql } from "@apollo/client";

// GraphQL query to fetch a list of movies with pagination, sorting, and searching options
export const GET_ALL_MOVIES = gql`
query Query(
  $moviesId: Int            // Optional: ID of a specific movie
  $page: Int                // Pagination: Page number
  $rows: Int                // Pagination: Number of movies per page
  $sort: sortOrder          // Sorting: Order of sorting (asc or desc) and column to sort by
  $search: String           // Optional: Search query for filtering movies
  ) {
    movies(
                            // Movie details to be returned
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
      total_rows          // Total number of movies in the query result
    }
  }
`;
