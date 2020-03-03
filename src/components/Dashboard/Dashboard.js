import React, { Component } from 'react';
import styled from 'styled-components';
import DashboardContext from './context';
import TabMenu from './TabMenu';
import Tab from './Tab';

import { defaultTab, defaultDataTitles } from './default';

import { fetchDataTitles } from './fetch';

//temp styles
const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const NewTabBtn = styled.button`
  width: 3rem;
  height: 3rem;
  right: 1rem;
  top: 8rem;
  font-size: 1.2rem;

  box-shadow: 0 0 20px #ddd;
  border: none;
  outline: none;
  position: absolute;
  z-index: 1;
  border-radius: 50%;

  ${props =>
    props.tabsLen > 0
      ? ''
      : `
      width: 6rem;
      height: 6rem;
      left: 50%;
      top: 50%;
      margin-left: -3rem;
      margin-top: -3rem;
      font-size: 2rem;
  `};
`;

const SoftP = styled.p`
  color: grey;
  font-weight: 100;
  font-style: italic;
  opacity: 0.6;
  font-size: 0.8rem;

  text-align: center;
  width: 6 rem;
  display: block;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -3rem;
  margin-top: 5rem;
`;

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataTitles:
        this.getStorage('dataTitles') || fetchDataTitles() || defaultDataTitles,
      tabs: this.getStorage('tabs') || [],
      activeTab: this.getStorage('activeTab') || null,
      tabListOpen: this.getStorage('tabListOpen') || false,
      hiddenCharts: [],
      dashBoardData: null
    };

    this.newTab = this.newTab.bind(this);
    this.getStorage = this.getStorage.bind(this);
    this.setStorage = this.setStorage.bind(this);
    this.loadTab = this.loadTab.bind(this);
    this.updateTabs = this.updateTabs.bind(this);
    this.deleteTab = this.deleteTab.bind(this);
    this.updateHiddenCharts = this.updateHiddenCharts.bind(this);
  }

  componentDidMount() {
    if (!this.getStorage('dataTitles'))
      this.setStorage('dataTitles', this.state.dataTitles);
  }

  getStorage = key => {
    const res = JSON.parse(localStorage.getItem(key));
    if (res !== undefined && res !== null) {
      console.log(`Got ${key} from storage.`);
    }
    return res;
  };

  setStorage = (key, val) => {
    localStorage.setItem(key, JSON.stringify(val));
    console.log('Stored ' + key);
  };

  newTab = () => {
    const tabs = this.state.tabs;

    tabs.unshift(defaultTab(tabs.length));

    this.setState({
      tabs,
      activeTab: tabs[0],
      tabListOpen: false,
      hiddenCharts: []
    });

    this.setStorage('tabs', tabs);
    this.setStorage('activeTab', tabs[0]);
  };

  updateHiddenCharts = newVal => {
    this.setState({
      hiddenCharts: newVal
    });

    /* this.setStorage('tabs', tabs);
    this.setStorage('activeTab', newActive); */
  };

  loadTab = newActive => {
    //const tabs = this.state.tabs;
    //tabs[tabIndex] = newActive;

    this.setState({
      //tabs,
      activeTab: newActive
    });

    //this.setStorage('tabs', tabs);
    this.setStorage('activeTab', newActive);
  };

  updateTabs = (tab, tabIndex) => {
    const tabs = this.state.tabs;
    //const tabIndex = tabs.indexOf(tab);
    tabs[tabIndex] = tab;

    this.setState({ tabs, activeTab: tab });

    this.setStorage('tabs', tabs);
    this.setStorage('activeTab', tab);
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

    this.setState({ tabs, activeTab: newActive }, () => callback());

    this.setStorage('tabs', tabs);
  };

  toggleTabList = () => {
    if (this.state.tabs.length < 1) return;

    const tabListOpen = this.state.tabListOpen;
    this.setState({
      tabListOpen: !tabListOpen
    });

    this.setStorage('tabListOpen', !tabListOpen);
  };

  render() {
    const {
      tabs,
      activeTab,
      dataTitles,
      tabListOpen,
      hiddenCharts,
      dashBoardData
    } = this.state;

    const tab = this.state.activeTab;
    const tabIndex = this.state.tabs.indexOf(tab);

    // ctx getters
    const state = this.state;
    // ctx setters
    const setters = {
      getStorage: this.getStorage,
      setStorage: this.setStorage,
      newTab: this.newTab,
      loadTab: this.loadTab,
      updateTabs: this.updateTabs,
      deleteTab: this.deleteTab,
      updateHiddenCharts: this.updateHiddenCharts,
      toggleTabList: this.toggleTabList
    };

    return (
      <>
        <DashboardContext.Provider
          value={{
            state,
            setters
          }}
        >
          <Wrapper>
            <NewTabBtn type="add" onClick={this.newTab} tabsLen={tabs.length}>
              +
            </NewTabBtn>
            {tabs.length < 1 ? <SoftP>add some data</SoftP> : null}

            <TabMenu
              tabs={tabs}
              activeTab={activeTab}
              tabListOpen={tabListOpen}
              updateActiveTab={this.updateActiveTab}
              toggleTabList={this.toggleTabList}
            />

            <TabContainer>
              {tabs.length > 0 && activeTab ? (
                <Tab
                  key={tabIndex}
                  dataTitles={dataTitles}
                  tabIndex={tabIndex}
                  tabContent={tab}
                  updateTabs={this.updateTabs}
                  updateCat={this.updateCat}
                  hiddenCharts={hiddenCharts}
                  updateHiddenCharts={this.updateHiddenCharts}
                ></Tab>
              ) : null}
            </TabContainer>
          </Wrapper>
        </DashboardContext.Provider>
      </>
    );
  }
}
