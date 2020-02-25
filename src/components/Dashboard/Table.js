// all substances
import React, { Component } from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-awesome-styled-grid';

const Options = styled.option``;

const Select = styled.select`
  height: 1.8rem;
  width: 10rem;
  margin: 1rem 0rem 0.6rem 0rem;
  outline: none;

  &.dropdown-content-substance {
    margin-left: 5rem;
  }

  &.dropdown-content-sector {
    margin-left: 2rem;
  }
`;

const DropdownContainer = styled.div`
  margin: auto;
  width: 85%;
  display: flex;
  justify-content: left;
  vertical-align: center;
`;

class Table extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      tab,
      setChartType,
      chartFactory,
      dataTitles,
      setActiveClass
    } = this.props;

    const catName = tab.catName;
    const catNameSingular = catName === 'substances' ? 'substance' : 'sector';

    return (
      <>
        {/*//Dropdown menus, one for substance and one for sector (year will
        generated )
         <Container>
        <Row>
      
          <Col xs={2} sm={2} md={1} lg={4} xl={4}>
            <DropdownContainer>
              <TableHead className="dropdown-button">Chart Type</TableHead>
              <Select className="dropdown-content">
                {dataTitles.chartTypes.map(item => (
                  <TD
                    key={item}
                    onClick={() => setChartType(this.props.chartIndex, item)}
                    //className={setActiveClass(item, category.yearsAdded)} 
                  >
                    {item}
                  </TD>
                ))}
              </Select>
            </DropdownContainer>
          </Col>

          <Col xs={2} sm={2} md={1} lg={4} xl={4}>
            <DropdownContainer className="dropdown-container">
              <TableHead className="dropdown-button">Substances</TableHead>
              <Select className="dropdown-content">
                {dataTitles.substances.map(item => (
                  <TD
                    key={item.code}
                    onClick={() =>
                      this.props.tableConfig(
                        this.props.chartIndex,
                        item,
                        'substances'
                      )
                    }
                    className={setActiveClass(
                      item,
                      this.props.chart.substances
                    )}
                  >
                    {item.name}
                  </TD>
                ))}
              </Select>
            </DropdownContainer>
          </Col>

          <Col xs={2} sm={2} md={1} lg={4} xl={4}>
            <DropdownContainer>
              <TableHead className="dropdown-button">Sector</TableHead>
              <Select className="dropdown-content">
                {dataTitles.sectors.map(item => (
                  <TD
                    key={item.code}
                    onClick={() =>
                      this.props.tableConfig(
                        this.props.chartIndex,
                        item,
                        'sectors'
                      )
                    }
                    className={setActiveClass(item, this.props.chart.sectors)}
                  >
                    {item.name}
                  </TD>
                ))}
              </Select>
            </DropdownContainer>
          </Col>
        </Row>
      </Container> */}
        <DropdownContainer className="dropdown-container">
          {/* <TableHead className='dropdown-button'>Substance</TableHead> */}
          <Select
            className="dropdown-content-substance"
            onChange={e => chartFactory(e.target.value, 'substancesAdded')}
            defaultValue="default"
          >
            <Options hidden disabled value="default">
              - select a {catNameSingular} -
            </Options>
            {dataTitles[catName].map(item => (
              <Options key={item.code} value={JSON.stringify(item)}>
                {item.name}
              </Options>
            ))}
          </Select>
        </DropdownContainer>
        {/* <TableHead className='dropdown-button'>Sector</TableHead> */}
        {/* <Select
            className="dropdown-content-sector"
            onChange={e => chartFactory(e.target.value, 'sectorsAdded')}
            defaultValue="default"
          >
            <Options hidden disabled value="default">
              - select a sector -
            </Options>
            {dataTitles.sectors.map(item => (
              <Options key={item.code} value={JSON.stringify(item)}>
                {item.name}
              </Options>
            ))}
          </Select>*/}

        {/* <DropdownContainer>
          <TableHead className="dropdown-button">Timespan</TableHead>
          <Select className="dropdown-content">
            {category.years.map((item) => (
              <TD
                key={item}
                onClick={() => this.props.tableHandler(item, "yearsAdded")}
                className={setActiveClass(item, category.yearsAdded)}
              >
                {item}
              </TD>
            ))}
          </Select>
        </DropdownContainer> */}
      </>
    );
  }
}
export default Table;
