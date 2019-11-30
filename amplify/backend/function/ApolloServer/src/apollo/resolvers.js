module.exports = {
  Query: {
    getUsers: (_, args, { dataSources }) => {
      return dataSources.appSyncAPI.getUsers().then(data => data.items);
    }
  }
};