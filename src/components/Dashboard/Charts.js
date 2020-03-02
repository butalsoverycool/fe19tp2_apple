import React, { Component } from 'react';
import styled from 'styled-components';

import ChartTemplate from './ChartTemplate';

import { Responsive, WidthProvider } from 'react-grid-layout';

const responsiveLayout = WidthProvider(Responsive);

const ResponsiveStyled = styled(responsiveLayout)`
  width: 100vw;
`;

const DndBlock = styled.div`
  height: 400px;
  width: ${props => props.w - (props.colCount + 1) * 5 + 'px'};
  background: ${props => props.bg || 'white'};
  color: ${props => props.color || 'black'};

  box-shadow: 0 0 20px #ddd;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  cursor: pointer;

  transition-duration: 0.1s;
`;

const ChartContainer = styled.div`
  /* min-width: 250px;
  height: 40vh; */
  position: relative;
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
  constructor(props) {
    super(props);

    this.state = {
      breakPoints: {
        lg: 1200,
        md: 996,
        sm: 768,
        xs: 480,
        xxs: 0
      },
      cols: { lg: 6, md: 4, sm: 3, xs: 2, xxs: 1 },
      colCount: null
    };
  }

  componentDidMount = () => {
    this.setState({ colCount: this.colCount() });
    window.addEventListener('resize', this.onBreakPointChange);
  };

  componentWillUnmount() {
    window.removeEventListener('resize', this.onBreakPointChange);
  }

  onBreakPointChange = e => {
    this.setState({ colCount: null });
  };

  colCount = () => {
    const { breakPoints, cols } = this.state;
    const winW = window.innerWidth;

    for (let point in breakPoints) {
      if (winW > breakPoints[point]) {
        return cols[point];
      }
    }
  };

  render() {
    let { allData, catKey, catVal, antiKey, timespan } = this.props;
    if (!allData) return null;

    const displayedData = allData.map(data =>
      data.filter(
        item => item.year >= timespan.from && item.year <= timespan.to
      )
    );

    const { breakPoints, cols, colCount } = this.state;

    let row = 0;

    const colSize = window.innerWidth / colCount;

    return (
      <>
        <ResponsiveStyled
          className="gridLayout"
          breakpoints={breakPoints}
          cols={cols}
          rowHeight={400}
          onBreakpointChange={this.onBreakPointChange}
          colCount={colCount}
        >
          {displayedData.map((data, nth) => {
            if (nth >= colCount && nth % colCount === 0) row++;

            let pos = nth < colCount ? nth : nth % colCount;

            // format title
            const titleKey =
              antiKey[0].toUpperCase() + antiKey.slice(1).slice(0, -1);

            const titleVal = data[0][antiKey.slice(0, -1)].name;

            //measure title
            const flex = titleVal.length > 30 ? 'auto' : '1';
            const cutYear = titleVal.length > 30 ? false : true;

            return (
              <DndBlock
                className="DndBlock"
                data-grid={{ x: pos, y: row, w: 1, h: 1 }}
                w={colSize}
                colCount={colCount}
                key={nth}
                col={pos}
                row={row}
              >
                <ChartTitle>
                  {titleKey}: {titleVal}
                </ChartTitle>
                <ChartTemplate data={data} catVal={catVal} cutYear={cutYear} />
              </DndBlock>
            );
          })}
        </ResponsiveStyled>
      </>
    );
  }
}

/* class DndBlock extends Component {
  constructor(props) {
    super(props);

    console.log('block props', this.props.gridProps);
  }

  render() {
    const { className, dataGrid, key, w, gridProps, children } = this.props;
    return (
      <DndBlockStyled
        className={className}
        data-grid={dataGrid}
        w={w}
        colCount={gridProps.colCount}
      ></DndBlockStyled>
    );
  }
} */
