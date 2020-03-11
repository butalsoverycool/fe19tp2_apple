import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { compose } from 'recompose';

import { proxy, apiUrl, queryBakery, defaultChart } from '../default';
import { withFirebase } from '../../Firebase';
import allEmissionData from '../allEmissionData';

import TabSettings from './TabSettings';
import Charts from './Charts';
import { withDashboard } from '../context';

const TabWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const TabTitle = styled.h2`
  position: absolute;
  left: 2rem;
  top: 2.5rem;
  font-size: 2rem;

  @media screen and (max-width: 700px) {
    font-size: 1.5rem;
    top: 3.5rem;
  }

  @media screen and (max-width: 500px) {
    font-size: 1rem;
    top: 4.5rem;
  }

  @media screen and (max-width: 380px) {
    font-size: 0.7rem;
    top: 5rem;
  }

  background-color: #ccc;
  color: transparent;
  text-shadow: 2px 2px 3px rgba(255, 255, 255, 0.5);
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
`;

const ChartsWrapper = styled.div`
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  top: 40px;
  position: relative;

  @media print {
    display: block !important;
  }
`;

class ActiveTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      chartsLoaded: false
    };

    this.dropDownHandler = this.dropDownHandler.bind(this);
    this.updateData = this.updateData.bind(this);
    this.hideChart = this.hideChart.bind(this);
    this.updateName = this.updateName.bind(this);
    this.chartsLoaded = this.chartsLoaded.bind(this);
  }

  hideChart = id => {
    const hiddenCharts = this.props.hiddenCharts;
    const newVal = hiddenCharts.filter(chart => chart.id !== id);
    this.props.updateHiddenCharts(newVal);
  };

  dropDownHandler = (key, val) => {
    const { dataTitles, activeTab } = this.props.dashboard.state;
    const { updateTab } = this.props.dashboard.setters;

    activeTab[key] = val;

    // if catVal is changed, update data
    if (key === 'catVal') {
      this.updateData();
      return;
    }

    // if catKey is changed, reset val (and data)
    if (key === 'catKey') {
      const catRes = val === 'substances' ? 'sectors' : 'substances';
      activeTab.catVal = null;
      activeTab.catRes = catRes;
      activeTab.charts = [];
      activeTab.timespan = {
        from: Number(dataTitles.years[0]),
        to: Number(dataTitles.years[dataTitles.years.length - 1])
      };
    }

    updateTab(activeTab);
  };

  updateData = () => {
    //const { setFetchingCharts } = this.props.dashboard.setters;
    //setFetchingCharts({ started: true, ended: false });

    const { activeTab, dataTitles } = this.props.dashboard.state;
    const { updateTab, setStorage } = this.props.dashboard.setters;
    const { catKey, catVal, catRes, chartType } = activeTab;

    const query = queryBakery(catKey, catVal);

    const processData = input => {
      const data = input.map((item, nth) => {
        const year = parseInt(item.key[2]);

        const sector = {
          name: dataTitles.sectors.filter(sect => sect.code === item.key[1])[0]
            .name,
          code: item.key[1]
        };

        //const substance = item.key[0];
        const substance = {
          name: dataTitles.substances.filter(
            subs => subs.code === item.key[0]
          )[0].name,
          code: item.key[0]
        };

        const value = parseInt(item.values[0]) || 0;

        /* return defaultChart({ year, sector, substance, value }, nth); */
        return {
          year,
          sector,
          substance,
          value
        };
      });

      // sort data based on category key/val
      const sortedObj = {};

      dataTitles[catRes].forEach(item => {
        sortedObj[item.code] = [];
      });

      const catResSingular = catRes.slice(0, -1);

      data.forEach((item, nth) => {
        const itemKey = item[catResSingular].code || item[catResSingular];

        sortedObj[itemKey].id = 'chart-' + nth;
        sortedObj[itemKey].push(item);
      });

      const sortedArr = Object.values(sortedObj);

      const charts = sortedArr.map((item, nth) =>
        defaultChart(item, nth, chartType)
      );
      //console.log('data sorted based on catKey/Val', sortedArr);

      activeTab.charts = charts;

      setStorage('activeTab', activeTab);
      updateTab(activeTab);
    };

    axios
      .post(proxy + apiUrl, query)
      .then(res => {
        processData(res.data.data);
      })
      .catch(error => {
        console.log('POST ERROR', error);
        processData(allEmissionData);
      });
  };

  updateName(e) {
    this.setState({
      name: e.target.value
    });
  }

  chartsLoaded() {
    if (this.state.chartsLoded) return;

    this.setState({ chartsLoaded: true });

    const { fetchingCharts } = this.props.dashboard.state;
    const { setFetchingCharts } = this.props.dashboard.setters;

    if (fetchingCharts.started) {
      setFetchingCharts({ started: true, ended: true });
    }
  }

  render() {
    const { activeTab: tab } = this.props.dashboard.state;

    const { catVal, name } = tab;

    let tabName = name || '';
    if (tabName.length > 25) {
      tabName = tabName.slice(0, 25) + '...';
    }

    tab.charts = tab.charts || [];

    return (
      <TabWrapper className={'Tab-' + tab.name}>
        {tab.charts.length > 0 ? (
          <TabTitle>{tabName}</TabTitle>
        ) : (
          <TabSettings />
        )}

        <ChartsWrapper>
          {catVal ? <Charts /> : null}

          {this.props.children}
        </ChartsWrapper>
      </TabWrapper>
    );
  }
}

export default compose(withFirebase, withDashboard)(ActiveTab);
