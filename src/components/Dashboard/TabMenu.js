import React, { Component } from 'react';
import styled from 'styled-components';
import { compose } from 'recompose';
import { withTheme } from '../Theme/context';
import { withDashboard } from './context';

import IconTemplate, { icons } from '../../media/icons';
import PopupMsg from '../PopupMsg';

const TabMenuWrapper = styled.div`
  position: fixed;
  left: 0;
  top: 100px;
  z-index: 1;
  left: -100vw;
`;

const ToggleBtn = styled.button`
  box-shadow: 0 0 20px #ddd;
  border-radius: 0 5px 5px 0;
  outline: none;
  border: none;
  cursor: pointer;
  position: absolute;
  transform: ${props =>
    !props.tabMenuIsOpen && props.tabsExist
      ? 'translate3d(100vw, 0,0)'
      : 'translate3d(0, 0,0)'};
  transition-duration: 0.4s;
  background: ${props => props.color};

  padding: 0.5rem;

  & > img {
    width: 2rem;
  }

  @media screen and (max-width: 400px) {
    transform: ${props =>
      !props.tabMenuIsOpen && props.tabsExist
        ? 'translate3d(100vw, 60vh,0)'
        : 'translate3d(0, 60vh,0)'};
  }
`;

const List = styled.div`
  transform: ${props =>
    props.tabMenuIsOpen ? 'translate3d(100vw, 0,0)' : 'translate3d(0, 0,0)'};
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow-x: hidden;
  background: #fff;
  box-shadow: 0 0 20px #eee;
  margin: 0;
  transition-duration: 0.4s;
  min-width: 10rem;
  max-width: 100vw;
`;

const Item = styled.div`
  outline: none;
  box-shadow: 2px 0 20px #eee;
  border: none;
  margin: 0.2rem;
  padding: 0.5rem;
  display: flex;
  justify-content: flex-start;
`;

const ItemBtn = styled.button`
  font-size: 0.8rem;
  flex: 1;
  font-weight: ${props => (props.active ? '700' : '100')};
  background: none;
  border: none;
  outline: none;
  font-size: 1rem;
  cursor: pointer;
`;

const DelChartBtn = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  outline: none;
  height: 100%;
`;

class TabMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deleting: false,
      deleteMsg: null,
      _isMounted: false
    };

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.outsideClickHandler = this.outsideClickHandler.bind(this);
  }

  componentDidMount() {
    this.setState({
      _isMounted: true
    });

    document.addEventListener('mousedown', this.outsideClickHandler, false);
  }

  componentWillUnmount() {
    this.setState({
      _isMounted: false
    });

    document.removeEventListener('mousedown', this.outsideClickHandler, false);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  outsideClickHandler(e) {
    const tabMenuChild = e.target.closest('.tabMenuWrapper');

    if (
      this.props.dashboard.state.tabMenuIsOpen &&
      tabMenuChild !== this.wrapperRef
    ) {
      this.props.dashboard.setters.toggleTabMenu();
    }
  }

  deleteHandler(tab) {
    const { state, setters } = this.props.dashboard;
    const tabName = tab.name || tab.id;

    const after = () => {
      if (state.tabs.length < 1) return; // is unmouting, dont change state
      this.setState({
        deleting: false,
        deleteMsg: null
      });
    };

    const del = () => {
      this.setState({
        deleting: true,
        deleteMsg: tabName + ' deleted'
      });

      setters.deleteTab(tab, after);
    };

    setters.toggleTabMenu(del);
  }

  render() {
    //theme ctx
    const { color } = this.props.theme.state;
    const themeColor = color.hex.slice(1);

    //dashboard ctx
    let { tabs, activeTab, tabMenuIsOpen } = this.props.dashboard.state;
    const { setters } = this.props.dashboard;

    const { deleting, deleteMsg } = this.state;
    const activeId = activeTab ? activeTab.id : null;

    return (
      <>
        {/* <PopupMsg
          txt={deleteMsg || 'Deleted!'}
          enter={deleting}
          exit={!deleting}
        /> */}

        <TabMenuWrapper
          ref={this.setWrapperRef}
          tabMenuIsOpen={tabMenuIsOpen}
          className="tabMenuWrapper"
        >
          <ToggleBtn
            onClick={setters.toggleTabMenu}
            tabMenuIsOpen={tabMenuIsOpen}
            tabsExist={tabs.length > 0}
          >
            <IconTemplate src={icons.tabMenuToggle} />
          </ToggleBtn>

          <List className="TabList" tabMenuIsOpen={tabMenuIsOpen}>
            {tabs.map(tab => (
              <Item key={tab.id}>
                <ItemBtn
                  active={tab.id === activeId}
                  onClick={() => setters.loadTab(tab)}
                >
                  {tab.name || `(id: ${tab.id})`}
                </ItemBtn>
                <DelChartBtn onClick={() => this.deleteHandler(tab)}>
                  <IconTemplate src={icons.deleteCross} />
                </DelChartBtn>
              </Item>
            ))}
          </List>
        </TabMenuWrapper>
      </>
    );
  }
}

export default compose(withTheme, withDashboard)(TabMenu);
