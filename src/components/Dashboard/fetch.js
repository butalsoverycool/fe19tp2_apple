import axios from 'axios';

import { proxy, apiUrl, defaultChartTypes } from './default';

export const fetchDataTitles = callback => {
  axios
    .get(proxy + apiUrl)
    .then(res => {
      // sort chaos res into readable "sections"
      const substances = res.data.variables[0].values.map((item, nth) => ({
        name: res.data.variables[0].valueTexts[nth],
        code: item
      }));

      const sectors = res.data.variables[1].values.map((item, nth) => ({
        name: res.data.variables[1].valueTexts[nth],
        code: item
      }));

      const years = res.data.variables[3].values;

      // our available chartTypes fit in here too
      const chartTypes = defaultChartTypes;

      const dataTitles = {
        chartTypes,
        substances,
        sectors,
        years
      };

      // use callback to update state
      if (typeof callback === 'function') callback(dataTitles);
    })
    .catch(error => {
      console.log('Tried to fetch data titles', error);
    });
};
