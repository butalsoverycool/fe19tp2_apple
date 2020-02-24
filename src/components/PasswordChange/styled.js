import styled from 'styled-components';
import { device } from '../device';

export const Grid = styled.div`
@media ${device.mobileS} {}
@media ${device.mobileM} {}
@media ${device.mobileL} {}
@media ${device.tablet} {}
@media ${device.laptop} {}
@media ${device.laptopL} {}
@media ${device.desktop} {}

grid-column-start: 4;
grid-column-end: 8;
`;
