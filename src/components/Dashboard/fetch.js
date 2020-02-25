import React from 'react';
import axios from 'axios';

import { proxy, apiUrl, defaultChartTypes, queryBakery } from './default';

export const fetchDataTitles = () => {
  const stored = JSON.parse(sessionStorage.getItem('dataTitles'));

  if (stored) {
    console.log('got dataTitles from sessionStorage.');
    return stored;
  }

  axios
    .get(proxy + apiUrl)
    .then(res => {
      const substances = res.data.variables[0].values.map((item, nth) => ({
        name: res.data.variables[0].valueTexts[nth],
        code: item
      }));

      const sectors = res.data.variables[1].values.map((item, nth) => ({
        name: res.data.variables[1].valueTexts[nth],
        code: item
      }));

      const years = res.data.variables[3].values;

      this.setState({
        apiResponse: res
      });

      const chartTypes = defaultChartTypes;

      const dataTitles = {
        chartTypes,
        substances,
        sectors,
        years
      };

      // save in session
      sessionStorage.setItem('dataTitles', JSON.stringify(dataTitles));

      return dataTitles;
    })
    .catch(error => {
      console.log('DATA TITLES GET ERROR', error);
    });
};

export const fetchData = (by, value) => {
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
    .post(proxy + apiUrl, queryBakery(by, value))
    .then(res => {
      console.log('POST RES', res);

      // if fail, bail *temp
      if (res.status !== 200) {
        console.log('failed to fetch data');

        /* this.setState({
          apiResponse: res
        }); */

        return;
      }

      const data = res.data.data.map(item => {
        const year = parseInt(item.key[2]);
        //const sectorCode = item.key[1];
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

      //data = groupBy(data, 'substance')
      console.log('data', data);

      const sortedByYear = this.state.dataTitles.years.map(year => []);
      console.log('sorted pre', sortedByYear);

      const firstYear = this.state.dataTitles.years[0];

      data.forEach(item => {
        const yearIndex = item.year - firstYear;

        sortedByYear[yearIndex].push(item);
      });

      console.log('sorted', sortedByYear);

      /* const dataBySubstance = groupData(data, 'substance', 'code');
        const dataBySector = groupData(data, 'sector', 'code');

        console.log('data by substance', dataBySubstance);
        console.log('data by sector', dataBySector); */

      /* const group1 = groupedData[0];
        const restGroups = groupedData.slice(1, groupedData.length - 1);

        console.log('group1', group1, 'rest', restGroups); */

      // => {3: ["one", "two"], 5: ["three"]}

      /* // add data to cache
          cache[queryHash] = {
            data,
            timeStamp: Date.now()
          };
          localStorage.setItem('cache', JSON.stringify(cache)); */

      /* const charts = this.state.charts;

        charts[chartIndex].data = groupedData;

        this.setState({ charts }); */
    })
    .catch(error => {
      console.log('POST ERROR', error);
    });
  //}
  //this.getEmissionData();
};