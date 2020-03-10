import React from 'react';
import { withTheme } from '../Theme';
import { TwitterPicker } from 'react-color';
import styled from 'styled-components';

const H3 = styled.h3`font-weight: lighter;`;

const ColorpickWrapper = styled.div`margin-top: 2em;`;

const Colorpicker = (props) => {
	const { color } = props.theme.state;
	const { previewColor } = props.theme.setters;

	return (
		<div className="colorContainer">
			<ColorpickWrapper>
				<H3>Your company's primary color</H3>
				<TwitterPicker
					color={color}
					onChangeComplete={previewColor}
				/>
			</ColorpickWrapper>
		</div>
	);
};

export default withTheme(Colorpicker);
