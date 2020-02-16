const { RESTDataSource } = require('apollo-datasource-rest');

class ChartsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:3000/';
  }
  // async getPollution() {
  //   const response = await this.get('chart-data.json');
  //   return response;
  // }
  async getPollution() {
    const response = await this.get('chart-data.json');
    return Array.isArray(response)
      ? response.map(data => this.pollutionReducer(data))
      : [];
  }

  pollutionReducer(data) {
    return {
      id: data.id,
      values: data.values,
      sector: data.sector,
      year: data.year,
    };
  }

  async getPollutionById({ pollutionId }) {
    const response = await this.get('chart-data.json', { id: pollutionId });
    return this.pollutionReducer(response[0]);
  }

  getPollutionsByIds({ pollutionIds }) {
    return Promise.all(
      pollutionIds.map(pollutionId => this.getPollutionById({ pollutionId }))
    );
  }
}
module.exports = ChartsAPI;
