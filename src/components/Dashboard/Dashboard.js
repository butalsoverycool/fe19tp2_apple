import React, { Component } from 'react';
import styled from 'styled-components';
import DashboardContext from './context';

import ActiveTab from './ActiveTab';
import FloatMenu from './FloatMenu';

import { defaultState, defaultTab, defaultDataTitles } from './default';

import { withFirebase } from '../Firebase';
import { withTheme } from '../Theme';
import PopupMsg from '../PopupMsg';
import { fetchDataTitles } from './fetch';
import { auth } from 'firebase';
import { act } from 'react-dom/test-utils';

//temp styles
const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const NewTabBtn = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  /* right: 1rem;
  top: 8rem; */
  transform: ${props =>
    props.creatingTab
      ? 'translate3d(100vw, 45px, 0)'
      : 'translate3d(100vw, 45px, 0) translateX(-2.5rem)'};
  font-size: 1.2rem;
  padding: 0.5rem;
  margin: auto;

  box-shadow: 0 0 20px #ddd;
  border: none;
  border-radius: 5px 0 0 5px;
  outline: none;
  position: absolute;
  z-index: 1;
  cursor: pointer;
  transition-duration: 0.4s;

  ${props =>
    !props.tabsExist
      ? `
      border-radius: 50%;
      width: 6rem;
      height: 6rem;
      /* left: 50%;
      top: 50%; */
      transform: translate3d(50vw,40vh,0);
      margin-left: -3rem;
      margin-top: -3rem;
      font-size: 2rem;`
      : ''};

  &:hover {
    box-shadow: 0px 0px 10px #bbb;
  }
`;

const SoftP = styled.p`
  color: grey;
  font-weight: 100;
  font-style: italic;
  opacity: 0.6;
  font-size: 0.8rem;

  text-align: center;
  width: 6rem;
  display: block;
  position: absolute;
  /* left: 50%;
  top: 50%; */
  transform: ${props =>
    !props.tabsExist
      ? 'translate3d(50vw, 40vh, 0)'
      : 'translate3d(-50vw, 40vh, 0)'};
  transition-duration: 0.4s;
  margin-left: -3rem;
  margin-top: 5rem;
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
      /* ...defaultState */
    };

    this.newTab = this.newTab.bind(this);
    this.getStorage = this.getStorage.bind(this);
    this.setStorage = this.setStorage.bind(this);
    this.loadTab = this.loadTab.bind(this);
    this.updateTab = this.updateTab.bind(this);
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

  newTab = () => {
    const tabs = this.state.tabs;
    const newTab = defaultTab(tabs.length);

    tabs.unshift(newTab);

    this.setState(
      {
        tabs,
        tabMenuIsOpen: false,
        creatingTab: true
      },
      () => {
        if (tabs.length <= 1 && this.state.creatingTab) {
          this.setState({
            creatingTab: false
          });
        } else {
          setTimeout(() => {
            this.setState({
              creatingTab: false
            });
          }, 200);
        }
      } // callback
    );

    this.updateFirebaseTabs(tabs);

    this.setStorage('tabs', tabs);
    this.loadTab(newTab);
  };

  loadTab = tab => {
    this.setState({
      activeTab: tab
    });

    this.setStorage('activeTab', tab);
  };

  updateTab = (tab, callback) => {
    const { tabs } = this.state;

    const newTabs = tabs.map(item => (item.id === tab.id ? tab : item));

    this.setState({ tabs: newTabs, activeTab: tab }, () =>
      typeof callback === 'function' ? callback() : null
    );

    this.updateFirebaseTabs(newTabs);

    this.setStorage('activeTab', tab);
    this.setStorage('tabs', newTabs);
  };

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
      newTab: this.newTab,
      loadTab: this.loadTab,
      updateTab: this.updateTab,
      deleteTab: this.deleteTab,
      updateChart: this.updateChart,
      setDisabledChart: this.setDisabledChart,
      updateHiddenCharts: this.updateHiddenCharts
    };

    const { tabs, activeTab, creatingTab } = this.state;

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
          <Wrapper>
            <NewTabBtn
              type="add"
              onClick={this.newTab}
              tabsExist={tabLen > 0}
              creatingTab={creatingTab}
            >
              +
            </NewTabBtn>

            <SoftP tabsExist={tabLen > 0}>add your data</SoftP>

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
