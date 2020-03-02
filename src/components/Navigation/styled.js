import styled from 'styled-components';

export const Grid = styled.div`
  grid-column-start: 1;
  grid-column-end: span 10;
  grid-row-start: 1;
  grid-row-end: 3;
`;

export const Container = styled.nav`
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 16px;
  justify-content: space-between;
  width: auto;
`;

export const UL = styled.ul``;

export const LI = styled.div`
  flex: 1;
  & > a {
    padding: 1rem;
    text-decoration: none;
  }
`;
