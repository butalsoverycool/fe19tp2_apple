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
    // we are officially waiting for charts to load...
    if (this.state._isMounted) {
      const { setFetchingCharts } = this.props.dashboard.setters;
      setFetchingCharts({
        started: true,
        ended: false
      });
    }

    // some relevant vars and funcs from dashboard ctx
    const { activeTab, dataTitles } = this.props.dashboard.state;
    const { updateTab, setStorage } = this.props.dashboard.setters;
    const { catKey, catVal, catRes } = activeTab;

    // (catRes = the not chosen cat)
    // singular version of catRes (eg substances - substance) for pointing to the right data-prop later
    const catResSingular = catRes.slice(0, -1);

    // bake our query based on user choice (catVal)
    const query = queryBakery(catKey, catVal);

    // going down to axios...

    const processData = input => {
      // 1. pick out each subdata pack into arr
      const data = input.map((item, nth) => {
        return {
          //year
          year: parseInt(item.key[2]),

          // sector: only got code so get corresponding name from dataTitles by comparing code
          sector: {
            name: dataTitles.sectors.filter(
              sect => sect.code === item.key[1]
            )[0].name,
            code: item.key[1]
          },

          // subst: same with substance
          substance: {
            name: dataTitles.substances.filter(
              subs => subs.code === item.key[0]
            )[0].name,
            code: item.key[0]
          },

          // value
          value: parseInt(item.values[0]) || 0
        };
      });

      // 2.
      // we want 1 chart for each of the catRes:ess
      // and each chart with all the data vals of the chosen catVal

      // create obj with catRes-keys
      // sort data based on category key/val
      const sortedObj = {};

      // put each fetched data-item in the right obj-arr based on key
      data.forEach(item => {
        // current key to match from item's prop
        const itemKey = item[catResSingular].code || item[catResSingular];

        // if not exists, create arr to push into
        if (typeof sortedObj[itemKey] !== 'object') sortedObj[itemKey] = [];
        sortedObj[itemKey].push(item);
      });

      // but hey, we wanted an arr all along...
      const sortedArr = Object.values(sortedObj);

      // data structure completed!

      // make chart-template of each item in our arr
      const charts = sortedArr.map((item, nth) => defaultChart(item, nth));

      // put charts in current tab
      activeTab.charts = charts;

      // update tab (and all tabs in dashboard ctx)
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
        processData(allEmissionData); // temp** PLAN B!
      });
  };

  render() {
    const {
      dataTitles,
      activeTab: tab,
      fetchingCharts
    } = this.props.dashboard.state;

    const { catKey, catVal, name, timespan, chartType } = tab;

    const tabPlaceholder = 'Give this tab a name';

    if (dataTitles.length < 1) {
      return null;
    }

    if (this.state.fetching) console.log('fetching data charts');

    return (
      <Wrapper className="TabSettingsWrapper">
        {fetchingCharts.started && (
          <PopupMsg
            txt="Fetching your charts"
            enter={true}
            exit={fetchingCharts.ended}
            loader={true}
            exDelay=".5s"
          />
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
