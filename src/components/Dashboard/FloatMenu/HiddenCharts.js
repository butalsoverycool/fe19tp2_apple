import React, { Component } from 'react';
import { withDashboard } from '../context';
import IconTemplate, { icons } from '../../../media/icons';

import { Wrapper, ToggleBtn, List, Item, Label, Btn } from './styledElems';

class HiddenCharts extends Component {
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
    const wrapper = e.target.closest('.hiddenChartsMenuWrapper');
    const clickedRestore = e.target.classList.contains('restoreChartBtn');

    if (this.state.isOpen && wrapper !== this.wrapperRef && !clickedRestore) {
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
      <Wrapper className="hiddenChartsMenuWrapper">
        <ToggleBtn
          isOpen={isOpen}
          onClick={this.toggleOpen}
          radius={isOpen ? '0' : '0 0 10px 0'}
        >
          <IconTemplate src={icons.hidden} />
        </ToggleBtn>
        <List isOpen={isOpen} ref={this.setListRef}>
          <Item>
            <Label fat>Hidden charts</Label>
          </Item>
          {hiddenCharts.map(chart => (
            <Item key={chart.id}>
              <Label>
                {catRes.slice(0, -1)} {chart.data[0][catRes.slice(0, -1)].code}
              </Label>
              <Btn
                className="restoreChartBtn"
                onClick={() => setDisabledChart(chart.id, chart.disabled)}
              >
                <IconTemplate src={icons.visible} tooltip="hej" />
              </Btn>
            </Item>
          ))}
        </List>
      </Wrapper>
    );
  }
}

export default withDashboard(HiddenCharts);
