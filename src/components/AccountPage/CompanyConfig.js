import React from 'react';
import styled from 'styled-components';
import LogoUploader from './LogoUploader';
import Colorpicker from './Colorpicker';
import * as Styled from './styled';

const Wrapper = styled.div`
  flex: 1;
  margin: 0.5rem 0.5rem;
  display: flex;
  height: 35rem;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: ${props => props.theme.cardColor};
  box-shadow: 0 0 20px #ddd;
  border-radius: 10px;
  max-width: 360px;
  min-width: 360px;

  @media (max-width: 748px) {
    min-width: 95vw;
  }
`;

const CompanyConfig = props => {
  return (
    <>
      <Wrapper>
        <LogoUploader />
        <Colorpicker />
        <Styled.Button type="button" onClick={props.saveChanges}>
          Save Changes
        </Styled.Button>
      </Wrapper>
    </>
  );
};

export default CompanyConfig;
