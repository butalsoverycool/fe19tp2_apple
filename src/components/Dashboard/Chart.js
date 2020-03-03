import React, { Component } from 'react';
import styled from 'styled-components';
import { compose } from 'recompose';
import { withTheme } from '../Theme/context';
import { withDashboard } from './context';

import { defaultChart } from './default';
import ChartTemplate from './ChartTemplate';

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

    this.delChartHandler = this.delChartHandler.bind(this);
  }

  delChartHandler = (tabIndex, chartIndex) => {
    alert('del chart');
    const allData = this.props.allData;
    allData[chartIndex].forEach(data => (data.hidden = true));

    console.log('updating chartIndex', chartIndex, 'allData', allData);
    this.props.updateTab('data', allData, tabIndex);
  };

  render() {
    let { allData, catVal, antiKey, timespan, theme, hideChart } = this.props;
    if (!allData) return null;

    const themeColor = theme.state.color.hex.slice(1);

    //const filteredHidden = allData.filter(item => )

    // filter by timespan and format chartObj
    const filteredCharts = allData.map(data =>
      data
        .filter(item => item.year >= timespan.from && item.year <= timespan.to)
        .map((item, nth) => defaultChart(item, nth))
    );

    return (
      <>
        {filteredCharts.map((data, nth) => {
          // temp* autogenerate type
          const type =
            nth % 5 === 0
              ? 'radar'
              : nth % 4 === 0
              ? 'scatter'
              : nth > 1 && nth % 3 === 0
              ? 'pie'
              : nth % 2 === 0
              ? 'area'
              : 'bar';

          // format title
          const titleKey =
            antiKey[0].toUpperCase() + antiKey.slice(1).slice(0, -1);

          const titleVal = data[0][antiKey.slice(0, -1)].name;

          //measure title
          const flex = titleVal.length > 30 ? 'auto' : '1';
          const cutYear = titleVal.length > 30 ? false : true;

          return (
            <ChartContainer
              key={nth}
              chartIndex={nth}
              className="ChartContainer"
              flex={flex}
              type={type}
            >
              <ChartTitle>
                {titleKey}: {titleVal}
              </ChartTitle>

              <ChartTemplate
                data={data}
                catVal={catVal}
                cutYear={cutYear}
                type={type}
              />

              <DelChartBtn onClick={() => hideChart(nth)}>
                <img
                  src={`https://img.icons8.com/metro/26/${themeColor ||
                    '333333'}/trash.png`}
                  alt="trash_chart"
                />
              </DelChartBtn>
            </ChartContainer>
          );
        })}
      </>
    );
  }
}

export default compose(withTheme, withDashboard)(Chart);
