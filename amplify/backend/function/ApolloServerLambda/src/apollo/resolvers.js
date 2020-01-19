const resolvers = {
  Query: {
    getUsers: (obj, args, { dataSources }) => {
      return dataSources.appSyncAPI.getUsers().then(data => data.items);
    },
    getUser: (obj, { email }, { dataSources }) => {
      return dataSources.appSyncAPI.getUser(email).then(data => data);
    }
  },
  Mutation: {
    createGathering: (obj, { userId, gathering }, { dataSources }) => {
      return dataSources.appSyncAPI.createGathering(userId, gathering).then(data => ({ ...data.data.createGathering }));
    },
    createUser: (obj, args, { dataSources }) => {
      return dataSources.appSyncAPI.createUser(args.user.username, args.user.email);
    }
  }
}

module.exports = resolvers;