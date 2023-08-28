import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

//HTTP link for connecting to the GraphQL API
const httpLink = createHttpLink({
  uri: "https://1296-92-62-121-52.ngrok-free.app",  // GraphQL API URL
});

// Creating an authentication link to include the authorization token in headers
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      Authorization: localStorage.getItem("token") || "", // Retrieving token from local storage
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink), //Applying authentication and HTTP link
  cache: new InMemoryCache(),  // Using an in-memory cache for caching data
});

export default client;
