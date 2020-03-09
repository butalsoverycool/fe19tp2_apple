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

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;

  border: none;
  background: #fff;
  box-shadow: inset 0 0 5px #ccc;

  & > input {
    opacity: 0;
    width: 0;
    height: 0;
  }
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  outline: none !important;
  border: red white 2px;
  -webkit-transition: 0.4s;
  transition: 0.4s;

  &:before {
    box-shadow: 0 0 5px #ccc;
    background: #fff;
    outline: none !important;
    border: none;
    position: absolute;
    content: '';
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }
`;

const CheckBox = styled.input`
  box-shadow: 0 0 10px #eee;
  outline: none;
  border: none;

  &:checked + span {
    box-shadow: 0 0 10px #eee;
  }

  &:focus + span {
    box-shadow: 0 0 1px #2196f3;
    outline: none !important;
  }

  &:checked + span:before {
    background: #fefefe;
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
`;

const ChartConfig = props => {
  const { chart, children, dashboard } = props;
  const { updateChart, setDisabledChart } = dashboard.setters;

  return (
    <Container className="SettingsContainer">
      <h3>Settings</h3>

      <ScrollBox>
        {/*  Toggle switch */}
        {/* <Setting>
          <p>Hide chart</p>
          <Switch className="switch">
            <CheckBox type="checkbox" />
            <Slider className="slider"></Slider>
          </Switch>
        </Setting> */}

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
