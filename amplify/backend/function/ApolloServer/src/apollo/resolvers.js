module.exports = {
  Query: {
    getUsers: (_, args, { dataSources }) => {
      return dataSources.appSyncAPI.getUsers().then(data => data.items);
    }
  },
  Mutation: {
    createGathering: (_, { userId, gathering }, { dataSources }) => {
      return dataSources.appSyncAPI.createGathering(userId, gathering);
    }
  }
};