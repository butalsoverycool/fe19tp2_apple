const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const ChartsAPI = require('./datasources/launch');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    chartsAPI: new ChartsAPI(),
  }),
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
