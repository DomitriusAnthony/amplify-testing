const { ApolloServer } = require("apollo-server");
const typeDefs = require("./apollo/schema");
const resolvers = require("./apollo/resolvers");
const AppSyncAPI = require("./apollo/datasources/appSync");

exports.handler = () => {
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

