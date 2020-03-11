import React from 'react';
import styled from 'styled-components';
import { withDashboard } from '../context';
import { defaultChartTypes } from '../default';
import IconTemplate, { icons } from '../../../media/icons';

const Container = styled.div`
  & * {
    outline: none !important;

    &:focus {
      outline: none !important;
    }

    &:enabled {
      outline: none !important;
    }

    &:active {
      outline: none !important;
    }
  }
`;

const Option = styled.option``;

const Select = styled.select`
  text-align: center;
  font-weight: ${props => (props.selected ? '700' : '100')};

  cursor: pointer;

  border: none;
  outline: none;
  background: none;

  flex: 1;
  width: 10rem;
  height: 1.5rem;
`;

const ScrollBox = styled.div`
  overflow-y: scroll;
  height: 130px;
`;

const Setting = styled.div`
  padding: 5px;
  display: flex;
  justify-content: space-between;
  wrap: nowrap;

  & > * {
    margin: 0 1rem;
  }

  & > button,
  > input,
  > select {
    border-radius: 5px;
    box-shadow: 0 0 6px #ddd;

    &:hover {
      box-shadow: inset 0 0 6px #ddd;
    }
  }
`;

const Label = styled.p`
  font-size: 1rem;
  width: 5rem;
  text-align: left;
`;

const HideBtn = styled.button`
  border: none;
  outline: none;
  background: none;
  cursor: pointer;

  flex: 1;
  width: 10rem;
  height: 1.5rem;
`;

const ChartConfig = props => {
  const { chart, children, dashboard } = props;
  const { activeTab } = props.dashboard.state;
  const { updateTab, setDisabledChart } = dashboard.setters;

  const updateChart = (chart, key, newVal) => {
    // updated chart-instance
    const newChart = {
      ...chart,
      [key]: newVal
    };

    // updated tab-instance
    const newTab = activeTab;
    newTab.charts = activeTab.charts.map(chart =>
      chart.id === newChart.id ? newChart : chart
    );

    if (key === 'type') {
      newTab.chartType = 'random';
    }

    updateTab(newTab);
  };

  return (
    <Container className="SettingsContainer">
      <h3>Settings</h3>

      <ScrollBox>
        <Setting>
          <Label>Chart type</Label>
          <Select
            className="dropdown-select-type"
            onChange={e => updateChart(chart, 'type', e.target.value)}
            value={chart.type}
          >
            {defaultChartTypes.map(item => (
              <Option key={item} value={item} disabled={item === chart.type}>
                {item}
              </Option>
            ))}
          </Select>
        </Setting>

        <Setting>
          <Label>Hide</Label>
          <HideBtn onClick={e => setDisabledChart(chart.id, chart.disabled)}>
            <IconTemplate src={icons.hidden} />
          </HideBtn>
        </Setting>
      </ScrollBox>
      {children}
    </Container>
  );
};

export default withDashboard(ChartConfig);
