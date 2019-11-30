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

    this.baseURL = "https://7fakeccwargdvnrghci2wrcxru.appsync-api.us-east-1.amazonaws.com/graphql"
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

      console.log(response.data)

      return response.data.listUsers
    } catch (err) {
      console.error(err);
    }
  }

}

module.exports = AppSyncAPI;