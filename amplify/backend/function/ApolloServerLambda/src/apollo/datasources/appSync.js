require("dotenv").config();
const { GraphQLDataSource } = require("apollo-datasource-graphql");
const { gql } = require("apollo-server");


const GET_USERS = gql`
  query {
    listUsers {
      items {
        username
        email
        id
      }
    }
  }
`;

const GET_USER = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      username
      email
      id
    }
  }
`

class AppSyncAPI extends GraphQLDataSource {
  constructor() {
    super();

    this.baseURL = "https://2p64pjdxurgzjejnyfykqzsgmm.appsync-api.us-east-1.amazonaws.com/graphql"
  }

  willSendRequest(req) {
    if (!req.headers) {
      req.headers = {};
    }

    req.headers = {
      "x-api-key": process.env.APPSYNC_API_KEY
    }

  }

  async getUsers() {
    try {
      const response = await this.query(GET_USERS);

      return response.data.listUsers
    } catch (err) {
      console.error(err);
    }
  }

  async getUser(email) {
    try {
      const appSyncUsers = await this.query(GET_USERS)

      const users = appSyncUsers.data.listUsers.items;

      const currentUser = users && users.find(u => email === u.username);

      console.log(currentUser)

      return currentUser;
    } catch (e) {
      console.log(e);
    }
  }

  async createGathering(userId, gathering) {
    try {
      const CREATE_GATHERING = gql`
        mutation {
          createGathering(input: {
            ownerId: userId
            title: gathering.title
            description: gathering.description
          }) {
            title
            id
          }
        }
      `
      const results = await this.mutation(CREATE_GATHERING, {
        variables: {
          userId,
          gathering
        }
      })

      console.log("Gathering results: ", results);

      return results;
    } catch (err) {
      console.error(err);
    }
  };

  async createUser(username, email) {
    try {
      const CREATE_USER = gql`
        mutation CreateUser($username: String! $email: String!) {
          createUser(input: { username: $username email: $email})  {
              username
              id
            } 
          }
      `;

      const results = await this.mutation(CREATE_USER, {
        variables: {
          username,
          email
        }
      })

      const newUser = results.data.createUser

      console.log(newUser)

      return newUser;
    } catch (e) {
      console.error(e);
    }
  };

};

module.exports = AppSyncAPI;