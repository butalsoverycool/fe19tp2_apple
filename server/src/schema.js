const { gql } = require('apollo-server');

const typeDefs = gql`
  type Pollutions {
    id: ID!
    sector: String
    year: String
    values: String
  }

  # input FilterPollution {
  #   id: ID
  #   sector: String
  #   year: String
  #   values: String
  # }

  type Query {
    """
    Get the list of all pollutions
    """
    pollutions: [Pollutions]
    pollution(id: ID!): Pollutions
    # pollutions(filter: FilterPollution): [Pollutions!]!
    # pollution: Pollutions
  }
`;

module.exports = typeDefs;
