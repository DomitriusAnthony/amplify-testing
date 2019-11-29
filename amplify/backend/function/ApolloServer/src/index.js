/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION
var apiGroupsGraphQLAPIIdOutput = process.env.API_GROUPS_GRAPHQLAPIIDOUTPUT
var apiGroupsGraphQLAPIEndpointOutput = process.env.API_GROUPS_GRAPHQLAPIENDPOINTOUTPUT

Amplify Params - DO NOT EDIT */
exports.handler = () => {
  const { ApolloServer } = require("apollo-server");
  const typeDefs = require("./apollo/schema");
  const resolvers = require("./apollo/resolvers");
  const AppSyncAPI = require("./apollo/datasources/appSync");

  const server = new ApolloServer({
    dataSources: () => ({
      appSyncAPI: new AppSyncAPI()
    }),
    typeDefs,
    resolvers,
  });

  server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });
}
