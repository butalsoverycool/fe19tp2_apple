import React, { Component } from 'react';
/* import GridLayout from 'react-grid-layout'; */

import styled from 'styled-components';

import { Responsive, WidthProvider } from 'react-grid-layout';

const responsiveLayout = WidthProvider(Responsive);

const ResponsiveStyled = styled(responsiveLayout)`
  background: grey;
  width: 100vw;
`;

/* const DndBlock = styled.div`
  background: ${props => props.bg || 'white'};
  color: ${props => props.color || 'black'};

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`; */

export default class DndGrid extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ResponsiveStyled
        className="gridLayout"
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={400}
      >
        {this.props.children}
      </ResponsiveStyled>
    );
  }
}

export const DndBlock = props => {
  const { pos, row, children } = props;
  return (
    <DndBlock
      className="ChartContainer"
      data-grid={{ x: pos, y: row, w: 1, h: 1 }}
    >
      {children}
    </DndBlock>
  );
};
