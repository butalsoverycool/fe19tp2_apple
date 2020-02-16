import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
// import gql from 'graphql-tag';

const cache = new InMemoryCache();
const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache,
});

// client
//   .query({
//     query: gql`
//       {
//         pollutions {
//           id
//           values
//           year
//         }
//       }
//     `,
//   })
//   .then(result => console.log(result));

export default client;
