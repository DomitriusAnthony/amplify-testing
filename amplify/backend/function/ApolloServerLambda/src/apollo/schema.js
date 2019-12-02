const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    gatheringsOwned: [Gathering] 
    gatheringsJoined: [Gathering]
  }

  type Gathering @model {
    id: ID!
    ownerId: ID!
    owner: User! 
    title: String!
    description: String!
    members: [User]
  }
  type Query {
    getUsers: [User]
  }
`

module.exports = typeDefs;