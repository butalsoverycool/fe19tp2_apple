import React from 'react';

import Charts from '../Charts';
import { ScreenBadge } from 'react-awesome-styled-grid';
import DashBoard from '../Dashboard';

import styled, { ThemeProvider } from 'styled-components';
import { compose } from 'recompose';
import { withAuthorization } from '../Session';
import { Theme } from '../GlobalStyles';
import { withTheme } from '../Theme';
import * as Styled from './styled';

/* const Layout = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-auto-rows: 1fr;
  grid-gap: 10px;
  background-color: ${props => props.themeBg || 'none'};
`; */

/* <Styled.Grid>
      <ThemeProvider theme={Theme}>
        <Layout themeBg={color.hex}>
          <DashBoard />
        </Layout>
      </ThemeProvider>
    </Styled.Grid> */

const Wrapper = styled.div`
  width: 100vw;
  height: auto;
  margin: 0;
  padding: 0;
  display: flex;
`;

const DashboardPage = props => {
  const { color } = props.theme.state;
  return (
    <Wrapper>
      <DashBoard />
    </Wrapper>
  );
};

const condition = authUser => !!authUser;
export default compose(withTheme, withAuthorization(condition))(DashboardPage);
