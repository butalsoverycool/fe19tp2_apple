import React from 'react';
import Charts from '../Charts';
import styled, { ThemeProvider } from 'styled-components';
import { withAuthorization } from '../Session';
import { Theme } from '../GlobalStyles';
import * as Styled from './styled';

const HomePage = () => {
	return (
		<Styled.Grid>
			<ThemeProvider theme={Theme}>
				<Charts />
				<Charts />
			</ThemeProvider>
		</Styled.Grid>
	);
};

const condition = (authUser) => !!authUser;
export default withAuthorization(condition)(HomePage);
