import React from 'react';
import styled from 'styled-components';
//import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import { withDashboard } from './context';

import { Responsive, WidthProvider } from 'react-grid-layout';
import { Points } from 'three';

const responsiveLayout = WidthProvider(Responsive);

const ResponsiveStyled = styled(responsiveLayout)`
  background: none;
  width: 100vw;
`;

export const Block = styled.div`
  background: ${props => props.bg || 'white'};
  color: ${props => props.color || 'black'};
`;

/* const Block = styled.div`
  background: grey;
  border: black solid 1px;
`; */

export const Content = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  display: block;
`;

class Dnd2 extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { activeTab } = this.props.dashboard.state;
    const charts = activeTab ? activeTab.charts : [];

    /* Hmm...
        when rendering charts on each row,
        for every chart, calculate remaining space on row (remaining grid spot)
        for example: if chart is radar, it takes up 1 spot, else 2
    */

    const createLayout = limit => {
      let pos = 0;
      let row = 0;

      return (() =>
        // if limit reach, row break and pos 0
        charts.map(chart => {
          if (pos >= limit) {
            pos = 0;
            row += 1;
          }

          // layout obj
          const res = {
            i: chart.id,
            x: pos,
            y: row,
            w: 1,
            h: 1,
            minW: 1
          };

          // inc pos for next iteration
          pos++;

          // return layout obj
          return res;
        }))();
    };

    const config = [
      {
        name: 'lg',
        breakpoint: 1090,
        cols: 3
      },
      {
        name: 'md',
        breakpoint: 728,
        cols: 2
      },
      {
        name: 'sm',
        breakpoint: 667,
        cols: 1
      },
      {
        name: 'xs',
        breakpoint: 480,
        cols: 1
      }
    ];

    const breakpoints = {},
      cols = {},
      layouts = {};

    config.forEach(point => {
      breakpoints[point.name] = point.breakpoint;
      cols[point.name] = point.cols;
      layouts[point.name] = createLayout(point.cols);
    });

    console.log(layouts);

    return (
      <ResponsiveStyled
        className="gridLayout DnD"
        breakpoints={breakpoints}
        cols={cols}
        layouts={layouts}
        rowHeight={300}
      >
        {/* {charts.map(chart => (
          <Block key={chart.id}>
            <Content>{this.props.children}</Content>
          </Block>
        ))} */}

        {this.props.children}
      </ResponsiveStyled>
    );
  }
}

export default withDashboard(Dnd2);
