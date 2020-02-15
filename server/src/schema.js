const { gql } = require('apollo-server');

const typeDefs = gql`
  type Pullution {
    sector: String
    year: String
    values: [String]
    id: [String]
  }
  type Query {
    pollution: [Pullution]
  }
`;

module.exports = typeDefs;
