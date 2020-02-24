import React from 'react';
import Charts from '../Charts';
import { ScreenBadge } from 'react-awesome-styled-grid';
import styled, { ThemeProvider } from 'styled-components';
import { compose } from 'recompose';
import { withAuthorization } from '../Session';
import { Theme } from '../GlobalStyles';
import { withTheme } from '../Theme';
import * as Styled from './styled';
import device from '../device';


const Grid = styled.div`
@media ${device.mobileS} {}
@media ${device.mobileM} {}
@media ${device.mobileL} {}
@media ${device.tablet} {}
@media ${device.laptop} {}
@media ${device.laptopL} {}
@media ${device.desktop} {}

grid-column-start: 2;
grid-column-end: span 8;
`;

const DashboardPage = props => {
  const { color } = props.theme.state;

  return (

    <ThemeProvider theme={Theme}>
      <Grid themeBg={color.hex}>
        <Charts />
        <Charts />
      </Grid>
    </ThemeProvider>

  );
};

const condition = authUser => !!authUser;
export default compose(withTheme, withAuthorization(condition))(DashboardPage);
