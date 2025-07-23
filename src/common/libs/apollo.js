import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  defaultDataIdFromObject,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: process.env.GITHUB_API_URL,
});

const authLink = setContext((_, { headers }) => {
  const token = process.env.GITHUB_TOKEN;
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    dataIdFromObject: (object) => {
      switch (object.__typename) {
        case 'User':
          return `User:${object.login}`; // Use GitHub username as the unique identifier
        case 'Repository':
          return `Repo:${object.id}`; // Use repository ID as the unique identifier
        case 'RepositoryConnection':
          return object.nodes.map((repo) => `Repo:${repo.id}`).join(','); // Use a combination
        default:
          return defaultDataIdFromObject(object); // Fallback for other types
      }
    },
  }),
});
export default client;
