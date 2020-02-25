import React from 'react';
import styled from 'styled-components';
import { withTheme } from '../Theme';
import { SketchPicker } from 'react-color';

const Colorpicker = props => {
  const { color } = props.theme.state;
  const { previewColor } = props.theme.setters;

  return (
    <div className="colorContainer">
      <p>Your company's primary color</p>
      <SketchPicker color={color} onChangeComplete={previewColor} />
    </div>
  );
};

export default withTheme(Colorpicker);
