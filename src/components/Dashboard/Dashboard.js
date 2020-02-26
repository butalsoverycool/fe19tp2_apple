import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { proxy, apiUrl, queryBakery } from './default';

import Table from './Table';
import ChartTemplate from './ChartTemplate';

import {
  defaultDataTitles,
  defaultDashboard,
  defaultTab,
  defaultChart
} from './default';

import { fetchDataTitles, fetchData } from './fetch';

//temp styles
const Wrapper = styled.div`
  position: absolute;
  left: 0;
  width: 50vw;
  display: flex;
  justify-content: left;
  flex-wrap: nowrap;
`;

const ChartContainer = styled.div`
  max-width: 500px;
`;

const buttonBgs = type => {
  switch (type) {
    case 'add':
      return '#e8ffe9';
    case 'delete':
      return '#fcf0f0';
    default:
      return 'none';
  }
};

const Btn = styled.button`
  width: 10rem;
  height: 1.8rem;
  margin: 1rem 0rem;
  box-shadow: 0 0 20px #ddd;
  background: ${props => (props.type ? buttonBgs(props.type) : 'none')};
  border: none;
  outline: none;
`;

const TabName = styled.input`
  width: 10rem;
  height: 1.8rem;
  margin: 0 1rem 1rem 0;
  box-shadow: 0 0 20px #ddd;
  background: none;
  border: none;
  outline: none;
  text-align: center;
`;

const Option = styled.option``;

const Select = styled.select`
  height: 1.8rem;
  width: 10rem;
  margin: 0 1rem 1rem 0;
  outline: none;
`;

