import styled from 'styled-components';
import { device } from '../device';

export const Wrapper = styled.div`
	margin: auto;
	width: 100%;
	max-width: 600px;
	background-color: ${(props) => props.themeBg || 'none'};
`;

export const UserGrid = styled.div`grid-area: 3 / 1 / auto / span 3;`;

export const CompanyGrid = styled.div`grid-area: 3 / 4 / auto / span 4;`;

export const HeaderGrid = styled.div`grid-area: 1 / 5 / span 3 / span 4;`;

export const PasswordGrid = styled.div`
	grid-area: 3 / 8 / span 9 / span 3;
`;

export const CompanyWrapper = styled.div`
	width: 100%;
	display: flex;
	border-radius: 10px;
	height: 550px;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	background: ${(props) => props.theme.cardColor};
	box-shadow: 0 0 20px #ddd;
`;

export const Button = styled.button`
	margin-top: 2em;
	height: 2rem;
	border: none;
	background: #eaeaea;
`;
