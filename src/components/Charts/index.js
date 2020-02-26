import React, { Component, useState } from 'react';
import axios from 'axios';
import Table from './Table';
import Timespan from './Timespan';
/* import Preview from './Preview'; */
import ChartHeader from './ChartHeader';
import ChartTemplate from './ChartTemplate';
import styled from 'styled-components';

import exampleData, {
  availableData,
  exampleChartData,
  exampleUser
} from './exampleData';
//import Preview from './Preview';
import md5 from 'md5';

const proxy = 'https://cors-anywhere.herokuapp.com/';
const emissionTable =
  'http://api.scb.se/OV0104/v1/doris/en/ssd/START/MI/MI0108/TotaltUtslapp';

const GridContainer = styled.div`
  grid-column-start: 2;
  grid-column-end: span 8;
  border-radius: 15px;
  background-color: gainsboro;
`;

const allEmissionQuery = {
  query: [],
  response: {
    format: 'json'
  }
};

const queryBakery = {
  /* const substancesAdded = this.state.substancesAdded.map(item => item.code)
  const sectorsAdded = this.state.sectorsAdded.map(item => item.code) */

  query: [
    {
      code: 'Luftfororening',
      selection: {
        filter: 'item',
        values: ['BC'] // this value should be updated depending on substancesAdded-state
      }
    },
    {
      code: 'Sektor',
      selection: {
        filter: 'item',
        values: ['0.5'] // this value should updated depending on sectorsAdded-state
      }
    }
  ],
  response: { format: 'json' }
};

const groupData = function(arr, key1, key2) {
  const obj = arr.reduce(function(res, item) {
    (res[item[key1][key2]] = res[item[key1][key2]] || []).push(item);

    return res;
  }, {});

  /* const res = [];
  for (let prop in obj) {
    res.push(obj[prop]);
  } */

  return obj;
};

