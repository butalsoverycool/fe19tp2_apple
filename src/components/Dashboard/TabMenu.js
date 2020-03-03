import React, { Component } from 'react';
import styled from 'styled-components';
import { withDashboard } from './context';

import PopupMsg from '../PopupMsg';

const TabMenuWrapper = styled.div`
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

class TabMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deleting: false,
      deleteMsg: null
    };

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.outsideClickHandler = this.outsideClickHandler.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.outsideClickHandler);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.outsideClickHandler);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  outsideClickHandler(event) {
    if (this.props.dashboard.state.tabListOpen) {
      this.props.dashboard.setters.toggleTabList();
    }
  }

  loadHandler = id => {
    const { tabs } = this.props.dashboard.state;
    const { loadTab } = this.props.dashboard.setters;

    const tab = tabs.filter(tab => tab.id === id)[0];

    loadTab(tab);
  };

  deleteHandler = tabId => {
    const { tabs } = this.props;
    const tab = tabs.filter(tab => tab.id === tabId)[0];
    const tabName = tab.name || tab.id;

    const callback = () => {
      this.setState({
        deleting: true,
        deleteMsg: tabName + ' deleted'
      });
    };

    this.props.dashboard.setters.deleteTab(tab, callback);
  };

  afterDelete = () => {
    this.setState({
      deleting: false,
      deleteMsg: null
    });
  };

  render() {
    //dashboard ctx
    let { tabs, activeTab, tabListOpen } = this.props.dashboard.state;
    const { toggleTabList } = this.props.dashboard.setters;

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
          <TabMenuWrapper ref={this.setWrapperRef}>
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
                        onClick={e => this.loadHandler(tab.id)}
                      >
                        {tab.name || `(id: ${tab.id})`}
                      </ItemBtn>
                      <ItemBtn
                        onClick={() => this.deleteHandler(tab.id)}
                        type="delete"
                      >
                        Del
                      </ItemBtn>
                    </Item>
                  ))
                : null}
            </List>
          </TabMenuWrapper>
        )}
      </>
    );
  }
}

export default withDashboard(TabMenu);
