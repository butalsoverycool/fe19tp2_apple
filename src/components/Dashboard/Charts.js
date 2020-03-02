import React, { Component } from 'react';
import styled from 'styled-components';

import ChartTemplate from './ChartTemplate';

const ChartContainer = styled.div`
  min-width: 250px;
  height: 40vh;
  min-height: 300px;
  background: white;
  margin: 2rem;
  padding: 1rem;
  border-radius: 20px;
  border: none;
  box-shadow: 0 0 20px #ddd;
  flex: ${props => props.flex || 1};

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const ChartTitle = styled.h4`
  font-size: 16px;
`;

export default class Charts extends Component {
  /* constructor(props) {
    super(props);
  } */

  render() {
    let { allData, catVal, antiKey, timespan } = this.props;
    if (!allData) return null;

    const displayedData = allData.map(data =>
      data.filter(
        item => item.year >= timespan.from && item.year <= timespan.to
      )
    );

    return (
      <>
        {displayedData.map((data, nth) => {
          // temp* autogenerate type
          const type = nth % 2 === 0 ? 'area' : 'bar';

          // format title
          const titleKey =
            antiKey[0].toUpperCase() + antiKey.slice(1).slice(0, -1);

          const titleVal = data[0][antiKey.slice(0, -1)].name;

          //measure title
          const flex = titleVal.length > 30 ? 'auto' : '1';
          const cutYear = titleVal.length > 30 ? false : true;

          return (
            <ChartContainer key={nth} className="ChartContainer" flex={flex}>
              <ChartTitle>
                {titleKey}: {titleVal}
              </ChartTitle>
              <ChartTemplate
                data={data}
                catVal={catVal}
                cutYear={cutYear}
                type={type}
              />
            </ChartContainer>
          );
        })}
      </>
    );
  }
}
