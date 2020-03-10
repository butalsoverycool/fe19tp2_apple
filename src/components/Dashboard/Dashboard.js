import React, { Component } from 'react';
import styled from 'styled-components';
import DashboardContext from './context';

import ActiveTab from './ActiveTab/index.js';
import FloatMenu from './FloatMenu';
import NewTabFirst from './NewTabFirst';

import { defaultTab } from './default';

import { withFirebase } from '../Firebase';
import { fetchDataTitles } from './fetch';

import DndGrid, { DndBlock } from './DndGrid';
import Dnd2 from './Dnd2';

//temp styles
const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataTitles: this.getStorage('dataTitles') || null,
      tabs: this.getStorage('tabs') || [],
      activeTab: this.getStorage('activeTab') || null,
      menuIsOpen: this.getStorage('tabMenuIsOpen') || false,
      creatingTab: false
    };

    this.getStorage = this.getStorage.bind(this);
    this.setStorage = this.setStorage.bind(this);
    this.updateFirebaseTabs = this.updateFirebaseTabs.bind(this);
    this.newTab = this.newTab.bind(this);
    this.updateAllTabs = this.updateAllTabs.bind(this);
    this.updateTab = this.updateTab.bind(this);
    this.setActiveTab = this.setActiveTab.bind(this);
    this.updateChart = this.updateChart.bind(this);
    this.setDisabledChart = this.setDisabledChart.bind(this);
    this.deleteTab = this.deleteTab.bind(this);
    this.loadTabs = this.loadTabs.bind(this);
  }

  componentDidMount() {
    // if no dataTitles, fetch from API
    if (!this.state.dataTitles) fetchDataTitles();

    // if tabs in db, load (+ activeTab)
    this.state.tabs.length < 1 && this.loadTabs();
  }

  componentWillUnmount() {
    //this.listener(); bugging right now...
  }

  // load tabs from db, else localstorage, else set empty arr
  loadTabs() {
    const { firebase } = this.props;
    //const backupTabs = () => this.getStorage('tabs') || [];

    firebase.onAuthUserListener(authUser => {
      //const tabs = authUser ? authUser.tabs || backupTabs() : backupTabs();

      const tabs = authUser ? authUser.tabs : null;
      if (!tabs) return;

      console.log('Found saved tabs in db. Loading...');

      const activeTab = tabs.length > 0 ? tabs[0] : null;

      this.setState({
        tabs,
        activeTab
      });

      localStorage.setItem('tabs', JSON.stringify(tabs));
      localStorage.setItem('activeTab', JSON.stringify(activeTab));
    });
  }

  // update user (tabs) in db
  updateFirebaseTabs(newTabs) {
    const { firebase } = this.props;
    firebase.onAuthUserListener(authUser => {
      if (authUser) {
        authUser.tabs = newTabs;
        firebase.updateUser(authUser.uid, authUser);
      }
    });
  }

  // clear localstorge on logout
  getStorage = key => {
    const res = JSON.parse(localStorage.getItem(key));
    if (res !== undefined && res !== null) {
      console.log(`Got ${key} from storage.`);
    }
    return res;
  };

  setStorage = (key, val) => {
    let valStr = JSON.stringify(val);

    localStorage.setItem(key, valStr);

    if (valStr.length > 20) valStr = valStr.slice(0, 20) + '...';

    console.log(`Stored ${key} (${valStr})`);
  };

  newTab() {
    const { tabs } = this.state;

    const newTab = defaultTab(tabs.length);

    tabs.unshift(newTab);

    this.updateAllTabs(tabs);

    this.setActiveTab(newTab);

    this.updateFirebaseTabs(tabs);
  }

  updateAllTabs(tabs, callback) {
    this.setState({ tabs }, () =>
      typeof callback === 'function' ? callback() : null
    );

    this.setStorage('tabs', tabs);
  }

  updateTab = (tab, callback) => {
    const { tabs } = this.state;

    const newTabs = tabs.map(item => (item.id === tab.id ? tab : item));

    this.updateAllTabs(newTabs, callback);

    this.updateFirebaseTabs(newTabs);

    this.setActiveTab(tab);
  };

  setActiveTab(activeTab) {
    this.setState({
      activeTab
    });

    this.setStorage('activeTab', activeTab);
  }

  deleteTab = (tab, callback) => {
    const { tabs, activeTab } = this.state;
    const tabIndex = tabs.indexOf(tab);
    tabs.splice(tabIndex, 1);

    // if not active deleted, keep active, else switch to closest (prio prev), else null
    const newActive =
      tab.id !== activeTab.id
        ? activeTab
        : tabs[tabIndex] || tabs[tabIndex - 1] || tabs[tabIndex + 1] || null;

    this.setState({ tabs, activeTab: newActive }, () =>
      typeof callback === 'function' ? callback() : null
    );

    this.updateFirebaseTabs(tabs);

    this.setStorage('tabs', tabs);
  };

  updateChart(chart, key, newVal) {
    // updated chart-instance
    const newChart = {
      ...chart,
      [key]: newVal
    };

    // updated tab-instance
    const { activeTab } = this.state;
    activeTab.charts = activeTab.charts.map(chart =>
      chart.id === newChart.id ? newChart : chart
    );

    if (key === 'type') {
      activeTab.chartType = 'random';
    }

    this.updateTab(activeTab);
  }

  setDisabledChart(chartId, currentState) {
    const { activeTab } = this.state;

    activeTab.charts = activeTab.charts.map(chart => {
      if (chart.id === chartId) chart.disabled = !currentState;
      return chart;
    });

    this.updateTab(activeTab);
  }

  render() {
    // ctx setters
    const setters = {
      getStorage: this.getStorage,
      setStorage: this.setStorage,
      updateFirebaseTabs: this.updateFirebaseTabs,
      newTab: this.newTab,
      updateAllTabs: this.updateAllTabs,
      updateTab: this.updateTab,
      setActiveTab: this.setActiveTab,
      deleteTab: this.deleteTab,
      updateChart: this.updateChart,
      setDisabledChart: this.setDisabledChart,
      updateHiddenCharts: this.updateHiddenCharts
    };

    const { tabs, activeTab } = this.state;

    const tabLen = tabs ? tabs.length : 0;
    const chartLen = activeTab
      ? activeTab.charts
        ? activeTab.charts.length
        : 0
      : 0;
    const disabledCharts =
      activeTab && activeTab.charts.some(chart => chart.disabled);

    return (
      <>
        <DashboardContext.Provider
          value={{
            state: this.state,
            setters
          }}
        >
          <Wrapper className="DashBoard">
            <NewTabFirst
              type="add"
              onClick={this.newTab}
              siblingTxt="add your data"
            >
              +
            </NewTabFirst>

            {tabLen > 0 && (
              <>
                <FloatMenu
                  chartLen={chartLen}
                  disabledCharts={disabledCharts}
                />

                {activeTab && <ActiveTab />}
              </>
            )}
          </Wrapper>
        </DashboardContext.Provider>
      </>
    );
  }
}

export default withFirebase(Dashboard);
