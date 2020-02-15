const fetch = require('node-fetch');

module.exports = {
  Query: {
    pollution: async () => {
      const response = await fetch('http://localhost:3000/chart-data.json');
      const data = await response.json();
      return data;
    },
  },
};
