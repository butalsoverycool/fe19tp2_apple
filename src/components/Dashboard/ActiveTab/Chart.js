import React, { Component } from 'react';
import styled from 'styled-components';
import { compose } from 'recompose';
import { withTheme } from '../../Theme/context';
import { withDashboard } from '../context';

import { ResponsiveContainer } from 'recharts';

import { defaultChart, defaultDataPoint } from '../default';

import ChartSettings from './ChartSettings';

import * as Template from './ChartTemplate';

import IconTemplate, { icons } from '../../../media/icons';

const FlipContainer = styled.div`
  background: none;
  flex: 1;
  perspective: 1000px;

  ${props =>
    props.type === 'Radar' ? `max-width: 300px;` : 'max-width: auto'};
  min-width: 300px;
  height: 300px;
  margin: 2rem;
  position: relative;

  @media print {
    page-break-after: ${props => props.pageBreak} !important;

    float: none !important;
    position: static !important;
    display: block;
    box-sizing: content-box !important;
  }
`;

const FlipCard = styled.div`
  background-color: transparent;
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  border-radius: 20px;
  box-shadow: 0 0 20px #ddd;
  border: none;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  ${props => props.flipped && 'transform: rotateY(180deg)'};

  & * {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }
`;

const FlipFront = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 0 20px #ddd;
`;

const FlipBack = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  box-shadow: 0 0 20px #ddd;
  background-color: #fff;
  box-shadow: 0 0 10px #eee;

  transform: rotateY(180deg);

  @media print {
    display: none !important;
  }
`;

const Content = styled.div`
  width: 95%;
  height: ${props => (props.type === 'Area' ? '90%' : '95%')};
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
`;

const Section = styled.div`
  ${props => props.flex && 'flex: ' + props.flex};
`;

const ChartTitle = styled.h4`
  font-size: 16px;
  margin: 0;

  & > span {
    opacity: 0.6;
    color: #666;
    font-weight: 100;
    font-style: italic;
  }
`;

const FlipBtn = styled.button`
  position: absolute;
  right: 0;
  bottom: 0;
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
        <FlipContainer
          className="FlipContainer ChartContainer"
          type={chart.type}
          pageBreak={pageBreak}
          data={filtered}
          theme={theme}
          flex={flex}
        >
          {/* <ChartContainer
            
          > */}
          {/* <ChartTemplate data={filtered} theme={theme} flex={flex} /> */}

          <FlipCard className="FlipCard" flipped={this.state.flipped}>
            <FlipFront className="FlipFront" flipped={this.state.flipped}>
              <Content className="Content" type={chart.type}>
                <Section className="Section">
                  <ChartTitle>
                    <span>
                      {titleLabel} {titleCode} -{' '}
                    </span>{' '}
                    {titleName}
                  </ChartTitle>
                </Section>
                <Section className="Section" flex="1">
                  <ChartTemplate data={filtered} theme={theme} flex={flex} />
                </Section>
              </Content>
              <FlipBtn onClick={this.toggleFlip} className="FlipBtn Front">
                <IconTemplate src={icons.settings} />
              </FlipBtn>
            </FlipFront>

            <FlipBack className="FlipBack" bg={theme.color.hex}>
              <Content>
                <ChartSettings chart={chart} />
              </Content>
              <FlipBtn onClick={this.toggleFlip} className="FlipBtn Back">
                <IconTemplate src={icons.check} />
              </FlipBtn>
            </FlipBack>
          </FlipCard>

          {/* </ChartContainer> */}
        </FlipContainer>
      </>
    );
  }
}

export default compose(withTheme, withDashboard)(Chart);
