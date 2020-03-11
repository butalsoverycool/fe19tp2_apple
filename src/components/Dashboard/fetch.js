import axios from 'axios';

import { proxy, apiUrl, defaultChartTypes, queryBakery } from './default';

export const fetchDataTitles = callback => {
  // ---- temp*** session not used
  const stored = JSON.parse(sessionStorage.getItem('dataTitles'));

  if (stored) {
    console.log('got dataTitles from sessionStorage.');
    return stored;
  }
  // ---- temp***

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
      console.log('DATA TITLES GET ERROR', error);
    });
};

export const fetchData = (by, value, dataTitles) => {
  const query = queryBakery(by, value);
  /*  const queryHash = md5(JSON.stringify(query));

    const cache = JSON.parse(localStorage.getItem('dataCache')) || null;

    // if cache object doesn't exists, create it
    if (!cache) localStorage.setItem('dataCache', JSON.stringify({}));

    // if cache found and not older than 1 week
    if (
      cache[queryHash] &&
      cache[queryHash].timeStamp > Date.now() - 504000000
    ) {
      // update data in state
      this.setState({ data: cache[queryHash].data });
    } else {
      // if not found in cache then fetch from API */

  axios
    .post(proxy + apiUrl, query)
    .then(res => {
      console.log('POST RES', res);

      const data = res.data.data.map(item => {
        const year = parseInt(item.key[2]);

        const sector = {
          name: this.state.dataTitles.sectors.filter(
            sect => sect.code === item.key[1]
          )[0].name,
          code: item.key[1]
        };

        //const substance = item.key[0];
        const substance = {
          name: this.state.dataTitles.substances.filter(
            subs => subs.code === item.key[0]
          )[0].name,
          code: item.key[0]
        };
        const value = parseInt(item.values[0]);

        return {
          year,
          sector,
          substance,
          value
        };
      });

      return data;
    })
    .catch(error => {
      console.log('POST ERROR', error);
    });
};
