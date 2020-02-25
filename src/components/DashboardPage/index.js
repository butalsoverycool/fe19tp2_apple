import React from 'react';
import Charts from '../Charts';
import styled, { ThemeProvider } from 'styled-components';
import { compose } from 'recompose';
import { withAuthorization } from '../Session';
import { Theme } from '../GlobalStyles';
import { withTheme } from '../Theme';
import { device } from '../device';
import { Container, Row, Col } from 'react-awesome-styled-grid'


const Grid = styled.div`
  max-width: 1440px;
  display: grid;
  grid-gap: 10px;
  grid-auto-rows: auto;

  @media ${device.mobileL} {
    grid-template-columns: 1fr;
  }
  @media ${device.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }
  @media ${device.laptop} {
    grid-template-columns: repeat(2, 1fr);
  }
  @media ${device.laptopL} {
    grid-template-columns: repeat(3, 1fr);
  }
  @media ${device.desktop} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const GridWrapper = styled.div`
max-width: 90%;
grid-column-start: 1;
grid-column-end: span 10;

@media ${device.mobileS} {
  max-width: 100%;
  margin: 0px 5px;
  }
@media ${device.mobileM} {
  max-width: 100%;
  margin: 0px 5px;
  }
@media ${device.mobileL} {
  max-width: 100%;
  margin: 0px 5px;
  }
@media ${device.tablet} {
  max-width: 90%;
  margin: 0 auto;
  }
@media ${device.laptop} {
  max-width: 90%;
  margin: 0 auto;
  }
@media ${device.laptopL} {
  max-width: 90%;
  margin: 0 auto;
  }
@media ${device.desktop} {
  margin: 0 auto;
  }

`;


const DashboardPage = props => {
  const { color } = props.theme.state;

  return (
    <ThemeProvider theme={Theme}>

      <GridWrapper>
        <Grid>
          <Charts />
          <Charts />
          <Charts />
          <Charts />
          <Charts />
          <Charts />
        </Grid>
      </GridWrapper>




    </ThemeProvider >

  );
};

const condition = authUser => !!authUser;
export default compose(withTheme, withAuthorization(condition))(DashboardPage);
