import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Table from './Table';
import md5 from 'md5';

import Timespan from './Timespan';
import Preview from './Preview';

import exampleData, {
  availableData,
  exampleChartData,
  exampleUser
} from './exampleData';

const proxy = 'https://cors-anywhere.herokuapp.com/';
const emissionTable =
  'http://api.scb.se/OV0104/v1/doris/sv/ssd/START/MI/MI0108/TotaltUtslapp';

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

const chartDataBakery = () => {
  const values = Math.floor(Math.random() * Math.floor(5)) + 3; // rand 3-7
  const arr = [];

  for (let i = 0; i < values; i++) {
    const value = {
      year: '*time ' + i + '*',
      sector: '*Unknown area ' + i + '*',
      substance: {
        name: '*Unknown substance*',
        code: '*unit*'
      },
      value: Math.floor(Math.random() * Math.floor(5)) + 1
    };

    arr.push(value);
  }

  return arr;
};

const chartBakery = () => {
  const chart = {
    type: 'area',
    sectors: ['*Unknown area*'],
    substances: [
      {
        name: '*substance*',
        code: '*unit*'
      }
    ],
    limit: { from: 0, to: 100 },
    data: chartDataBakery()
  };

  return chart;
};

const groupData = function(arr, key1, key2) {
  const obj = arr.reduce(function(res, item) {
    (res[item[key1][key2]] = res[item[key1][key2]] || []).push(item);

    return res;
  }, {});

  const res = [];
  for (let prop in obj) {
    res.push(obj[prop]);
  }

  return res;
};

class Charts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      apiResponse: null,
      charts: [],
      library: {
        chartTypes: ['area', 'bar'],
        substances: [],
        sectors: [],
        years: []
      }
    };

    this.getEmissionData = this.getEmissionData.bind(this);
    this.postEmissionData = this.postEmissionData.bind(this);
    this.tableHandler = this.tableHandler.bind(this);
    this.setChartType = this.setChartType.bind(this);
    this.pushRangeLimit = this.pushRangeLimit.bind(this);
    this.setRangeLimit = this.setRangeLimit.bind(this);
    this.setActiveClass = this.setActiveClass.bind(this);
    this.newChart = this.newChart.bind(this);
    this.setSubstances = this.setSubstances.bind(this);
  }

  componentDidMount() {
    // TEMP skip GET request for available data
    const library = this.state.library;
    library.substances = availableData.substances;
    library.sectors = availableData.sectors;
    library.years = availableData.years;
    this.setState({
      apiResponse: availableData.apiResponse,
      library
    });

    // TEMP load user charts
    /* this.setState({
      charts: exampleUser.charts
    }); */

    //this.getEmissionData();
  }

  newChart = () => {
    const charts = this.state.charts;

    const chart = chartBakery();
    chart.data = [[...chart.data]];
    charts.unshift(chart);

    this.setState({
      charts
    });
  };

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

  setRangeLimit(range = 'max') {
    let limit = this.state.limit;

    const maxRange = range === 'max' ? true : false;

    // if max: max range, else: count backwards from toPoint (minimum 0)
    limit.from = maxRange ? 0 : Math.max(0, limit.to - range + 1);
    limit.to = maxRange ? this.state.years.length - 1 : limit.to;

    this.setState({
      limit
    });
  }

  setChartType = (chartIndex, type) => {
    const charts = this.state.charts;
    let updatedChart = { ...this.state.charts[chartIndex] };
    updatedChart.type = type;

    charts[chartIndex] = updatedChart;

    this.setState({ charts });
  };

  setSubstances = (chartIndex, item) => {
    const charts = this.state.charts;
    const substances = charts[chartIndex].substances;

    let newSubstances = substances.includes(item)
      ? substances.filter(sub => sub !== item && sub.name)
      : [...substances, item];

    // display example-substance only if no other chosen
    let exampleSubstance = false;

    if (newSubstances.length < 1) {
      newSubstances.push({ name: '*substance*', code: '*unit*' });
      charts[chartIndex].data = chartDataBakery();
      exampleSubstance = true;
    } else if (newSubstances.length > 1) {
      exampleSubstance = false;
      newSubstances = newSubstances.filter(sub => sub.name !== '*substance*');
    }

    console.log('index', chartIndex, 'subs', substances);

    charts[chartIndex].substances = newSubstances;

    this.setState(
      {
        charts
      },
      () => {
        if (exampleSubstance) return;

        const query = queryBakery;
        query.query[0].selection.values = newSubstances.map(sub => sub.code);

        console.log('post query', query);

        this.postEmissionData(query, chartIndex, newSubstances.length);
      }
    );
  };

  tableHandler = (item, array) => {
    const indicator = array === 'substancesAdded' ? 0 : 1;
    const oldArray = this.state[array];
    let newArr;
    oldArray.includes(item)
      ? this.setState(prevState => {
          newArr = prevState[array].filter(el => el !== item);

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

          const substancesAdded = newArr.map(item => item.code);
          /* const sectorsAdded = newArr.map(item => item.code); */

          queryBakery.query[indicator].selection.values = substancesAdded;

          this.postEmissionData(queryBakery);
          return {
            [array]: newArr
          };
        });
    /* this.postEmissionData(queryBakery); */ //don't think we need another request here.
  };

  setActiveClass = (item, arr = []) => {
    return arr.includes(item) ? 'active' : '';
  };

  getEmissionData() {
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

        const apiResponse = res;

        this.setState({
          substances,
          sectors,
          years,
          apiResponse
        });
      })
      .catch(error => {
        console.log('GET ERROR', error);
      });
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
      .post(proxy + emissionTable, query)
      .then(res => {
        console.log('POST RES', res);

        const data = res.data.data.map(item => {
          const year = item.key[2];
          const sector = item.key[1];
          //const substance = item.key[0];
          const substance = {
            name: this.state.library.substances.filter(
              subs => subs.code === item.key[0]
            )[0].name,
            code: item.key[0]
          };
          const toParse = item.values[0];
          const value = parseInt(toParse);

          return {
            year,
            sector,
            substance,
            value
          };
        });

        //data = groupBy(data, 'substance')
        console.log('data', data);

        const groupedData = groupData(data, 'substance', 'code');

        console.log('data splitted', groupedData);

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
        const charts = this.state.charts;
        charts[chartIndex].data = groupedData;

        this.setState({ charts });
      })
      .catch(error => {
        console.log('POST ERROR', error);
      });
    //}
  }

  render() {
    const { charts, data } = this.state;
    const totalTimespan = data ? data.length - 1 : 0;

    return (
      <div>
        <button onClick={this.newChart}>NEW CHART</button>

        {charts.length > 0
          ? charts.map((chart, nth) => (
              <div key={nth} className="chartContainer">
                <Table
                  setActiveClass={this.setActiveClass}
                  setSubstances={this.setSubstances}
                  setChartType={this.setChartType}
                  library={this.state.library}
                  chart={charts[nth]}
                  chartIndex={nth}
                />

                <Preview chart={chart} chartType={chart.type} />

                <Timespan
                  data={chart.data}
                  limit={chart.limit}
                  totalTimespan={totalTimespan}
                  pushRangeLimit={this.pushRangeLimit}
                  setRangeLimit={this.setRangeLimit}
                />
              </div>
            ))
          : null}
      </div>
    );
  }
}

export default Charts;
