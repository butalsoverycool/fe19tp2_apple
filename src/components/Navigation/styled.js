import styled from 'styled-components';

export const Nav = styled.div`
  grid-column-start: 1;
  grid-column-end: span 10;
`;

export const Container = styled.nav`
  box-shadow: 0 4px 4px - 4px black;
  z-index: 1;
`;
export const UL = styled.ul``;

export const LI = styled.div`
  display: inline-block;
  padding: 1em;
  position: relative; 
float: right;
  & > a {
    color: black;
    /* &:hover {
      color: grey;
    } */

`;
export const NavLi = styled.div`
  display: inline-block;
  padding: 1rem;
  position: relative;
  float: right;
  & > a {
    text-decoration: none;
    color: black;
    /* &:hover {
      color: grey;
    } */

    &: before {
      content: '';
      position: absolute;
      width: 100 %;
      height: 5px;
      bottom: 3px;
      left: 0;
      background-color: ${props => props.theme.fontColorPrimary};
      visibility: hidden;
      -webkit-transform: scaleX(0);
      transform: scaleX(0);
      -webkit-transition: all 0.3s ease-in-out 0s;
      transition: all 0.3s ease-in-out 0s;
    }

    &: hover: before {
      visibility: visible;
      -webkit-transform: scaleX(1);
      transform: scaleX(1);
    }
  }
`;
