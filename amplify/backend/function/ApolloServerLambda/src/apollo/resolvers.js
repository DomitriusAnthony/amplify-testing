const resolvers = {
  Query: {
    getUsers: (_, args, { dataSources }) => {
      return dataSources.appSyncAPI.getUsers().then(data => data.items);
    }
  },
  Mutation: {
    createGathering: (_, { userId, gathering }, { dataSources }) => {
      return dataSources.appSyncAPI.createGroup(userId, gathering);
    },
    createUser: (_, { username, email, password }, { dataSources }) => {
      return dataSources.appSyncAPI.createUser(username, email, password);
    }
  }
}

module.exports = resolvers;