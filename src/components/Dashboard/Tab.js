import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { proxy, apiUrl, queryBakery } from './default';
import allEmissionData from './allEmissionData';

import PopupMsg from '../PopupMsg';
import Charts from './Charts';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  margin-top: 5rem;
`;

const ColumnWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const RowWrapper = styled.div`
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const DropDownWrapper = styled.div`
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
`;

export default class Tab extends Component {
  constructor(props) {
    super(props);

    this.updateCat = this.updateCat.bind(this);
    this.updateTab = this.updateTab.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  updateTab = (key, val, tabIndex) => {
    const { tabContent, dataTitles } = this.props;

    tabContent[key] = val;

    // if catKey is changed, reset val (and data)
    if (key === 'catKey') {
      tabContent.catVal = null;
      tabContent.data = null;
      tabContent.timespan = {
        from: Number(dataTitles.years[0]),
        to: Number(dataTitles.years[dataTitles.years.length - 1])
      };
    }
    // if catVal is changed, update data
    else if (key === 'catVal') {
      this.updateData(tabIndex);
    }

    this.props.updateTabs(tabContent, tabIndex);
  };

  updateCat = (tabIndex, propName, selected) => {
    const tabContent = this.props.tabContent;

    tabContent[propName] = selected;

    this.props.updateTabs(tabContent, tabIndex);
  };

  updateData = tabIndex => {
    const { tabContent, dataTitles } = this.props;

    const { catKey, catVal } = tabContent;

    const query = queryBakery(catKey, catVal);

    const processData = input => {
      const data = input.map(item => {
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

        return {
          year,
          sector,
          substance,
          value
        };
      });

      // sort data based on category key/val
      const antiKey = catKey === 'substances' ? 'sectors' : 'substances';
      const antiKeySingular = antiKey.slice(0, -1);

      const sortedObj = {};
      dataTitles[antiKey].forEach(item => {
        sortedObj[item.code] = [];
      });

      data.forEach(item => {
        const itemKey = item[antiKeySingular].code || item[antiKeySingular];
        sortedObj[itemKey].push(item);
      });

      const sortedArr = Object.values(sortedObj);

      //console.log('data sorted based on catKey/Val', sortedArr);

      tabContent.data = sortedArr;

      this.props.updateTabs(tabContent, tabIndex);
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
    const { dataTitles, tabIndex, tabContent } = this.props;

    const { catKey, catVal, data, name, timespan } = tabContent;
    const antiKey = catKey === 'substances' ? 'sectors' : 'substances';
    const tabPlaceholder = '*Give this tab a name*';

    const loaderEnter = Boolean(catVal && !data);
    const loaderExit = Boolean(data);

    return (
      <Wrapper className={'Tab-' + tabIndex}>
        <ColumnWrapper>
          <DropDownWrapper
            className="DropdownWrapper"
            bg="orange"
            justify="center"
          >
            <TabName
              placeholder={tabPlaceholder}
              value={name}
              onChange={e => this.updateTab('name', e.target.value, tabIndex)}
            ></TabName>

            {/*  <DropdownContainer className="dropdown-container-category"> */}
            <Select
              value={catKey || 'default'}
              selected={catKey}
              onChange={e => this.updateTab('catKey', e.target.value, tabIndex)}
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
                onChange={e =>
                  this.updateTab('catVal', e.target.value, tabIndex)
                }
                value={catVal || 'default'}
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
            {/*  </DropdownContainer>

            <DropdownContainer> */}
            {catVal ? (
              <>
                {/* PopupMsg */}
                <PopupMsg
                  txt="Fetching your charts"
                  enter={loaderEnter}
                  exit={loaderExit}
                  timeout={0}
                  loader={true}
                />

                {/* Timespan arrows */}
                <Select
                  className="dropdown-content-timespan-from"
                  onChange={e =>
                    this.updateTab(
                      'timespan',
                      { from: e.target.value, to: timespan.to },
                      tabIndex
                    )
                  }
                  value={timespan.from || 'default'}
                >
                  <Option disabled value="default">
                    - view from year -
                  </Option>
                  {dataTitles.years.map(item => (
                    <Option key={item} value={Number(item)}>
                      from {item}
                    </Option>
                  ))}
                </Select>

                <Select
                  className="dropdown-content-timespan-to"
                  onChange={e =>
                    this.updateTab(
                      'timespan',
                      { from: timespan.from, to: e.target.value },
                      tabIndex
                    )
                  }
                  value={timespan.to || 'default'}
                >
                  <Option disabled value="default">
                    - view from year -
                  </Option>
                  {dataTitles.years.map(item => (
                    <Option key={item} value={Number(item)}>
                      to {item}
                    </Option>
                  ))}
                </Select>
                {/* <Timespan
                    timespan={timespan}
                    updateTab={this.updateTab}
                    tabIndex={tabIndex}
                    dataTitles={dataTitles}
                  /> */}
              </>
            ) : null}
            {/* </DropdownContainer> */}
          </DropDownWrapper>

          <RowWrapper>
            {catVal ? (
              <Charts
                allData={data}
                catKey={catKey}
                catVal={catVal}
                antiKey={antiKey}
                dataTitles={dataTitles}
                timespan={timespan}
              />
            ) : null}

            {this.props.children}
          </RowWrapper>
        </ColumnWrapper>
      </Wrapper>
    );
  }
}