const DropdownContainer = styled.div`
  margin: 0;
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
      tabs: JSON.parse(localStorage.getItem('Tabs')) || [],
      activeTab: null
    };

    this.newTab = this.newTab.bind(this);
    this.setStorage = this.setStorage.bind(this);
    this.updateTabs = this.updateTabs.bind(this);
    this.deleteTab = this.deleteTab.bind(this);
    /* this.createCharts = this.createCharts.bind(this);
    this.getCharts = this.getCharts.bind(this);
    this.updatecharts = this.updatecharts.bind(this); */
  }

  setStorage = (key, val) => {
    localStorage.setItem(key, JSON.stringify(val));
  };

  newTab = () => {
    const tabs = this.state.tabs;

    tabs.unshift(defaultTab());

    this.setState({ tabs });

    this.setStorage('Tabs', tabs);
  };

  updateTabs = (tab, tabIndex) => {
    const tabs = this.state.tabs;
    tabs[tabIndex] = tab;

    this.setState({ tabs });

    this.setStorage('Tabs', tabs);
  };

  deleteTab = tabIndex => {
    const tabs = this.state.tabs;
    tabs.splice(tabIndex, 1);
    this.setState({ tabs });

    this.setStorage('Tabs', tabs);
  };

  render() {
    const { tabs, activeTab, dataTitles } = this.state;

    return (
      <Wrapper style={{ marginTop: '100px' /* tempMargin */ }}>
        <Btn type="add" onClick={this.newTab}>
          New Tab
        </Btn>

        <div className="Tabs">
          {tabs.length > 0
            ? tabs.map((tab, tabIndex) => (
                <Tab
                  key={tabIndex}
                  dataTitles={dataTitles}
                  tabIndex={tabIndex}
                  tabContent={tab}
                  updateTabs={this.updateTabs}
                  updateCat={this.updateCat}
                >
                  <Btn onClick={() => this.deleteTab(tabIndex)} type="delete">
                    Delete Tab
                  </Btn>
                </Tab>
              ))
            : null}
        </div>
      </Wrapper>
    );
  }
}

export default Dashboard;

class Tab extends Component {
  constructor(props) {
    super(props);

    this.updateCat = this.updateCat.bind(this);
    this.updateTab = this.updateTab.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  updateTab = (key, val, tabIndex) => {
    const tabContent = this.props.tabContent;

    tabContent[key] = val;

    // if catKey is changed, reset val (and data)
    if (key === 'catKey') {
      tabContent.catVal = null;
      tabContent.data = null;
    }
    // if catVal is changed, update data
    else if (key === 'catVal') {
      this.updateData(tabIndex);
    }

    this.props.updateTabs(tabContent, tabIndex);
  };

  updateCat = (tabIndex, propName, selected) => {
    const tabContent = this.props.tabContent;

    tabContent[propName] = selected;

    this.props.updateTabs(tabContent, tabIndex);
  };

  updateData = tabIndex => {
    const { tabContent, dataTitles } = this.props;

    const { catKey, catVal } = tabContent;

    const query = queryBakery(catKey, catVal);

    axios
      .post(proxy + apiUrl, query)
      .then(res => {
        //console.log('POST RES', res);

        const data = res.data.data.map(item => {
          const year = parseInt(item.key[2]);

          const sector = {
            name: dataTitles.sectors.filter(
              sect => sect.code === item.key[1]
            )[0].name,
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

          return {
            year,
            sector,
            substance,
            value
          };
        });

        console.log('formated data', data);

        // sort data by year
        const sortedByYear = dataTitles.years.map(year => []);

        const firstYear = dataTitles.years[0];

        const antiKey = catKey === 'substances' ? 'sectors' : 'substances';
        const antiKeySingular = antiKey.slice(0, -1);

        const sortedObj = {};
        dataTitles[antiKey].forEach(item => {
          sortedObj[item.code] = [];
        });

        data.forEach(item => {
          const itemKey = item[antiKeySingular].code || item[antiKeySingular];
          sortedObj[itemKey].push(item);
        });

        const sortedArr = Object.values(sortedObj);

        console.log('sorted by catKey', sortedObj);
        console.log('sorted arr', sortedArr);

        tabContent.data = sortedArr;

        this.props.updateTabs(tabContent, tabIndex);
      })
      .catch(error => {
        console.log('POST ERROR', error);
      });
  };

  render() {
    const { dataTitles, tabIndex, updateTabs } = this.props;

    const { tabContent } = this.props;
    const { catKey, catVal, charts, data, id, name } = tabContent;
    const antiKey = catKey === 'substances' ? 'sectors' : 'substances';

    /* if (catVal && !data) {
      this.updateData();
    } */

    return (
      <div
        className={'Tab-' + tabIndex}
        style={{ position: 'absolute', width: '90vw' }}
      >
        <TabName
          placeholder={'Tab-' + tabIndex}
          value={name}
          onChange={e => this.updateTab('name', e.target.value, tabIndex)}
        ></TabName>

        <DropdownContainer className="dropdown-container">
          <Select
            value={catKey || 'default'}
            onChange={e => this.updateTab('catKey', e.target.value, tabIndex)}
          >
            <Option disabled value="default">
              - select category -
            </Option>
            <Option value="substances">Substance</Option>
            <Option value="sectors">Sector</Option>
          </Select>

          {catKey ? (
            <Select
              className="dropdown-content-substance"
              onChange={e => this.updateTab('catVal', e.target.value, tabIndex)}
              value={catVal || 'default'}
            >
              <Option disabled value="default">
                - select a {catKey.slice(0, -1)} -
              </Option>
              {dataTitles[catKey].map(item => (
                <Option key={item.code} value={item.code}>
                  {item.name}
                </Option>
              ))}
            </Select>
          ) : null}
        </DropdownContainer>

        <Charts
          allData={data}
          catKey={catKey}
          catVal={catVal}
          antiKey={antiKey}
          dataTitles={dataTitles}
        />

        {this.props.children}
      </div>
    );
  }
}

class Charts extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { allData, catKey, catVal, antiKey } = this.props;
    if (!allData) return null;

    return (
      <>
        {allData.map((data, nth) => {
          // format title
          const titleKey =
            antiKey[0].toUpperCase() + antiKey.slice(1).slice(0, -1);
          const titleVal = data[0][antiKey.slice(0, -1)].name;

          return (
            <ChartContainer key={nth}>
              <p>
                {titleKey}: {titleVal}
              </p>
              <ChartTemplate data={data} catVal={catVal} />
            </ChartContainer>
          );
        })}
      </>
    );
  }
}
