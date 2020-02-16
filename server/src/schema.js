const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    """
    Get the list of all pollutions
    """
    pollutions(filter: FilterPollution): [Pollutions]
  }
  type Pollutions {
    sector: String
    year: String
    values: [String]
    id: [String]
  }
  input FilterPollution {
    sector: String
    year: String
    values: [String]
    id: [String]
  }
`;

module.exports = typeDefs;
