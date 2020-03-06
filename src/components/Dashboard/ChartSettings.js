import React from 'react';
import styled from 'styled-components';
import { withDashboard } from './context';
import { defaultChartTypes } from './default';

const Option = styled.option``;

const Select = styled.select`
  height: 1.8rem;
  text-align: center;
  margin: 0 1rem 1rem 0;
  box-shadow: 0 0 20px #ddd;
  outline: none;
  border: none;
  font-weight: ${props => (props.selected ? '700' : '100')};

  width: 80%;
  max-width: 200px;
  margin: 0.1rem auto;

  cursor: pointer;
`;

const ChartConfig = props => {
  const { chart, children, dashboard } = props;
  const { updateChart } = dashboard.setters;

  return (
    <div>
      <h3>Settings</h3>
      <p>Id {chart.id}</p>
      <p>Type {chart.type}</p>
      <Select
        className="dropdown-select-type"
        onChange={e => updateChart(chart, 'type', e.target.value)}
        value={chart.type}
      >
        {defaultChartTypes.map(item => (
          <Option key={item} value={item} disabled={item === chart.type}>
            chart type: {item}
          </Option>
        ))}
      </Select>

      {children}
    </div>
  );
};

export default withDashboard(ChartConfig);
