import React from 'react';
import Charts from '../Charts';
import { ScreenBadge } from 'react-awesome-styled-grid';
import styled, { ThemeProvider } from 'styled-components';

import { withAuthorization } from '../Session';
import { Theme } from '../GlobalStyles';

const Layout = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-auto-rows: 1fr;
  /* 	//grid-template-columns: repeat(auto-fill, minmax(28em, 2fr)); */
  grid-gap: 10px;
`;

const HomePage = () => {
  return (
    <ThemeProvider theme={Theme}>
      <Layout>
        <Charts />
        <Charts />
        {/* 	<ScreenBadge /> */}
      </Layout>
    </ThemeProvider>
  );
};

const condition = authUser => !!authUser;
export default withAuthorization(condition)(HomePage);
