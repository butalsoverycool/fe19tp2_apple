// all substances
import React, { useState, useRef } from 'react';
import useOutsideClick from '../../constants/useOutsideClick';
import styled from 'styled-components';

const Options = styled.option``;

const List = styled.select`
  height: 1.8rem;
  width: 8rem;
  margin: 1rem 0rem 0.6rem 0rem;
  outline: none;

  &.dropdown-content-substance {
    // margin-left: 5rem;
  }

  &.dropdown-content-sector {
    margin-left: 2rem;
  }
`;

const DropdownContainer = styled.div`
  margin: auto;
  display: flex;
  justify-content: left;
  vertical-align: center;
`;
const Button = styled.div`
  font-size: 12px;
  text-align: right;
  text-transform: uppercase;
  font-weight: 400;
  margin: 0.5rem 1rem 0 0;
`;
const Card = styled.div`
  background: #fff;
  text-align: center;
  width: 350px;
  position: absolute;
`;

const Table = props => {
  const { tableHandler, category, setActiveClass } = props;
  const [isToggled, setToggled] = useState(false);
  const ref = useRef();

  useOutsideClick(ref, () => {
    if (isToggled) setToggled(false);
  });

  const toggle = () => setToggled(!isToggled);
  return (
    //Dropdown menus, one for substance and one for sector (year will generated )
    <>
      <Button onClick={toggle}>Edit</Button>{' '}
      <DropdownContainer className='dropdown-container'>
        {/* <TableHead className='dropdown-button'>Substance</TableHead> */}
        {isToggled && (
          <div ref={ref}>
            <Card>
              {' '}
              <List
                className='dropdown-content-substance'
                onChange={e =>
                  props.tableHandler(e.target.value, 'substancesAdded')
                }
              >
                <Options hidden disabled selected value>
                  {' '}
                  select substance{' '}
                </Options>
                {category.substances.map(item => (
                  <Options key={item.code} value={JSON.stringify(item)}>
                    {item.name}
                  </Options>
                ))}
              </List>
              {/* <TableHead className='dropdown-button'>Sector</TableHead> */}
              <List
                className='dropdown-content-sector'
                onChange={e =>
                  props.tableHandler(e.target.value, 'sectorsAdded')
                }
              >
                <Options hidden disabled selected value>
                  {' '}
                  select sector{' '}
                </Options>
                {category.sectors.map(item => (
                  <Options key={item.code} value={JSON.stringify(item)}>
                    {item.name}
                  </Options>
                ))}
              </List>
            </Card>{' '}
          </div>
        )}{' '}
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
};

export default Table;
