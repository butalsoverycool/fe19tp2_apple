import React, { useState } from 'react';
import Charts from '../Charts';
import { ScreenBadge } from 'react-awesome-styled-grid';
import styled, { ThemeProvider } from 'styled-components';
import { compose } from 'recompose';
import { withAuthorization } from '../Session';
import { Theme } from '../GlobalStyles';
import { withTheme } from '../Theme';
import * as Styled from './styled';

const Layout = styled.div`
  display: grid;
  // grid-template-columns: repeat(3, 3fr);
  grid-template-columns: repeat(auto-fit, minmax(350px, 4fr));
  // grid-template-columns: repeat(10, 1fr);
  //grid-auto-rows: 1fr;
  /* 	//grid-template-columns: repeat(auto-fill, minmax(28em, 2fr)); */
  grid-gap: 10px;
  background-color: ${props => props.themeBg || 'none'};
`;

const Header = styled.div`
  height: 40px;
  padding-bottom: 2rem;
  padding-top: 90px;
`;
const Title = styled.div`
  font-weight: bold;
  font-size: 24px;
  margin-left: 2rem;
`;
const P = styled.div`
  margin: 0.3rem 0 2rem 2rem;
  font-size: 14px;
`;
const DashboardPage = props => {
  const { color } = props.theme.state;

  let today = new Date();
  let date =
    today.getFullYear() + '-0' + (today.getMonth() + 1) + '-' + today.getDate();

  return (
    <Styled.Grid>
      <ThemeProvider theme={Theme}>
        <Header>
          {/* replace with auth display name */}
          <Title>SEB</Title>
          <P>{date}</P>
        </Header>
        <Layout themeBg={color.hex}>
          <Charts />
          <Charts />
          <Charts />
          <Charts />
          <Charts />
          <Charts />
        </Layout>
      </ThemeProvider>
    </Styled.Grid>
  );
};

const condition = authUser => !!authUser;
export default compose(withTheme, withAuthorization(condition))(DashboardPage);
