import React from 'react';
import DashBoard from '../Dashboard';
import styled from 'styled-components';
import { compose } from 'recompose';
import { withAuthorization } from '../Session';

const Wrapper = styled.div`
  /* width: 100vw;
  height: auto;
  margin: 0;
  padding: 0;
  display: flex; */

  display: grid;
  // grid-template-columns: repeat(auto-fit, minmax(350px, 4fr));
  grid-gap: 10px;
  background-color: ${props => props.themeBg || 'none'};
`;
const Header = styled.div`
  height: 40px;
  width: auto;
  position: absolute;
  width: 100%;
`;
const Title = styled.div`
  font-weight: bold;
  font-size: 24px;
  margin-left: 2rem;
`;
const P = styled.div`
  margin: 0.3rem 1rem 0 1rem;
  font-size: 14px;
  float: right;
  color: #aaaaaa;
`;

let today = new Date();
let date =
  today.getFullYear() + '-0' + (today.getMonth() + 1) + '-' + today.getDate();

const DashboardPage = props => {
  return (
    <Wrapper>
      {' '}
      <Header>
        {/* replace with auth display name */}
        <Title></Title>
        <P>{date}</P>
      </Header>
      <DashBoard />
    </Wrapper>
  );
};

/* const Grid = styled.div`
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
}; */

const condition = authUser => !!authUser;
export default compose(withAuthorization(condition))(DashboardPage);
