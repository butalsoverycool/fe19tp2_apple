import React, { Component } from 'react';
import styled from 'styled-components';
import { withDashboard } from '../context';
import IconTemplate, { icons } from '../../../media/icons';
import TabSettings from '../TabSettings';
import { Wrapper, ToggleBtn, List, Label } from './styledElems';

class TabSettingsMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };

    this.toggleOpen = this.toggleOpen.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.setListRef = this.setListRef.bind(this);
    this.outsideClickHandler = this.outsideClickHandler.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.outsideClickHandler, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.outsideClickHandler, false);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  setListRef(node) {
    this.listRef = node;
  }

  outsideClickHandler(e) {
    const wrapper = e.target.closest('.TabSettingsMenuContainer');

    if (this.state.isOpen && wrapper !== this.wrapperRef) {
      this.toggleOpen();
    }
  }

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

    const { charts, catRes } = this.props.dashboard.state.activeTab;
    const { setDisabledChart } = this.props.dashboard.setters;

    const hiddenCharts = charts.filter(chart => chart.disabled);

    return (
      <Wrapper className="TabSettingsMenuContainer" ref={this.setWrapperRef}>
        <ToggleBtn
          isOpen={isOpen}
          onClick={this.toggleOpen}
          className="sideMenuToggleBtn"
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
