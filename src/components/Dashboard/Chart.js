import React, { Component } from 'react';
import styled from 'styled-components';
import { compose } from 'recompose';
import { withTheme } from '../Theme/context';
import { withDashboard } from './context';

import { defaultChart, defaultDataPoint } from './default';
import ChartTemplate from './ChartTemplate';

import IconTemplate, { icons } from '../../media/icons';

const ChartContainer = styled.div`
  ${props =>
    props.type === 'pie' || props.type === 'radar' ? `max-width: 350px;` : ''};

  min-width: 300px;
  height: 300px;
  min-height: 300px;
  background: white;
  margin: 2rem;
  padding: 1rem;
  border-radius: 20px;
  border: none;
  box-shadow: 0 0 20px #ddd;
  position: relative;

  flex: ${props => props.flex || 1};

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const ChartTitle = styled.h4`
  font-size: 16px;
`;

const DelChartBtn = styled.button`
  position: absolute;
  right: 0.5rem;
  bottom: 0.5rem;
  color: white;
  cursor: pointer;

  background: none;
  border: none;
  outline: none;

  & > img {
    max-width: 1.5rem;
  }
`;

class Chart extends Component {
  constructor(props) {
    super(props);

    this.deleteHandler = this.deleteHandler.bind(this);
  }

  deleteHandler(chart) {
    const { updateTab } = this.props.dashboard.setters;
    const { activeTab } = this.props.dashboard.state;
    let { charts } = activeTab;

    chart.disabled = true;
    const newCharts = charts.map(item => (item.id === chart.id ? chart : item));
    activeTab.charts = newCharts;

    updateTab(activeTab);
  }

  render() {
    const { color } = this.props.theme.state;
    const { activeTab } = this.props.dashboard.state;
    const { catRes } = activeTab;
    const { charts, timespan } = activeTab;

    const chart = this.props.chart;

    /* if (!charts || charts.length < 1) return null; */
    const filtered = chart.data.filter(
      entry => entry.year >= timespan.from && entry.year <= timespan.to
    );

    // format title
    const titleKey = catRes[0].toUpperCase() + catRes.slice(1).slice(0, -1);

    const titleVal = chart.data[0][catRes.slice(0, -1)].name;

    //measure title
    const flex = titleVal.length > 30 ? 'auto' : '1';
    const cutYear = titleVal.length > 30 ? false : true;

    return (
      <>
        <ChartContainer
          key={chart.id}
          className="ChartContainer"
          flex={flex}
          type={chart.type}
        >
          <ChartTitle>
            {titleKey}: {titleVal}
          </ChartTitle>

          <ChartTemplate data={filtered} type={chart.type} />

          <DelChartBtn onClick={() => this.deleteHandler(chart)}>
            <IconTemplate src={icons.deleteCross} />
          </DelChartBtn>
        </ChartContainer>
      </>
    );
  }
}

export default compose(withTheme, withDashboard)(Chart);
