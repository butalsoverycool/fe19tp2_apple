import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
`;

export const ToggleBtn = styled.button`
  with: 3rem;
  position: relative;
  left: ${props => (props.isOpen ? '9rem' : '10rem')};

  border: none;
  ${props => props.radius && 'border-radius: ' + props.radius};

  outline: none;
  box-shadow: 0 0 10px #ddd;
  height: 2.5rem;

  cursor: pointer;
`;

export const List = styled.div`
  left: ${props => (props.isOpen ? '10rem' : '0')};
  position: relative;
  display: flex;
  flex-direction: column;
  width: 15rem;
  max-height: ${props => (props.isOpen ? '10rem' : '0')};
  min-height: ${props => (props.isOpen ? '6rem' : '0')};
  overflow-y: scroll;
  background: #fff;

  border-radius: 0 10px 10px 0;
  ${props => props.isOpen && 'box-shadow: 5px 0 30px #ddd'};
`;

export const Item = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.2rem 0.5rem;
`;

export const Label = styled.p`
  flex: 1;
  line-height: 100%;
  height: 100%;
  font-size: 0.8rem;
  ${props => props.fat && 'font-weight: 700'};
  ${props => props.align && 'text-align: ' + props.align};
`;

export const Btn = styled.button`
  border: none;
  outline: none;
  box-shadow: 0 0 5px #ddd;
  background: none;
  cursor: pointer;
  height: 1.5rem;
  line-height: 100%;
  ${props => props.pos && 'position: ' + props.pos.type};
  ${props => props.pos && props.pos.x};
  ${props => props.pos && props.pos.y};

  margin: ${props => props.margin || 'auto'};
  flex: ${props => props.flex || ''};
  text-align: ${props => props.align || 'left'};
  font-weight: ${props => props.weight || 'normal'};

  & > * {
    ${props => props.childLineHeight && props.childLineHeight};
  }
`;

export const RestoreChartBtn = styled.button`
  border: none;
  outline: none;
  box-shadow: 0 0 5px #ddd;
  background: none;
  cursor: pointer;
  height: 1.5rem;
`;
