import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Table from './Table';
import {
  defaultDataTitles,
  defaultDashboard,
  defaultTab,
  defaultChart
} from './default';

import { fetchDataTitles, fetchData } from './fetch';

const Options = styled.option``;

const Select = styled.select`
  height: 1.8rem;
  width: 10rem;
  margin: 1rem 0rem 0.6rem 0rem;
  outline: none;

  &.dropdown-content-substance {
    margin-left: 5rem;
  }

  &.dropdown-content-sector {
    margin-left: 2rem;
  }
`;

const DropdownContainer = styled.div`
  margin: auto;
  width: 85%;
  display: flex;
  justify-content: left;
  vertical-align: center;
`;

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataTitles: fetchDataTitles(),
      tabs: [],
      activeTab: null
    };

    this.newTab = this.newTab.bind(this);
    this.updateTabs = this.updateTabs.bind(this);
  }

  newTab = () => {
    const tabs = this.state.tabs;

    tabs.unshift(defaultTab);

    this.setState({ tabs });
  };

  updateTabs = (tab, nth) => {
    const tabs = this.state.tabs;
    tabs[nth] = tab;

    this.setState({
      tabs
    });
  };

  render() {
    const { tabs, activeTab, dataTitles } = this.state;
    const charts = tabs.charts ? tabs.charts : [];

    return (
      <>
        <button onClick={this.newTab}>New Tab</button>

        <div className="Tabs">
          {tabs.length > 0
            ? tabs.map((tab, nth) => (
                <Tab
                  key={nth}
                  tab={tab}
                  nth={nth}
                  dataTitles={dataTitles}
                  updateTabs={this.updateTabs}
                >
                  {charts.length > 0
                    ? charts.map((chart, nth) => (
                        <Chart key={nth} chart={chart} nth={nth} />
                      ))
                    : null}
                </Tab>
              ))
            : null}
        </div>
      </>
    );
  }
}

export default Dashboard;

class Tab extends Component {
  constructor(props) {
    super(props);

    this.chartFactory = this.chartFactory.bind(this);
    this.updateCat = this.updateCat.bind(this);
  }

  chartFactory = () => {
    const charts = [];

    for (let x = 0; x < 4; x++) {
      charts.push(defaultChart);
    }

    const tab = this.props.tab;
    tab.charts = charts;

    this.props.updateTabs(tab, this.props.nth);
  };

  updateCat = (prop, selected) => {
    const tab = this.props.tab;
    tab[prop] = selected;

    this.props.updateTabs(tab, this.props.nth);
  };

  updateData = () => {
    const tab = this.props.tab;
    const { catName, catValue } = tab;
    const data = null;
    const fetch = async () => {
      data = fetchData(catName, catValue);
      return await data;
    };

    tab.data = data;

    console.log('updating data', catName, catValue, data);

    //this.props.updateTabs(tab, this.props.nth);
  };

  renderCharts = () => {
    const tab = this.props.tab;
    const { data, charts } = tab;

    return charts.length > 0
      ? charts.map((chart, nth) => (
          <Chart key={nth} chart={chart} nth={nth} data={data} />
        ))
      : null;
  };

  render() {
    const { tab, dataTitles } = this.props;
    const { catName, catValue, data } = tab;
    const catNameSingular =
      tab.catName === 'substances' ? 'substance' : 'sector';

    if (catValue && !data) {
      this.updateData();
    }

    return (
      <>
        <p>Select Your Data</p>

        <select
          defaultValue="default"
          onChange={e => this.updateCat('catName', e.target.value)}
        >
          <option disabled value="default">
            - based on category -
          </option>
          <option value="substances">Substance</option>
          <option value="sectors">Sector</option>
        </select>

        {tab.catName ? (
          <DropdownContainer className="dropdown-container">
            {/* <TableHead className='dropdown-button'>Substance</TableHead> */}
            <Select
              className="dropdown-content-substance"
              onChange={e => this.updateCat('catValue', e.target.value)}
              defaultValue="default"
            >
              <Options disabled value="default">
                - select a {catNameSingular} -
              </Options>
              {dataTitles[catName].map(item => (
                <Options key={item.code} value={item.code}>
                  {item.name}
                </Options>
              ))}
            </Select>
          </DropdownContainer>
        ) : null}

        {tab.catValue
          ? tab.charts.length < 1
            ? this.chartFactory()
            : this.renderCharts()
          : null}
      </>
    );
  }
}

class Chart extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { chart, nth } = this.props;
    return <p>A chart! index {nth}</p>;
  }
}
