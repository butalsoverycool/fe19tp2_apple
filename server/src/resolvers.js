// const fetch = require('node-fetch');

// module.exports = {
//   Query: {
//     pollutions: async () => {
//       const response = await fetch('https://api.myjson.com/bins/ebz4k');
//       const data = await response.json();
//       return data;
//     },
//   },
// };
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
