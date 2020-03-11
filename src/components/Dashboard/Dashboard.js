import React, { Component } from 'react';
import styled from 'styled-components';
import DashboardContext from './context';

import ActiveTab from './ActiveTab/index.js';
import FloatMenu from './FloatMenu';
import NewTabFirst from './NewTabFirst';

import { defaultTab } from './default';

import { withFirebase } from '../Firebase';
import { fetchDataTitles } from './fetch';

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
      // Table of contents of API-data, get from LStorage, else API
      dataTitles: [],

      // Tab = Previously saved chart presets, get from LStorage, else API
      tabs: this.getStorage('tabs') || this.loadTabs() || [],

      // Tab to display
      activeTab: this.getStorage('activeTab') || null,

      // Switch for sidemenu state
      menuIsOpen: this.getStorage('tabMenuIsOpen') || false,

      // Check if tab is being created
      creatingTab: false,

      // temp** when to play bossanova pause-music
      fetchingCharts: {
        started: false,
        ended: false
      }
    };

    this.getStorage = this.getStorage.bind(this);
    this.setStorage = this.setStorage.bind(this);
    this.updateFirebaseTabs = this.updateFirebaseTabs.bind(this);
    this.newTab = this.newTab.bind(this);
    this.updateAllTabs = this.updateAllTabs.bind(this);
    this.updateTab = this.updateTab.bind(this);
    this.setActiveTab = this.setActiveTab.bind(this);
    this.setDisabledChart = this.setDisabledChart.bind(this);
    this.deleteTab = this.deleteTab.bind(this);
    this.loadTabs = this.loadTabs.bind(this);
    this.setFetchingCharts = this.setFetchingCharts.bind(this);
    this.handleDataTitleFetch = this.handleDataTitleFetch.bind(this);
  }

  componentDidMount() {
    this.setState({
      dataTitles:
        this.getStorage('dataTitles') ||
        fetchDataTitles(this.handleDataTitleFetch) ||
        []
    });
  }

  handleDataTitleFetch(dataTitles) {
    this.setState({
      dataTitles
    });

    // save in LStorage for next visit
    this.setStorage('dataTitles', dataTitles);
  }

  // load tabs from db, else localstorage, else set empty arr
  loadTabs() {
    const { firebase } = this.props;

    // get authUser info
    firebase.onAuthUserListener(authUser => {
      // get user tabs from db
      const tabs = authUser ? authUser.tabs : null;

      // if no tabs, bail...
      if (!tabs) return [];
      console.log('Found saved tabs in db. Loading...');

      // tab to edit
      const activeTab = tabs.length > 0 ? tabs[0] : null;

      //we use no callback so skip seperate updates:
      //this.updateAllTabs(tabs);
      //this.setActiveTab(activeTab);

      // and instead update state here
      this.setState({
        tabs,
        activeTab
      });

      // and LStorage
      this.setStorage('tabs', tabs);
      this.setStorage('activeTab', activeTab);
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

  // load from LStorage
  getStorage = key => {
    const res = JSON.parse(localStorage.getItem(key));
    if (res !== undefined && res !== null) {
      console.log(`Got ${key} from storage.`);
    }
    return res;
  };

  // save to LStorage
  setStorage = (key, val) => {
    let valStr = JSON.stringify(val);

    localStorage.setItem(key, valStr);

    if (valStr.length > 20) valStr = valStr.slice(0, 20) + '...';

    console.log(`Stored ${key} (${valStr})`);
  };

  // create a new tab
  newTab() {
    const { tabs } = this.state;

    const newTab = defaultTab(tabs.length);

    tabs.unshift(newTab);

    this.updateAllTabs(tabs);

    this.setActiveTab(newTab);

    this.updateFirebaseTabs(tabs);
  }

  // update tabs
  updateAllTabs(tabs, callback) {
    this.setState({ tabs }, () =>
      typeof callback === 'function' ? callback() : null
    );

    this.setStorage('tabs', tabs);
  }

  // update active tab
  updateTab = (tab, callback) => {
    const { tabs } = this.state;

    const newTabs = tabs.map(item => (item.id === tab.id ? tab : item));

    this.updateAllTabs(newTabs, callback);

    this.updateFirebaseTabs(newTabs);

    this.setActiveTab(tab);
  };

  // load tab / set tab as active
  setActiveTab(activeTab) {
    this.setState({
      activeTab
    });

    this.setStorage('activeTab', activeTab);
  }

  // delete tab
  deleteTab = (tab, callback) => {
    const { tabs, activeTab } = this.state;
    const tabIndex = tabs.indexOf(tab);
    tabs.splice(tabIndex, 1);

    // if not active deleted, keep active, else switch to closest (prio prev), else null
    let newActive =
      tab.id !== activeTab.id
        ? activeTab
        : tabs[tabIndex] || tabs[tabIndex - 1] || tabs[tabIndex + 1] || null;

    if (tabs.length < 1) newActive = null;
    console.log('len', tabs.length);

    this.setActiveTab(newActive);

    this.updateAllTabs(tabs, callback);

    /* this.setState({ tabs, activeTab: newActive }, () =>
      typeof callback === 'function' ? callback() : null
    ); */

    this.updateFirebaseTabs(tabs);
    //this.setStorage('tabs', tabs);
  };

  setDisabledChart(chartId, currentState) {
    const { activeTab } = this.state;

    activeTab.charts = activeTab.charts.map(chart => {
      if (chart.id === chartId) chart.disabled = !currentState;
      return chart;
    });

    this.updateTab(activeTab);
  }

  setFetchingCharts(newStatus) {
    this.setState({
      fetchingCharts: newStatus
    });
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
      setDisabledChart: this.setDisabledChart,
      updateHiddenCharts: this.updateHiddenCharts,
      setFetchingCharts: this.setFetchingCharts
    };

    let { tabs, activeTab } = this.state;

    const tabLen = tabs ? tabs.length : 0;

    // ---- temp**
    const chartLen = activeTab
      ? activeTab.charts
        ? activeTab.charts.length
        : 0
      : 0;

    let disabledCharts = false;
    activeTab = activeTab || { charts: [] };

    activeTab.charts = activeTab.charts || [];

    disabledCharts = activeTab.charts.some(chart => chart.disabled);
    // ----- temp**

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