class Charts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: null,
      dataTitles: {
        chartTypes: ['area', 'bar'],
        substances: [],
        sectors: [],
        years: []
      },
      data: null,
      charts: []
      /* dataRequest: null, // availableData.dataRequest, // [], // temp to skip reqs
      substances: /* availableData.substances, //  [],
      sectors: /* availableData.sectors, // [],
      years: /* availableData.years, //  [],
      limit: { from: 0, to: 28 },
      isLoading: false,

      substancesAdded: [],
      sectorsAdded: [],
      yearsAdded: [] */
    };

    this.fetchDataTitles = this.fetchDataTitles.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.tableHandler = this.tableHandler.bind(this);
    this.setChartType = this.setChartType.bind(this);
    this.pushRangeLimit = this.pushRangeLimit.bind(this);
    //this.setRangeLimit = this.setRangeLimit.bind(this);
    this.setActiveClass = this.setActiveClass.bind(this);
    this.newChart = this.newChart.bind(this);

    this.tableConfig = this.tableConfig.bind(this);

    this.setSectors = this.setSectors.bind(this);

    this.chartBakery = this.chartBakery.bind(this);
    this.chartDataBakery = this.chartDataBakery.bind(this);
  }

  componentDidMount() {
    // TEMP skip GET request for available data
    /* const library = this.state.library;
    library.substances = availableData.substances;
    library.sectors = availableData.sectors;
    library.years = availableData.years;
    this.setState({
      apiResponse: availableData.apiResponse,
      library
    }); */

    const { dataTitles, data } = this.state;

    // get data titles
    this.fetchDataTitles();

    //this.fetchData();

    /* this.fetchData(
      {
        query: [],
        response: {
          format: 'json'
        }
      },
      0
    ); */

    // TEMP load user charts
    /* this.setState({
      charts: exampleUser.charts
    }); */

    //this.fetchDataTitles();
  }

  newChart = () => {
    const charts = this.state.charts;

    const chart = this.chartBakery();
    chart.data = [[...chart.data]];
    charts.unshift(chart);

    this.setState({
      charts
    });
  };

  chartBakery = () => {
    const chart = {
      type: 'area',
      sectors: [
        {
          name: '*sector*',
          code: '0.5'
        }
      ],
      substances: [
        {
          name: '*substance*',
          code: 'NOx'
        }
      ],
      limit: { from: 0, to: 100 },
      data: this.chartDataBakery()
    };

    return chart;
  };

  chartDataBakery = () => {
    const values = Math.floor(Math.random() * Math.floor(5)) + 3; // rand 3-7
    const arr = [];

    for (let i = 0; i < values; i++) {
      const value = {
        year: '*time ' + i + '*',
        sector: {
          name: '*Sector*',
          code: '*Sector code*'
        },
        substance: {
          name: '*Substance*',
          code: '*Substance code*'
        },
        value: Math.floor(Math.random() * Math.floor(5)) + 1
      };

      arr.push(value);
    }

    return arr;
  };

  fetchDataTitles = () => {
    const updateState = titles => {
      // update state
      this.setState({
        dataTitles: titles
      });
    };

    const stored = JSON.parse(sessionStorage.getItem('dataTitles'));
    if (stored) {
      console.log('got dataTitles from sessionStorage.');
      updateState(stored);
      return;
    }

    axios
      .get(proxy + emissionTable)
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

        const chartTypes = this.state.dataTitles.chartTypes;

        const dataTitles = {
          chartTypes,
          substances,
          sectors,
          years
        };

        updateState(dataTitles);

        // save in session
        sessionStorage.setItem('dataTitles', JSON.stringify(dataTitles));
      })
      .catch(error => {
        console.log('GET ERROR', error);
      });
  };

  fetchData(query, chartIndex, substancesLength) {
    const updateState = item => {
      this.setState({
        data: item
      });
    };

    // try load from sessionStorage
    const stored = JSON.parse(sessionStorage.getItem('data'));
    if (stored) {
      updateState(stored);
      console.log('got data from sessionStorage.');
      return;
    }

    axios
      .post(proxy + emissionTable, allEmissionQuery)
      .then(res => {
        // if fail, bail. *temp
        if (res.status !== 200) {
          console.log('failed to fetch data');

          this.setState({
            apiResponse: res
          });

          return;
        }

        const data = res.data.data.map(item => {
          const year = parseInt(item.key[2]);
          const sector = {
            name: this.state.dataTitles.sectors.filter(
              sect => sect.code === item.key[1]
            )[0].name,
            code: item.key[1]
          };
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

        // group all data by year
        const sortedByYear = this.state.dataTitles.years.map(year => []);
        const firstYear = this.state.dataTitles.years[0];

        data.forEach(item => {
          const yearIndex = item.year - firstYear;
          sortedByYear[yearIndex].push(item);
        });

        // update state
        this.setState({
          data: sortedByYear
        });

        // update sessionStorage
        sessionStorage.setItem('data', JSON.stringify(sortedByYear));
      })
      .catch(error => {
        console.log('POST ERROR', error);
      });
    //}
  }

  postEmissionData(query, chartIndex, substancesLength) {
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
      .post(proxy + emissionTable, allEmissionQuery)
      .then(res => {
        console.log('POST RES', res);

        // if fail, bail *temp
        if (res.status !== 200) {
          console.log('failed to fetch data');

          this.setState({
            apiResponse: res
          });

          return;
        }

        window.allData = res.data.data;

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
    this.getEmissionData();
  }

  //Bug - if you go further back then data[0] (so limit: to: becomes -1 or more the app crashes)
  pushRangeLimit(endPoint, reaseType) {
    let limit = this.state.limit;
    const from = endPoint === 'from' ? true : false;
    const dec = reaseType === 'dec' ? true : false;
    const otherPoint = from ? 'to' : 'from';

    if (dec) {
      // - from
      if (from) {
        // fromPoint can't go below first year
        if (limit.from <= 0) return;
      }
      // - to
      else {
        // toPoint must be more than fromPoint
        if (limit.to <= limit.from) return;
      }
      limit[endPoint]--;
    } else {
      // + from
      if (from) {
        // fromPoint must be less than toPoint
        if (limit.from >= limit.to) return;
      }
      // + to
      else {
        // toPoint can't go over last year
        if (limit.to >= this.state.years.length - 1) return;
      }

      limit[endPoint]++;
    }

    this.setState({
      limit
    });
  }

  /* setRangeLimit(range = 'max') {
    let limit = this.state.limit;

    const maxRange = range === 'max' ? true : false;

    // if max: max range, else: count backwards from toPoint (minimum 0)
    limit.from = maxRange ? 0 : Math.max(0, limit.to - range + 1);
    limit.to = maxRange ? this.state.years.length - 1 : limit.to;

    this.setState({
      limit
    });
  } */

  setChartType = (chartIndex, type) => {
    const charts = this.state.charts;
    let updatedChart = { ...this.state.charts[chartIndex] };
    updatedChart.type = type;

    charts[chartIndex] = updatedChart;

    this.setState({ charts });
  };

  tableConfig = (chartIndex, clicked, listName) => {
    const charts = this.state.charts;
    const chart = charts[chartIndex];
    const list = chart[listName];

    console.log('LIST', list);

    /* let newSubstances = substances.includes(clicked)
      ? substances.filter(item => item !== clicked && item.name)
      : [...substances, clicked]; */

    let newList = list.includes(clicked)
      ? list.filter(item => item !== clicked && item.name)
      : [...list, clicked];

    // display example-substance only if no other chosen
    let exampleList = false;
    const exampleObject =
      listName === 'substances'
        ? {
            name: '*Substance*',
            code: 'NOx'
          }
        : {
            name: '*Sector*',
            code: '0.5'
          };

    if (newList.length < 1) {
      newList.push(exampleObject); // exampleData

      charts[chartIndex].data = this.chartDataBakery();
      exampleList = true;
    } else if (newList.length > 1) {
      exampleList = false;
      newList = newList.filter(
        item => item.name !== '*substance*' && item.name !== '*sector*'
      ); // exampleData
    }

    console.log('index', chartIndex, 'list', list);

    charts[chartIndex][listName] = newList;

    //if (exampleList) return;

    console.log('NEWLIST', newList);

    // update data

    // choices
    const addedSubstances = chart.substances;
    const addedSectors = chart.sectors;

    console.log('added', addedSubstances);

    // filter data
    const allData = this.state.data;

    const filtered = allData.map(year =>
      year.filter(
        item =>
          addedSubstances.some(added => added.code === item.substance.code) &&
          addedSectors.some(added => added.code === item.sector.code)
      )
    );

    charts[chartIndex].data = filtered;

    this.setState({
      charts
    });

    console.log('SUB FILTERED', filtered);

    /* const queryIndex = listName === 'substances' ? 0 : 1;

        const query = queryBakery;

        query.query[queryIndex].selection.values = newList.map(item => item.code);

        console.log('post query', query);

        this.fetchData(query, chartIndex, newList.length); */
  };

  setSectors = () => {
    //...
  };

  tableHandler = (itemToParse, array) => {
    const item = JSON.parse(itemToParse);
    const indicator = array === 'substancesAdded' ? 0 : 1;
    const oldArray = this.state[array];
    let newArr;
    oldArray.includes(item)
      ? /*  ? this.setState(prevState => {
          newArr = prevState[array].filter(el => el !== item);

          const substancesAdded = newArr.map(item => item.code);
          const sectorsAdded = newArr.map(item => item.code);

          queryBakery.query[indicator].selection.values =
            indicator === 0 ? substancesAdded : sectorsAdded;
          this.fetchData(queryBakery);
          return {
            [array]: newArr
          };
        })
      : this.setState(prevState => {
          newArr = [...prevState[array], item];

          const substancesAdded = newArr.map(item => item.code); */
        /* const sectorsAdded = newArr.map(item => item.code); */

        this.setState(prevState => {
          newArr = prevState[array].filter(el => el !== item);
          console.log(newArr);
          const substancesAdded = newArr.map(item => item.code);
          const sectorsAdded = newArr.map(item => item.code);

          queryBakery.query[indicator].selection.values =
            indicator === 0 ? substancesAdded : sectorsAdded;
          this.postEmissionData(queryBakery);
          return {
            [array]: newArr
          };
        })
      : this.setState(prevState => {
          newArr = [...prevState[array], item];
          console.log(newArr);
          const substancesAdded = newArr.map(item => item.code);
          /* const sectorsAdded = newArr.map(item => item.code); */

          queryBakery.query[indicator].selection.values = substancesAdded;

          this.fetchData(queryBakery);
          return {
            [array]: newArr
          };
        });
    /* this.fetchData(queryBakery); */ //don't think we need another request here.
  };

  setActiveClass = (item, arr = []) => {
    return arr.includes(item) ? 'active' : '';
  };

  getEmissionData() {
    axios
      .get(proxy + emissionTable)
      .then(res => {
        console.log('GET Succes (emissionTable)');

        const substances = res.data.variables[0].values.map((item, nth) => ({
          name: res.data.variables[0].valueTexts[nth],
          code: item
        }));

        const sectors = res.data.variables[1].values.map((item, nth) => ({
          name: res.data.variables[1].valueTexts[nth],
          code: item
        }));

        const years = res.data.variables[3].values;
        const dataRequest = res;

        this.setState({
          substances,
          sectors,
          years,
          dataRequest
        });
      })
      .catch(error => {
        console.log('GET ERROR', error);
      });
  }

  postEmissionData(query) {
    /* // temp to skip reqs
    /* console.log(query);
    axios
      .post(proxy + emissionTable, query)
      .then((res) => {
        console.log('POST SUCCESS');
        console.log(this.state.substancesAdded);
        const data = res.data.data.map((item) => {
          const year = item.key[2];
          const sector = item.key[1];
          const substance = item.key[0];
          const toParse = item.values[0];
          const values = parseInt(toParse); */
    /*
    const data = exampleData.map(item => ({
      year: item.year,
      sector: item.sector,
      substance: item.substance,
      values: item.values
    }));

    this.setState({
      data
    });

    return; */

    const queryHash = md5(JSON.stringify(query));

    const cache = JSON.parse(localStorage.getItem('dataCache'));

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
      // if not found in cache then fetch from API
      axios
        .post(proxy + emissionTable, query)
        .then(res => {
          console.log('POST RES', res);
          const data = res.data.data.map(item => {
            const year = item.key[2];
            const sector = item.key[1];
            //const substance = item.key[0];
            const substance = {
              name: this.state.substances.filter(
                subs => subs.code === item.key[0]
              )[0].name,
              code: item.key[0]
            };
            const toParse = item.values[0];
            const values = parseInt(toParse);

            return {
              year,
              sector,
              substance,
              values
            };
          });

          // add data to cache
          cache[queryHash] = {
            data,
            timeStamp: Date.now()
          };
          localStorage.setItem('cache', JSON.stringify(cache));

          this.setState({ data });
        })
        .catch(error => {
          console.log('POST ERROR', error);
        });
    }
  }

  render() {
    const { charts, dataTitles, data } = this.state;
    const totalTimespan = dataTitles.years.length - 1 || 0;

    /* const sliceData = () => {
      //Function that fires when !state.data. See Preview & ChartHeader component to follow the function.
      const dataIsSliced = data.slice(
        this.state.limit.from,
        this.state.limit.to + 1 || data.length - 1
      );
      return dataIsSliced;
    }; */

    //const totalTimespan = data ? data.length - 1 : 0;

    return (
      <GridContainer>
        <button onClick={this.newChart}>NEW CHART</button>

        {charts.length > 0
          ? charts.map((chart, nth) => (
              <div key={nth} className="chartContainer">
                <ChartHeader
                  dataTitles={dataTitles}
                  chart={chart}
                  chartIndex={nth}
                />

                <Table
                  setActiveClass={this.setActiveClass}
                  tableHandler={this.tableHandler}
                  dataTitles={this.state.dataTitles}
                  chart={chart}
                  chartIndex={nth}
                />

                {chart.data ? (
                  <ChartTemplate chart={chart} chartIndex={nth}></ChartTemplate>
                ) : null}

                <Timespan
                  chart={chart}
                  totalTimespan={totalTimespan}
                  pushRangeLimit={this.pushRangeLimit}
                  setRangeLimit={this.setRangeLimit}
                />
              </div>
            ))
          : null}

        {/* <ChartHeader
          data={
            data
              ? sliceData()
              : console.log(
                  'ChartHeader = need to select substance/sector to show header'
                )
          }
          sectors={this.state.sectors}
        />

        <Table
          setActiveClass={this.setActiveClass}
          tableHandler={this.tableHandler}
          dataTitles={this.state.dataTitles}
          charts={this.state.charts}
        />

        {data ? (
          <ChartTemplate
            charts={this.state}
            data={
              data
                ? sliceData()
                : console.log(
                    'Preview = need to select substance, sector for preview to show'
                  )
            }
            sectors={this.state.sectors}
            limit={this.state.limit}
          >
            {' '}
            >
          </ChartTemplate>
        ) : null}

        <Timespan
          data={this.state.data}
          limit={this.state.limit}
          // update={(key, val) => this.updateConfig(key, val)} 
          totalTimespan={totalTimespan}
          pushRangeLimit={this.pushRangeLimit}
          setRangeLimit={this.setRangeLimit}
        /> */}
      </GridContainer>
    );
  }
}

export default Charts;
