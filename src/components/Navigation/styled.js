import styled from 'styled-components';

export const Grid = styled.div`
grid-column-start: 1;
grid-column-end: span 10;
grid-row-start: 1; 
grid-row-end: 3;
`;

export const Container = styled.nav`
width: 100%;
`;

export const UL = styled.ul``;

export const LI = styled.div`
display: inline-block;
padding: 1em;

  & > a {
  text-decoration: none;
  color: black;
  }
`;