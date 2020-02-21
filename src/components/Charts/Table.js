// all substances
import React, { Component } from 'react';
import styled from 'styled-components';


const Options = styled.option`
`;

const List = styled.select`
  height: 1.8rem;
  width: 10rem;
  margin: 1rem 0rem .6rem 0rem;
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
  render() {
    const { tableHandler, category, setActiveClass } = this.props;
    return (
      //Dropdown menus, one for substance and one for sector (year will generated )
      <>
        <DropdownContainer className='dropdown-container'>
          {/* <TableHead className='dropdown-button'>Substance</TableHead> */}
          <List className='dropdown-content-substance'
            onChange={(e) => this.props.tableHandler(e.target.value, 'substancesAdded')}>
            <Options hidden disabled selected value> -  select a substance  - </Options>
            {category.substances.map(item => (
              <Options
                key={item.code}
                value={JSON.stringify(item)}
              >
                {item.name}
              </Options>
            ))}
          </List>

          {/* <TableHead className='dropdown-button'>Sector</TableHead> */}
          <List className='dropdown-content-sector'
            onChange={(e) => this.props.tableHandler(e.target.value, 'sectorsAdded')}>
            <Options hidden disabled selected value> -  select a sector  - </Options>
            {category.sectors.map(item => (
              <Options
                key={item.code}
                value={JSON.stringify(item)}
              >
                {item.name}
              </Options>
            ))}
          </List>
        </DropdownContainer>

        {/* <DropdownContainer>
          <TableHead className="dropdown-button">Timespan</TableHead>
          <List className="dropdown-content">
            {category.years.map((item) => (
              <TD
                key={item}
                onClick={() => this.props.tableHandler(item, "yearsAdded")}
                className={setActiveClass(item, category.yearsAdded)}
              >
                {item}
              </TD>
            ))}
          </List>
        </DropdownContainer> */}
      </>
    );
  }
}
export default Table;
