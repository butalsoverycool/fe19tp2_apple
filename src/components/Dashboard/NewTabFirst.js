import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { withDashboard } from './context';

const Btn = styled.button`
  position: absolute;
  width: 6rem;
  height: 6rem;
  font-size: 2rem;
  padding: 0.5rem;
  margin: auto;

  box-shadow: 0 0 20px #ddd;
  border: none;
  border-radius: 50%;
  outline: none;
  position: absolute;
  z-index: 1;
  cursor: pointer;
  transition-duration: 0.4s;

  transform: ${props =>
    props.tabLen < 1
      ? 'translate3d(50vw,40vh,0) translateX(-3rem) translateY(-3rem)'
      : 'translate3d(50vw, -20vh, 0) translateX(-3rem) translateY(-3rem);'};

  opacity: ${props => (props.tabLen < 1 ? '1' : '0')};

  &:hover {
    box-shadow: 0px 0px 10px #bbb;
  }
`;

const Txt = styled.p`
  color: grey;
  font-weight: 100;
  font-style: italic;
  opacity: 0.6;
  font-size: 0.8rem;

  text-align: center;
  width: 6rem;
  display: block;
  position: absolute;

  transform: ${props =>
    props.tabLen < 1
      ? 'translate3d(50vw,40vh,0) translateX(-3rem) translateY(0)'
      : 'translate3d(50vw, 3000px, 0) translateX(-3rem) translateY(-3rem);'};
  transition-duration: 0.4s;
  margin-top: 5rem;

  display: ${props => (props.tabLen < 1 ? 'block' : 'none')};
`;

const NewFirstTab = props => {
  const { newTab } = props.dashboard.setters;
  const { tabs, activeTab, creatingTab } = props.dashboard.state;

  const tabLen = tabs ? tabs.length : 0;
  const charts = activeTab ? activeTab.charts : null;
  const hiddenCharts = charts ? charts.filter(chart => chart.disabled) : [];

  return (
    <>
      <Btn
        className="NewTabBtn"
        tabLen={tabLen}
        creatingTab={creatingTab}
        onClick={newTab}
        radius={hiddenCharts.length < 1 ? '0 0 10px 0' : ''}
        weight="700"
      >
        +
      </Btn>

      {props.siblingTxt ? <Txt tabLen={tabLen}>{props.siblingTxt}</Txt> : null}
    </>
  );
};

export default withDashboard(NewFirstTab);
