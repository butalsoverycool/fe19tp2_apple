const { RESTDataSource } = require('apollo-datasource-rest');

class ChartsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:3000/chart-data.json';
  }
  async getPollution() {
    const response = await this.get('');
    return response;
  }
}

module.exports = ChartsAPI;
