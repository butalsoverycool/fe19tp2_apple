module.exports = {
  Query: {
    pollutions: (_, __, { dataSources }) =>
      dataSources.chartsAPI.getPollution(),
    pollution: (_, { id }, { dataSources }) =>
      dataSources.chartsAPI.getPollutionById({ pollutionId: id }),
  },
};

// pollutions: (_, __, { dataSources }) => {
//   return dataSources.chartsAPI.getPollution();
// },
