import React, { Component } from 'react';
import { withDashboard } from '../context';
import IconTemplate, { icons } from '../../../media/icons';
import TabSettings from '../ActiveTab/TabSettings';
import { Wrapper, ToggleBtn, List, Label } from './styledElems';

class TabSettingsMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false // ui-state for side menu
    };

    this.toggleOpen = this.toggleOpen.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.setListRef = this.setListRef.bind(this);
    this.outsideClickHandler = this.outsideClickHandler.bind(this);
  }

  // on mount, listen for doc click
  componentDidMount() {
    document.addEventListener('mousedown', this.outsideClickHandler, false);
  }

  // remove listener on unmount
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.outsideClickHandler, false);
  }

  // set wrapper ref, called by ref-selector itself
  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  // set list ref, called by ref-selector itself
  setListRef(node) {
    this.listRef = node;
  }

  // handle clicks, determine if target is sidemenu
  outsideClickHandler(e) {
    const wrapper = e.target.closest('.TabSettingsMenuContainer');

    if (this.state.isOpen && wrapper !== this.wrapperRef) {
      this.toggleOpen();
    }
  }

  // toggle display-status for side menu
  toggleOpen() {
    // keep scrolled up
    this.listRef.scrollTop = this.listRef.scrollTop > 0 && 0;

    // update state
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const { isOpen } = this.state;

    const { charts } = this.props.dashboard.state.activeTab;

    const hiddenCharts = charts.filter(chart => chart.disabled);

    return (
      <Wrapper className="TabSettingsMenuContainer" ref={this.setWrapperRef}>
        <ToggleBtn
          isOpen={isOpen}
          onClick={this.toggleOpen}
          className="sideMenuToggleBtn"
          chartsLen={charts.length}
          radius={hiddenCharts.length < 1 ? '0 0 10px 0' : ''}
        >
          <IconTemplate src={icons.settings} />
        </ToggleBtn>
        <List isOpen={isOpen} ref={this.setListRef}>
          <Label fat align="center">
            Current tab
          </Label>
          <TabSettings />
        </List>
      </Wrapper>
    );
  }
}

export default withDashboard(TabSettingsMenu);
