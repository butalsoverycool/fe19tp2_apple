import styled from 'styled-components';

export const GridLayout = styled.div`
	display: grid;
	grid-template-columns: repeat(10, 1fr);
	grid-auto-rows: 8vw;
	/* 	//grid-template-columns: repeat(auto-fill, minmax(28em, 2fr)); */
	grid-gap: 10px;
`;