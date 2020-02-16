const fetch = require('node-fetch');

module.exports = {
  Query: {
    pollutions: async () => {
      const response = await fetch('http://localhost:3000/chart-data.json');
      const data = await response.json();
      return data;
    },
  },
};

// pollution: (_, __, { dataSources }) => {
//   return dataSources.randomUserAPI.getPerson();
// }
