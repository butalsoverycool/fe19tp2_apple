import styled from 'styled-components';


export const Grid = styled.div`
grid-column-start: 1;
grid-column-end: span 10;
`;

export const Container = styled.nav`
z-index: 1;
`;

export const UL = styled.ul``;

export const LI = styled.div`
display: inline-block;
position: relative;
padding: 1em;

  & > a {
  text-decoration: none;
  color: black;
  

  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 4px;
    bottom: 0px;
    left: 0;
    background-color: ${ props => props.theme.fontColorPrimary};
    visibility: hidden;
    -webkit-transform: scaleX(0);
    transform: scaleX(0);
    -webkit-transition: all 0.3s ease-in-out 0s;
    transition: all 0.3s ease-in-out 0s;
  }

  &:hover:before {
    visibility: visible;
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
  }

}
`;