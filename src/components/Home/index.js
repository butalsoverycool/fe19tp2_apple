import React from 'react';
import Charts from '../Charts';
import VictoryChart from '../VictoryChart';
import { ScreenBadge } from 'react-awesome-styled-grid';
import styled from 'styled-components';

import { withAuthorization } from '../Session';

const Layout = styled.div`
	display: grid;
	grid-template-columns: repeat(8, 1fr);
	grid-auto-rows: 1fr;
	/* 	//grid-template-columns: repeat(auto-fill, minmax(28em, 2fr)); */
	grid-gap: 10px;
`;

const HomePage = () => {
	return (
		<div>
			<h1>Home</h1>
			<Layout>
				<Charts />
				{/* 	<ScreenBadge /> */}
			</Layout>
		</div>
	);
};

const condition = (authUser) => !!authUser;
export default withAuthorization(condition)(HomePage);
