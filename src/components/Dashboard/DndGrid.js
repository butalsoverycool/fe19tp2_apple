import React, { Component } from 'react';
/* import GridLayout from 'react-grid-layout'; */

import styled from 'styled-components';

import { Responsive, WidthProvider } from 'react-grid-layout';

const responsiveLayout = WidthProvider(Responsive);

const ResponsiveStyled = styled(responsiveLayout)`
  background: grey;
  /* width: 500px;
  display: grid; */
`;

const Block = styled.div`
  background: ${props => props.bg || 'white'};
  color: ${props => props.color || 'black'};

  /* display: flex;
  flex-direction: column;
  justify-content: flex-start; */
  border: red solid 1px;
`;

export const DndBlock = props => {
  const { pos, row, children, key } = props;
  return (
    <Block
      className="ChartContainer"
      data-grid={{ x: pos, y: row, w: 1, h: 1 }}
    >
      yeyeyeyey
      {/* {children} */}
    </Block>
  );
};

export default class DndGrid extends React.Component {
  render() {
    return (
      <ResponsiveStyled
        className="gridLayout DnD"
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={50}
      >
        <DndBlock key={0} pos={1} row={1} />
        <DndBlock key={1} pos={2} row={1} />
        <DndBlock key={2} pos={3} row={1} />
        <DndBlock key={3} pos={1} row={2} />
        <DndBlock key={4} pos={2} row={2} />
        <DndBlock key={5} pos={3} row={2} />
        <DndBlock key={6} pos={1} row={3} />
        <DndBlock key={7} pos={2} row={3} />
        <DndBlock key={8} pos={3} row={3} />

        {/* {this.props.children} */}
      </ResponsiveStyled>
    );
  }
}
