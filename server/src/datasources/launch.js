const { RESTDataSource } = require('apollo-datasource-rest');

class ChartsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.myjson.com/bins/';
  }
  async getPollution() {
    const response = await this.get('ebz4k');
    return response;
  }
  async getPollution() {
    const response = await this.get('ebz4k');
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
    const response = await this.get('ebz4k', { id: pollutionId });
    return this.pollutionReducer(response[0]);
  }

  getPollutionsByIds({ pollutionIds }) {
    return Promise.all(
      pollutionIds.map(pollutionId => this.getPollutionById({ pollutionId }))
    );
  }
}
module.exports = ChartsAPI;
