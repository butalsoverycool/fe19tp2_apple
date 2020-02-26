import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { proxy, apiUrl, queryBakery } from './default';
import { fetchDataTitles, fetchData } from './fetch';

import Timespan from './Timespan';
import Charts from './Charts';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
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

const TabName = styled.input`
  width: 10rem;
  height: 1.8rem;
  margin: 0 1rem 1rem 0;
  box-shadow: 0 0 20px #ddd;
  background: none;
  border: none;
  outline: none;
  text-align: center;
`;

const Option = styled.option``;

const Select = styled.select`
  height: 1.8rem;
  width: 10rem;
  margin: 0 1rem 1rem 0;
  box-shadow: 0 0 20px #ddd;
  outline: none;
  border: none;
`;

const DropdownContainer = styled.div`
  margin: 0;
  width: 85%;
  display: flex;
  justify-content: left;
  vertical-align: center;
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

    axios
      .post(proxy + apiUrl, query)
      .then(res => {
        //console.log('POST RES', res);

        const data = res.data.data.map(item => {
          const year = parseInt(item.key[2]);

          const sector = {
            name: dataTitles.sectors.filter(
              sect => sect.code === item.key[1]
            )[0].name,
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

        console.log('formated data', data);

        // sort data by year
        const sortedByYear = dataTitles.years.map(year => []);

        const firstYear = dataTitles.years[0];

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

        console.log('sorted by catKey', sortedObj);
        console.log('sorted arr', sortedArr);

        tabContent.data = sortedArr;

        this.props.updateTabs(tabContent, tabIndex);
      })
      .catch(error => {
        console.log('POST ERROR', error);
      });
  };

  render() {
    const { dataTitles, tabIndex, tabContent, updateTabs } = this.props;

    const { catKey, catVal, charts, data, id, name, timespan } = tabContent;
    const antiKey = catKey === 'substances' ? 'sectors' : 'substances';
    const tabPlaceholder = '*Give this tab a name*';

    /* if (catVal && !data) {
      this.updateData();
    } */

    return (
      <Wrapper className={'Tab-' + tabIndex}>
        <ColumnWrapper>
          <RowWrapper>
            <TabName
              placeholder={tabPlaceholder}
              value={name}
              onChange={e => this.updateTab('name', e.target.value, tabIndex)}
            ></TabName>

            <DropdownContainer className="dropdown-container-category">
              <Select
                value={catKey || 'default'}
                onChange={e =>
                  this.updateTab('catKey', e.target.value, tabIndex)
                }
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

              {catVal ? (
                <>
                  {/* Timespan arrows */}
                  <Timespan
                    timespan={timespan}
                    updateTab={this.updateTab}
                    tabIndex={tabIndex}
                    dataTitles={dataTitles}
                  />
                </>
              ) : null}
            </DropdownContainer>
          </RowWrapper>
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
