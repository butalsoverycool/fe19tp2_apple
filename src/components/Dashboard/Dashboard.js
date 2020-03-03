import React, { Component } from 'react';
import styled from 'styled-components';
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
    const { tabs } = this.state;
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
          <NewTabBtn type="add" onClick={this.newTab} tabsLen={tabs.length}>
            +
          </NewTabBtn>
          {tabs.length < 1 ? <SoftP>add some data</SoftP> : null}

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

const TabListWrapper = styled.div`
  position: fixed;
  left: 0;
  top: 8rem;
  z-index: 1;
  transform: ${props =>
    props.tabListOpen ? 'translate3d(0, 0,0)' : 'translate3d(-10rem, 0,0)'};
`;

const List = styled.div`
  transform: ${props =>
    props.tabListOpen ? 'translate3d(10rem, 0,0)' : 'translate3d(-10rem, 0,0)'};
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow-x: hidden;
  background: #fff;
  box-shadow: 0 0 20px #eee;
  margin: 0;
  transition-duration: 0.4s;
`;

const ToggleBtn = styled.button`
  height: 2rem;
  box-shadow: 0 0 20px #ddd;
  border-radius: 0 5px 5px 0;
  outline: none;
  border: none;
  transform: ${props =>
    props.tabListOpen || !props.tabsExist
      ? 'translate3d(-2rem, 0,0)'
      : 'translate3d(10rem, 0,0)'};
  overflow-x: ${props => (props.tabListOpen ? 'hidden' : 'unset')};
  transition-duration: 0.4s;
  background: ${props => props.color};
`;

const ToggleTxt = styled.p`
  opacity: ${props => (props.tabListOpen || !props.tabsExist ? 0 : 1)};
  transition-delay: ${props => (props.tabListOpen ? '0' : '0.2s')};
  transition-duration: 0.5s;
  font-weight: 700;
`;

const Item = styled.div`
  height: 100%;
  font-size: 0.8rem;
  outline: none;
  box-shadow: 2px 0 20px #eee;
  border: none;
  margin: 0.2rem;
`;

const ItemBtn = styled.button`
  float: left;
  display: inline-block;
  font-weight: ${props => (props.active ? '700' : '100')};
  background: none;
  border: none;
  outline: none;
  font-size: 1rem;
  padding: 1rem;
`;

class TabList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deleting: false,
      deleteMsg: null
    };

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
    if (this.props.tabListOpen) {
      this.props.toggleTabList();
    }
  }

  clickHandler = (id, name, tabIndex) => {
    const { tabs, updateActiveTab } = this.props;

    const tab = tabs.filter(tab => tab.id === id)[0];

    updateActiveTab(tab, tabIndex);
  };

  deleteHandler = tabIndex => {
    const { tabs } = this.props;
    const tabName = tabs[tabIndex].name || tabs[tabIndex].id.toFixed(4);

    this.setState({
      deleting: true,
      deleteMsg: tabName + ' deleted!'
    });

    this.props.deleteTab(tabIndex);
  };

  afterDelete = () => {
    this.setState({
      deleting: false,
      deleteMsg: null
    });
  };

  render() {
    let { tabs, activeTab, tabListOpen, toggleTabList } = this.props;
    const { deleting, deleteMsg } = this.state;

    const activeId = activeTab ? activeTab.id : null;

    return (
      <>
        {deleting ? (
          <PopupMsg
            txt={deleteMsg || 'Deleted!'}
            enter={true}
            exit={false}
            timeout={1000}
            callback={this.afterDelete}
          />
        ) : (
          <TabListWrapper ref={this.setWrapperRef}>
            <ToggleBtn
              onClick={toggleTabList}
              tabListOpen={tabListOpen}
              tabsExist={tabs.length > 0}
            >
              <ToggleTxt tabListOpen={tabListOpen} tabsExist={tabs.length > 0}>
                {'<<'}
              </ToggleTxt>
            </ToggleBtn>

            <List className="TabList" tabListOpen={tabListOpen ? true : false}>
              {tabs.length > 0
                ? tabs.map((tab, nth) => (
                    <Item key={'item' + nth}>
                      <ItemBtn
                        active={tab.id === activeId}
                        onClick={e => this.clickHandler(tab.id, tab.name, nth)}
                      >
                        {tab.name || `(id-${tab.id.toFixed(4)})`}
                      </ItemBtn>
                      <ItemBtn
                        onClick={() => this.deleteHandler(nth)}
                        type="delete"
                      >
                        Del
                      </ItemBtn>
                    </Item>
                  ))
                : null}
            </List>
          </TabListWrapper>
        )}
      </>
    );
  }
}
