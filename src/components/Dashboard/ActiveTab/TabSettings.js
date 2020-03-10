import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {
  proxy,
  apiUrl,
  queryBakery,
  defaultChart,
  defaultChartTypes
} from '../default';
import allEmissionData from '../allEmissionData';

import PopupMsg from '../../PopupMsg';
import { withDashboard } from '../context';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const TabWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const DropdownContainer = styled.div`
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
`;

const TabName = styled.input`
  height: 1.8rem;
  box-shadow: 0 0 20px #eee;
  background: none;
  border: none;
  outline: none;
  text-align: center;
  font-size: 1rem;

  width: 80%;
  max-width: 400px;
  margin: 0.5rem auto;
`;

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

class TabSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetching: false,
      _isMounted: false
    };

    this.dropDownHandler = this.dropDownHandler.bind(this);
  }

  componentDidMount() {
    this.setState({ _isMounted: true });
  }

  componentWillUnmount() {
    this.setState({ _isMounted: false });
  }

  dropDownHandler = (key, val) => {
    const { dataTitles, activeTab } = this.props.dashboard.state;

    const { updateTab } = this.props.dashboard.setters;

    activeTab[key] = val;

    // if catVal is changed, update data
    if (key === 'catVal') {
      this.updateData();
      return;
    }

    // if catKey is changed, reset val (and data)
    if (key === 'catKey') {
      const catRes = val === 'substances' ? 'sectors' : 'substances';
      activeTab.catVal = null;
      activeTab.catRes = catRes;
      activeTab.charts = [];
      activeTab.timespan = {
        from: Number(dataTitles.years[0]),
        to: Number(dataTitles.years[dataTitles.years.length - 1])
      };
      activeTab.chartType = 'random';
    }

    if (key === 'chartType') {
      activeTab.charts = activeTab.charts.map(chart => {
        chart.type = val;
        return chart;
      });
    }

    updateTab(activeTab);
  };

  updateData = () => {
    if (this.state._isMounted) {
      this.setState({ fetching: true });
    }

    //const { setFetchingCharts } = this.props.dashboard.setters;
    //setFetchingCharts({ started: true, ended: false });

    const { activeTab, dataTitles } = this.props.dashboard.state;
    const { updateTab, setStorage } = this.props.dashboard.setters;
    const { catKey, catVal, catRes } = activeTab;

    const query = queryBakery(catKey, catVal);

    const processData = input => {
      const data = input.map((item, nth) => {
        const year = parseInt(item.key[2]);

        const sector = {
          name: dataTitles.sectors.filter(sect => sect.code === item.key[1])[0]
            .name,
          code: item.key[1]
        };

        //const substance = item.key[0];
        const substance = {
          name: dataTitles.substances.filter(
            subs => subs.code === item.key[0]
          )[0].name,
          code: item.key[0]
        };

        const value = parseInt(item.values[0]) || 0;

        /* return defaultChart({ year, sector, substance, value }, nth); */
        return {
          year,
          sector,
          substance,
          value
        };
      });

      // sort data based on category key/val
      const sortedObj = {};

      dataTitles[catRes].forEach(item => {
        sortedObj[item.code] = [];
      });

      const catResSingular = catRes.slice(0, -1);

      data.forEach((item, nth) => {
        const itemKey = item[catResSingular].code || item[catResSingular];

        sortedObj[itemKey].id = 'chart-' + nth;
        sortedObj[itemKey].push(item);
      });

      const sortedArr = Object.values(sortedObj);

      const charts = sortedArr.map((item, nth) => defaultChart(item, nth));
      //console.log('data sorted based on catKey/Val', sortedArr);

      activeTab.charts = charts;

      setStorage('activeTab', activeTab);
      updateTab(activeTab);
    };

    axios
      .post(proxy + apiUrl, query)
      .then(res => {
        processData(res.data.data);
      })
      .catch(error => {
        console.log('POST ERROR', error);
        processData(allEmissionData);
      });
  };

  render() {
    const { dataTitles, activeTab: tab } = this.props.dashboard.state;

    const { catKey, catVal, name, timespan, chartType } = tab;

    const tabPlaceholder = 'Give this tab a name';

    if (this.state.fetching) console.log('fetching data charts');

    return (
      <Wrapper className="TabSettingsWrapper">
        {this.state.fetching && (
          <PopupMsg txt="Fetching your charts" enter={true} loader={true} />
        )}

        <TabWrapper>
          <DropdownContainer className="DropdownContainer">
            <TabName
              placeholder={tabPlaceholder}
              value={name}
              onChange={e => this.dropDownHandler('name', e.target.value)}
              onBlur={e => this.dropDownHandler('name', e.target.value)}
              onKeyUp={e => {
                if (e.keyCode === 13) {
                  this.dropDownHandler('name', e.target.value);
                }
              }}
            ></TabName>

            {/*  <DropdownContainer className="dropdown-container-category"> */}
            <Select
              value={catKey || 'default'}
              selected={catKey}
              onChange={e => this.dropDownHandler('catKey', e.target.value)}
            >
              <Option disabled value="default">
                - select category -
              </Option>
              <Option value="substances">Substance</Option>
              <Option value="sectors">Sector</Option>
            </Select>

            {catKey ? (
              <Select
                className="dropdown-content-substance"
                selected={catVal}
                onChange={e => this.dropDownHandler('catVal', e.target.value)}
                value={catVal || 'default'}
                hidden={!catKey}
              >
                <Option disabled value="default">
                  - select a {catKey.slice(0, -1)} -
                </Option>
                {dataTitles[catKey].map(item => (
                  <Option key={item.code} value={item.code}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            ) : null}

            {catVal ? (
              <>
                {/* PopupMsg */}

                {/* Timespan dropdowns */}
                <Select
                  className="dropdown-content-timespan-from"
                  onChange={e =>
                    this.dropDownHandler('timespan', {
                      from: Number(e.target.value),
                      to: timespan.to
                    })
                  }
                  value={timespan.from || 'default'}
                >
                  <Option disabled value="default">
                    - view from year -
                  </Option>
                  {dataTitles.years.map(item => (
                    <Option
                      key={item}
                      value={Number(item)}
                      disabled={item > timespan.to}
                    >
                      from {item}
                    </Option>
                  ))}
                </Select>

                <Select
                  className="dropdown-content-timespan-to"
                  onChange={e =>
                    this.dropDownHandler('timespan', {
                      from: timespan.from,
                      to: Number(e.target.value)
                    })
                  }
                  value={timespan.to || 'default'}
                >
                  <Option disabled value="default">
                    - view from year -
                  </Option>
                  {dataTitles.years.map(item => (
                    <Option
                      key={item}
                      value={Number(item)}
                      disabled={item < timespan.from}
                    >
                      to {item}
                    </Option>
                  ))}
                </Select>

                <Select
                  className="dropdown-content-chart-type"
                  onChange={e =>
                    this.dropDownHandler('chartType', e.target.value)
                  }
                  value={chartType}
                >
                  <Option disabled value="random">
                    - select chart type -
                  </Option>
                  {defaultChartTypes.map(type => (
                    <Option
                      key={type}
                      value={type}
                      disabled={type === chartType}
                    >
                      {type}
                    </Option>
                  ))}
                </Select>
              </>
            ) : null}
            {/* </DropdownContainer> */}
          </DropdownContainer>
        </TabWrapper>
      </Wrapper>
    );
  }
}

export default withDashboard(TabSettings);
