const { gql } = require("apollo-server");

const typeDefs = gql`
  input UserInput {
    username: String!
    email: String!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    gatheringsOwned: [Gathering] 
    gatheringsJoined: [Gathering]
  }

  input GatheringInput {
    ownerId: ID!
    title: String!
    description: String!
  }

  type Gathering {
    id: ID!
    ownerId: ID!
    owner: User! 
    title: String!
    description: String!
    members: [User]
  }
  
  type Query {
    getUsers: [User]
    getUser(email: String!): User!
  }

  type Mutation {
    createGathering(userId: ID! gathering: GatheringInput!): Gathering! 
    createUser(user: UserInput!): User!
  }
`

module.exports = typeDefs;