import styled from 'styled-components';

export const GridLayout = styled.div`
	display: grid;
	grid-template-columns: repeat(10, 1fr);
	grid-auto-rows: 8vh;
	grid-gap: 10px;
`;
