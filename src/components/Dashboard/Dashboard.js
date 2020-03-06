import React, { Component } from 'react';
import styled from 'styled-components';
import DashboardContext from './context';
import TabMenu from './TabMenu';
import Tab from './Tab';

import { defaultState, defaultTab, defaultDataTitles } from './default';

import { withFirebase } from '../Firebase';
import { withTheme } from '../Theme';
import PopupMsg from '../PopupMsg';
import { fetchDataTitles } from './fetch';
import { auth } from 'firebase';

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
  width: 2.5rem;
  height: 2.5rem;
  /* right: 1rem;
  top: 8rem; */
  transform: ${props =>
    props.newTab
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
      ...defaultState
    };

    this.newTab = this.newTab.bind(this);
    this.getStorage = this.getStorage.bind(this);
    this.setStorage = this.setStorage.bind(this);
    this.loadTab = this.loadTab.bind(this);
    this.updateTab = this.updateTab.bind(this);
    this.deleteTab = this.deleteTab.bind(this);
    this.loadFirebaseTabs = this.loadFirebaseTabs.bind(this);
    //this.updateHiddenCharts = this.updateHiddenCharts.bind(this);
  }

  loadFirebaseTabs() {
    this.listener = this.props.firebase.onAuthUserListener(authUser => {
      if (authUser) {
        const dbTabs = authUser.tabs;

        if (dbTabs != null) {
          localStorage.setItem('tabs', JSON.stringify(dbTabs));
          console.log('db', dbTabs);
          this.setState({
            tabs: dbTabs,
            activeTab: dbTabs[0] || this.state
          });
        }
      }
    });
  }

  // update user (tabs) in db
  updateFirebaseTabs(newTabs) {
    this.listener = this.props.firebase.onAuthUserListener(authUser => {
      if (authUser) {
        authUser.tabs = newTabs;
        this.props.firebase.updateUser(authUser.uid, authUser);
      }
    });
  }

  componentDidMount() {
    // spice up state
    this.setState({
      dataTitles:
        this.getStorage('dataTitles') || fetchDataTitles() || defaultDataTitles,
      tabs: this.loadFirebaseTabs() || this.getStorage('tabs') || [],
      activeTab: this.getStorage('activeTab') || this.state.tabs[0] || null,
      tabMenuIsOpen: this.getStorage('tabMenuIsOpen') || false
    });

    // set dataTitles
    const dataTitles = this.getStorage('dataTitles');
    if (!dataTitles) this.setStorage('dataTitles', this.state.dataTitles);
  }

  componentWillUnmount() {
    this.listener();
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
        activeTab: newTab,
        tabMenuIsOpen: false,
        newTab: true
      },
      () => {
        if (tabs.length <= 1 && this.state.newTab) {
          this.setState({
            newTab: false
          });
        } else {
          setTimeout(() => {
            this.setState({
              newTab: false
            });
          }, 200);
        }
      } // callback
    );

    this.updateFirebaseTabs(tabs);

    this.setStorage('tabs', tabs);
    this.setStorage('activeTab', newTab);
  };

  loadTab = tab => {
    const setActiveTab = () => {
      this.setState({
        activeTab: tab
      });
    };

    this.toggleTabMenu(setActiveTab);
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

  toggleTabMenu = callback => {
    if (this.state.tabs.length < 1) return;

    const { tabMenuIsOpen } = this.state;

    this.setState(
      {
        tabMenuIsOpen: !tabMenuIsOpen
      },
      typeof callback === 'function' ? callback : null
    );

    this.setStorage('tabMenuIsOpen', !tabMenuIsOpen);
  };

  /* updateHiddenCharts = newVal => {
    this.setState({
      hiddenCharts: newVal
    });

    this.setStorage('tabs', tabs);
    this.setStorage('activeTab', newActive);
  }; */

  render() {
    // ctx setters
    const setters = {
      getStorage: this.getStorage,
      setStorage: this.setStorage,
      newTab: this.newTab,
      loadTab: this.loadTab,
      updateTab: this.updateTab,
      deleteTab: this.deleteTab,
      updateHiddenCharts: this.updateHiddenCharts,
      toggleTabMenu: this.toggleTabMenu
    };

    const { tabs, activeTab, newTab } = this.state;
    const tabsExist = tabs ? tabs.length > 0 : false;

    return (
      <>
        <DashboardContext.Provider
          value={{
            state: this.state,
            setters
          }}
        >
          {tabs ? (
            <Wrapper>
              <NewTabBtn
                type="add"
                onClick={this.newTab}
                tabsExist={tabsExist}
                newTab={newTab}
              >
                +
              </NewTabBtn>

              <SoftP tabsExist={tabsExist}>add your data</SoftP>

              {tabsExist ? (
                <>
                  <TabMenu />

                  {activeTab ? <Tab /> : null}
                </>
              ) : null}
            </Wrapper>
          ) : null}
        </DashboardContext.Provider>
      </>
    );
  }
}

export default withFirebase(Dashboard);
