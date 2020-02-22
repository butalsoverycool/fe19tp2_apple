// all substances
import React, { Component } from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-awesome-styled-grid';

const TableHead = styled.button`
  background-color: lightgrey;
  height: 2rem;
  border-radius: 5px;
  text-align: center;
  width: 8rem;
  padding: 0;
  font-size: 1rem;
  border: none;
  cursor: pointer;
`;

const TD = styled.p`
  color: black;
  padding: 0rem 1rem 0rem 1rem;
  text-decoration: none;
  display: block;

  &.active {
    background-color: lightgrey;
  }
  &:hover {
    cursor: pointer;
  }
`;

const List = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  height: 30rem;
  overflow: scroll;
`;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 100px;

  &:hover ${List} {
    display: block;
  }
`;

class Table extends Component {
  render() {
    const { tableHandler, category, setActiveClass } = this.props;
    return (
      //Dropdown menus, one for substance and one for sector (year will generated )
      <Container>
        <Row>
          <Col xs={2} sm={2} md={1} lg={4} xl={4}>
            <DropdownContainer className='dropdown-container'>
              <TableHead className='dropdown-button'>Substance</TableHead>
              <List className='dropdown-content'>
                {category.substances.map(item => (
                  <TD
                    key={item.code}
                    onClick={() => tableHandler(item, 'substancesAdded')}
                    className={setActiveClass(item, category.substancesAdded)}
                  >
                    {item.name}
                  </TD>
                ))}
              </List>
            </DropdownContainer>
          </Col>

          <Col xs={2} sm={2} md={1} lg={4} xl={4}>
            <DropdownContainer>
              <TableHead className='dropdown-button'>Sector</TableHead>
              <List className='dropdown-content'>
                {category.sectors.map(item => (
                  <TD
                    key={item.code}
                    onClick={() =>
                      this.props.tableHandler(item, 'sectorsAdded')
                    }
                    className={setActiveClass(item, category.sectorsAdded)}
                  >
                    {item.name}
                  </TD>
                ))}
              </List>
            </DropdownContainer>
          </Col>

          <Col xs={2} sm={2} md={1} lg={4} xl={4}>
            <DropdownContainer>
              <TableHead className='dropdown-button'>Timespan</TableHead>
              <List className='dropdown-content'>
                {category.years.map(item => (
                  <TD
                    key={item}
                    onClick={() => this.props.tableHandler(item, 'yearsAdded')}
                    className={setActiveClass(item, category.yearsAdded)}
                  >
                    {item}
                  </TD>
                ))}
              </List>
            </DropdownContainer>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default Table;
