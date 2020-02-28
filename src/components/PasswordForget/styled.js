import styled from 'styled-components';
import { device } from '../device';
import { Link } from 'react-router-dom';

export const Grid = styled.div`
	@media ${device.mobileS} {
		grid-column-start: 2;
		grid-column-end: 10;
		grid-row-start: 2;
		grid-row-end: 8;
	}
	@media ${device.mobileM} {
		grid-column-start: 2;
		grid-column-end: 10;
		grid-row-start: 2;
		grid-row-end: 8;
	}
	@media ${device.mobileL} {
		grid-column-start: 5;
		grid-column-end: 7;
		grid-row-start: 2;
		grid-row-end: 8;
	}
	@media ${device.tablet} {
		grid-column-start: 5;
		grid-column-end: 7;
		grid-row-start: 2;
		grid-row-end: 8;
	}
	@media ${device.laptop} {
		grid-column-start: 5;
		grid-column-end: 7;
		grid-row-start: 2;
		grid-row-end: 8;
	}
	@media ${device.laptopL} {
		grid-column-start: 5;
		grid-column-end: 7;
		grid-row-start: 3;
		grid-row-end: 8;
	}
	@media ${device.desktop} {
		grid-column-start: 5;
		grid-column-end: 7;
		grid-row-start: 3;
		grid-row-end: 8;
	}
`;

export const ForgotLink = styled(Link)`text-decoration: none;
color: black;
&:hover {
	color: white;
};`;

export const Header = styled.h2`font-weight: lighter;`;

export const Submit = styled.button`background: #e8f0fe;`;

export const Form = styled.input`
	padding: 9px;
	font-size: 14px;
	border: none;
	/* margin-top: 7em; */
`;

export const Wrapper = styled.div`
	height: 400px;
	max-width: 300px;
	min-width: 300px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background: ${(props) => props.theme.cardColor};
	border-radius: 10px;
	@media ${device.mobileS} {
		max-width: none;
		min-width: none;
	}
`;
