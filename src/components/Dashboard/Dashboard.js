import React, { Component } from 'react';
import styled from 'styled-components';
import { withTheme } from '../Theme';
import TabList from './TabList';
import Tab from './Tab';
import PopupMsg from '../PopupMsg';

import { defaultTab, defaultDataTitles } from './default';

import { fetchDataTitles } from './fetch';

//temp styles
const ColumnWrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const RowWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
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
  margin: 1rem 0.2rem;
  box-shadow: 0 0 20px #ddd;
  background: #fff;
  border: none;
  outline: none;
`;

const NewTabBtn = styled.button`
  width: 3rem;
  height: 3rem;
  box-shadow: 0 0 20px #ddd;
  border: none;
  outline: none;
  position: absolute;
  right: 1rem;
  top: 8rem;
  z-index: 1;
  border-radius: 50%;
  font-size: 1.5rem;
`;

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataTitles:
        this.getStorage('dataTitles') || fetchDataTitles() || defaultDataTitles,
      tabs: this.getStorage('tabs') || [],
      activeTab: this.getStorage('activeTab') || null,
      tabListOpen: this.getStorage('tabListOpen') || false
    };

    this.newTab = this.newTab.bind(this);
    this.getStorage = this.getStorage.bind(this);
    this.setStorage = this.setStorage.bind(this);
    this.updateActiveTab = this.updateActiveTab.bind(this);
    this.updateTabs = this.updateTabs.bind(this);
    this.deleteTab = this.deleteTab.bind(this);
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

    tabs.unshift(defaultTab());

    this.setState({
      tabs,
      activeTab: tabs[0],
      tabListOpen: false
    });

    this.setStorage('tabs', tabs);
    this.setStorage('activeTab', tabs[0]);
  };

  updateActiveTab = (newActive, tabIndex) => {
    const tabs = this.state.tabs;
    tabs[tabIndex] = newActive;

    this.setState({
      tabs,
      activeTab: newActive
    });

    this.setStorage('tabs', tabs);
    this.setStorage('activeTab', newActive);
  };

  updateTabs = (tab, tabIndex) => {
    const tabs = this.state.tabs;
    tabs[tabIndex] = tab;

    this.setState({ tabs, activeTab: tab });

    this.setStorage('tabs', tabs);
    this.setStorage('activeTab', tab);
  };

  deleteTab = tabIndex => {
    const { tabs, activeTab } = this.state;
    tabs.splice(tabIndex, 1);

    const newActive =
      tabs[tabIndex] || tabs[tabIndex - 1] || tabs[tabIndex + 1] || null;

    this.setState({ tabs, activeTab: newActive });

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
    const { tabs, activeTab, dataTitles, tabListOpen } = this.state;

    const tab = this.state.activeTab;
    const tabIndex = this.state.tabs.indexOf(tab);

    return (
      <>
        <ColumnWrapper>
          <NewTabBtn type="add" onClick={this.newTab}>
            +
          </NewTabBtn>

          <RowWrapper>
            <TabList
              tabs={tabs}
              activeTab={activeTab}
              tabListOpen={tabListOpen}
              updateActiveTab={this.updateActiveTab}
              toggleTabList={this.toggleTabList}
              deleteTab={this.deleteTab}
            />

            {tabs.length > 0 && activeTab ? (
              <Tab
                key={tabIndex}
                dataTitles={dataTitles}
                tabIndex={tabIndex}
                tabContent={tab}
                updateTabs={this.updateTabs}
                updateCat={this.updateCat}
              ></Tab>
            ) : null}
          </RowWrapper>
        </ColumnWrapper>
      </>
    );
  }
}
