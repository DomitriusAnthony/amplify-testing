import { request } from "https";

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

export class AppSyncAPI extends GraphQLDataSource {
  baseUrl = "https://7fakeccwargdvnrghci2wrcxru.appsync-api.us-east-1.amazonaws.com/graphql"

  willSendRequest(req) {
    if (!req.headers);

    console.log(request.headers);
  }

  async getUsers() {
    try {
      const response = await this.query(GET_USERS);

      return response.data.listUsers
    } catch (err) {
      console.error(err);
    }
  }

}