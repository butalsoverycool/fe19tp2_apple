import React, { Component } from 'react';
import styled from 'styled-components';

import Tab from './Tab';

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
  width: 4rem;
  height: 4rem;
  margin: 1rem 0.2rem;
  box-shadow: 0 0 20px #ddd;
  background: #fff;
  border: none;
  outline: none;

  position: fixed;
  right: 1rem;
  top: 10rem;
  z-index: 1;
  border-radius: 50%;
  font-size: 2rem;
`;

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataTitles:
        this.getStorage('dataTitles') || fetchDataTitles() || defaultDataTitles,
      tabs: this.getStorage('tabs') || [],
      activeTab: this.getStorage('activeTab') || null,
      tabListOpen: this.getStorage('tabListOpen') || true
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
  };

  updateActiveTab = newActive => {
    this.setState({
      activeTab: newActive
    });

    this.setStorage('activeTab', newActive);
  };

  updateTabs = (tab, tabIndex) => {
    const tabs = this.state.tabs;
    tabs[tabIndex] = tab;

    this.setState({ tabs });

    this.setStorage('tabs', tabs);
  };

  deleteTab = tabIndex => {
    const tabs = this.state.tabs;
    tabs.splice(tabIndex, 1);

    const newActive =
      tabs[tabIndex - 1] || tabs[tabIndex + 1] || tabs[tabIndex] || null;

    this.setState({ tabs, activeTab: newActive });

    this.setStorage('tabs', tabs);
  };

  toggleTabList = () => {
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
            />

            {tabs.length > 0 && activeTab ? (
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
            ) : null}
          </RowWrapper>
        </ColumnWrapper>
      </>
    );
  }
}

const TabListWrapper = styled.div`
  position: fixed;
  left: 0;
  top: 5rem;
  z-index: 1;
`;

const List = styled.div`
  width: ${props => (props.tabListOpen ? '7rem' : '0')};
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow-x: hidden;
  transition-duration: 0.4s;
  background: #fff;
  box-shadow: 0 0 20px #eee;
  margin: 0;
`;

const ToggleBtn = styled.button`
  background: #fff;
  height: 2rem;
  outline: none;
  border: none;
`;

const Item = styled.button`
  height: 2rem;
  box-shadow: 2px 0 20px #eee;
  font-size: 0.8rem;
  outline: none;
  border: none;
  font-weight: ${props => (props.active ? '700' : '100')};
  margin: 0.2rem;
`;

class TabList extends Component {
  constructor(props) {
    super(props);

    this.clickHandler = this.clickHandler.bind(this);

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  /**
   * Set the wrapper ref
   */
  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      if (this.props.tabListOpen) {
        this.props.toggleTabList();
      }
    }
  }

  clickHandler = (id, name) => {
    const { tabs, updateActiveTab } = this.props;

    const tab = tabs.filter(tab => tab.id === id)[0];

    /* const tabIndex = tabs.indexOf(tab);

    console.log('active tab', tab, tabIndex); */

    updateActiveTab(tab);
  };

  render() {
    let { tabs, activeTab, tabListOpen, toggleTabList } = this.props;

    const toggleTxt = tabListOpen ? '<--' : '--> MY TABS';

    return (
      <TabListWrapper ref={this.setWrapperRef}>
        <ToggleBtn onClick={toggleTabList}>{toggleTxt}</ToggleBtn>
        <List className="TabList" tabListOpen={tabListOpen ? true : false}>
          {tabs.map((tab, nth) => (
            <Item
              key={nth}
              active={tab.id === activeTab.id}
              onClick={e => this.clickHandler(tab.id, tab.name)}
            >
              {tab.name || `(id-${tab.id.toFixed(4)})`}
            </Item>
          ))}
        </List>
      </TabListWrapper>
    );
  }
}
