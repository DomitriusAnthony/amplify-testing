const resolvers = {
  Query: {
    getUsers: (_, args, { dataSources }) => {
      return dataSources.appSyncAPI.getUsers().then(data => data.items);
    },
    getUser: (_, { email }, { dataSources }) => {
      return dataSources.appSyncAPI.getUser(email).then(data => data);
    }
  },
  Mutation: {
    createGathering: (_, { userId, gathering }, { dataSources }) => {
      return dataSources.appSyncAPI.createGroup(userId, gathering);
    },
    createUser: (_, args, { dataSources }) => {
      return dataSources.appSyncAPI.createUser(args.user.username, args.user.email);
    }
  }
}

module.exports = resolvers;