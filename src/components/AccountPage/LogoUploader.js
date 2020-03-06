import React, { Component } from 'react';
import styled from 'styled-components';
import { withTheme } from '../Theme';

const Logo = styled.img`
  max-width: 200px;
  max-height: 200px;
`;

class LogoUploader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logo: null,
      logoUrl: null
    };
  }

  componentDidMount = () => {
    const theme = this.props.theme.state;

    this.setState({
      logo: theme.logo,
      logoUrl: theme.logoUrl,
      defaultLogoUrl: theme.defaultLogoUrl
    });
  };

  componentDidUpdate = (prevProps, prevState) => {
    const prevUrl = prevProps.theme.state.logoUrl;
    const theme = this.props.theme.state;

    if (prevUrl !== this.props.theme.state.logoUrl) {
      this.setState({
        logo: theme.logo,
        logoUrl: theme.logoUrl,
        defaultLogoUrl: theme.defaultLogoUrl
      });
    }
  };

  changeHandler = e => {};

  render() {
    const { logo, logoUrl, defaultLogoUrl } = this.state;
    const { previewLogo } = this.props.theme.setters;

    console.log('in LOGOUPLOADER logo', logo, 'logoUrl', logoUrl);

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
      <div className="logoContainer">
        <p>Upload company logo</p>
        {logoUrl ? (
          <Logo
            className="logoPreview"
            src={logoUrl}
            alt={logo ? logo.name : 'your_company_logo'}
          />
        ) : null}
        <div>{uploadInfo}</div>

        <input type="file" onChange={previewLogo} />
      </div>
    );
  }
}

export default withTheme(LogoUploader);
