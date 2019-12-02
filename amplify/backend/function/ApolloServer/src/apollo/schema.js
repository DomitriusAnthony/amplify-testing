const { gql } = require("apollo-server");

const typeDefs = gql`
  input UserInput {
    userId: ID!
    
  }
  type User {
    email: String!
    gatherings_joined: [Gathering]
    gatherings_owned: [Gathering]
    id: ID!
    password: String!
    username: String!
  }

  type Gathering {
    description: String!
    id: ID!
    members: [User]
    owner: User!
    title: String!
  }

  type Query {
    getUsers: [User]!
  }

  type Mutation {
    createGathering(userId: ID! gathring: GatheringInput): Gathering!
  }
`;

module.exports = typeDefs;