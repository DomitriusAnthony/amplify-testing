require("dotenv").config();
const { GraphQLDataSource } = require("apollo-datasource-graphql");
const { gql } = require("apollo-server");


const GET_USERS = gql`
  {
    listUsers {
      items {
        username
        id
      }
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

  async createGathering(userId, gathering) {
    try {
      const CREATE_GATHERING = gql`
        mutation CreateGathering($userId: ID! $gathering: Gathering!) {
          createGathering(userId: $userID gathering: $gathering) {
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

  async createUser(username, password, email) {
    try {
      const CREATE_USER = gql`
        mutation CreateUser(input: { $username: String! $password: String! $email: String!}) {
          createUser(username: $username email: $email password: $password) {
              username
              id
            } 
          }
      `;

      const results = await this.mutation(CREATE_USER, {
        variables: {
          username,
          password,
          email
        }
      })

      console.log("User results: ", results)

      return results;
    } catch (e) {
      console.error(e);
    }
  };

};

module.exports = AppSyncAPI;