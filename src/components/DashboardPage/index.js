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

const Layout = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-auto-rows: 1fr;
  /* 	//grid-template-columns: repeat(auto-fill, minmax(28em, 2fr)); */
  grid-gap: 10px;
  background-color: ${props => props.themeBg || 'none'};
`;

const DashboardPage = props => {
  const { color } = props.theme.state;

  return (
    <Styled.Grid>
      <ThemeProvider theme={Theme}>
        <Layout themeBg={color.hex}>
          {/* <Charts /> */}
          <DashBoard />
        </Layout>
      </ThemeProvider>
    </Styled.Grid>
  );
};

const condition = authUser => !!authUser;
export default compose(withTheme, withAuthorization(condition))(DashboardPage);
