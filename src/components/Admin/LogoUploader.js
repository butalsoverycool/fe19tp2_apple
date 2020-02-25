import React, { Component } from 'react';
import styled from 'styled-components';
import { withTheme } from '../Theme';
import { render } from '@testing-library/react';

const Logo = styled.img`
  max-width: 200px;
`;

class LogoUploader extends Component {
  constructor(props) {
    super(props);
  }

  changeHandler = e => {};

  render() {
    const { logo, dataUrl } = this.props.theme.state;
    const { previewLogo } = this.props.theme.setters;

    const uploadInfo = !this.props.theme.state.logo ? (
      ''
    ) : (
      <>
        <p>Name: {this.props.theme.state.logo.name}</p>
        <p>Size: {this.props.theme.state.logo.size}</p>
        <p>Type: {this.props.theme.state.logo.type}</p>
      </>
    );

    return (
      <div className='logoContainer'>
        <p>Upload company logo</p>
        <Logo className='logoPreview' src={dataUrl} alt='your_company_logo' />
        <div>{uploadInfo}</div>
        <input type='file' onChange={previewLogo} />
      </div>
    );
  }
}

export default withTheme(LogoUploader);
