import React from 'react';
import { withTheme } from '../Theme';
import { TwitterPicker } from 'react-color';
import styled from 'styled-components';

const H2 = styled.h2`
font-weight: lighter
`;

const Colorpicker = props => {
  const { color } = props.theme.state;
  const { previewColor } = props.theme.setters;

  return (
    <div className="colorContainer">
      <H2>Your company's primary color</H2>
      <TwitterPicker color={color} onChangeComplete={previewColor} />
    </div>
  );
};

export default withTheme(Colorpicker);
