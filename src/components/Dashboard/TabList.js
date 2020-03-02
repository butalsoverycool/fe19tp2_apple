import React, { Component } from 'react';
import styled from 'styled-components';
import PopupMsg from '../PopupMsg';

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

export default class TabList extends Component {
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
    /* if (this.wrapperRef && !this.wrapperRef.contains(event.target)) { */
    if (this.props.tabListOpen) {
      this.props.toggleTabList();
      /* } */
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

    this.setState(
      {
        deleting: true,
        deleteMsg: tabName + ' deleted!'
      },
      () => {
        setTimeout(
          // temp-solution
          () =>
            this.setState({
              deleting: false,
              deleteMsg: null
            }),
          1500
        );
      }
    );

    this.props.deleteTab(tabIndex);
  };

  render() {
    let { tabs, activeTab, tabListOpen, toggleTabList, deleteTab } = this.props;
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
          />
        ) : null}

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
      </>
    );
  }
}
