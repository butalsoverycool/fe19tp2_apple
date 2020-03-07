import React, { Component } from 'react';
import styled from 'styled-components';
import { compose } from 'recompose';
import { withTheme } from '../Theme/context';
import { withDashboard } from './context';

import { ResponsiveContainer } from 'recharts';

import { defaultChart, defaultDataPoint } from './default';

import ChartSettings from './ChartSettings';

import * as Template from './ChartTemplate';

import IconTemplate, { icons } from '../../media/icons';

const ChartContainer = styled.div`
  ${props => (props.type === 'Radar' ? `max-width: 300px;` : '')};
  min-width: 300px;
  height: 300px;
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

  @media print {
    page-break-after: ${props => props.pageBreak} !important;

    float: none !important;
    position: static !important;
    display: block;
    box-sizing: content-box !important;
  }
`;

const ChartTitle = styled.h4`
  font-size: 16px;

  & > span {
    opacity: 0.6;
    color: #666;
    font-weight: 100;
    font-style: italic;
  }
`;

const FlipBtn = styled.button`
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

  backface-visibility: hidden;
`;

const FlipOuter = styled.div`
  background-color: transparent;
  flex: 1;
  perspective: 1000px;
`;

const FlipInner = styled.div`
  position: relative;
  width: 100%;
  height: 90%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  ${props => props.flipped && 'transform: rotateY(180deg);'};
`;

const FlipFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  background-color: #fff;
`;

const FlipBack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;

  background-color: #fff;
  box-shadow: 0 0 10px #eee;
  transform: rotateY(180deg);

  @media print {
    display: none !important;
  }
`;

class Chart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flipped: false
    };

    this.toggleFlip = this.toggleFlip.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
  }

  toggleFlip() {
    const isFlipped = this.state.flipped;

    this.setState({
      flipped: !isFlipped
    });
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
    const theme = this.props.theme.state;
    const { activeTab } = this.props.dashboard.state;
    const { catRes } = activeTab;
    const { charts, timespan } = activeTab;

    const chart = this.props.chart;

    /* if (!charts || charts.length < 1) return null; */
    const filtered = chart.data.filter(
      entry => entry.year >= timespan.from && entry.year <= timespan.to
    );

    // format title
    const titleLabel = catRes[0].toUpperCase() + catRes.slice(1).slice(0, -1);
    const titleName = chart.data[0][catRes.slice(0, -1)].name;
    const titleCode = chart.data[0][catRes.slice(0, -1)].code;

    //measure title
    let flex = titleName.length > 30 ? 'auto' : '1';
    flex = chart.type === 'radar' ? 'auto' : '1';
    const cutYear = titleName.length > 30 ? false : true;

    const ChartTemplate = Template[chart.type + 'Template'];

    const nth = this.props.chartIndex;
    const pageBreak = nth === 1 || (nth - 1) % 3 === 0 ? 'always' : 'avoid';

    return (
      <>
        <ChartContainer
          key={chart.id}
          className="ChartContainer"
          flex={flex}
          type={chart.type}
          pageBreak={pageBreak}
        >
          <ChartTitle>
            <span>
              {titleLabel} {titleCode} -{' '}
            </span>{' '}
            {titleName}
          </ChartTitle>

          {/* <ChartTemplate data={filtered} theme={theme} flex={flex} /> */}

          <FlipOuter className="FlipOuter">
            <FlipInner className="FlipInner" flipped={this.state.flipped}>
              <FlipFront className="FlipFront" flipped={this.state.flipped}>
                <ChartTemplate data={filtered} theme={theme} flex={flex} />
              </FlipFront>

              <FlipBack className="FlipBack" bg={theme.color.hex}>
                <ChartSettings chart={chart} />
              </FlipBack>
            </FlipInner>
          </FlipOuter>

          <FlipBtn onClick={this.toggleFlip}>
            <IconTemplate
              src={this.state.flipped ? icons.check : icons.settings}
            />
          </FlipBtn>
        </ChartContainer>
      </>
    );
  }
}

export default compose(withTheme, withDashboard)(Chart);
