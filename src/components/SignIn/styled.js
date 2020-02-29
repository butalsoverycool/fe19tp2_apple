import styled, { keyframes } from 'styled-components';
import { device } from '../device';
import { Theme } from '../GlobalStyles';
import { SignUpLink } from '../SignUp';

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

export const Header = styled.h1`font-weight: lighter;`;

export const formWrapper = styled.form`background: green;`;

export const Form = styled.input`
	padding: 9px;
	font-size: 14px;
	border: none;
	margin-top: 1em;
`;

export const Submit = styled.button`background: #e8f0fe;`;

export const textWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const Wrapper = styled.div`
	height: 400px;
	display: flex;
	max-width: 300px;
	min-width: 300px;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	background: ${(props) => props.theme.cardColor};
	border-radius: 10px;
	@media ${device.mobileS} {
		max-width: none;
		min-width: none;
	}
`;
