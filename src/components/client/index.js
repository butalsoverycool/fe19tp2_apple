import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { gql } from 'apollo-boost';

const cache = new InMemoryCache();
const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache,
});

client
  .query({
    query: gql`
      {
        pollution(id: "NOx") {
          id
          year
        }
      }
    `,
  })
  .then(result => console.log(result));
export default client;
