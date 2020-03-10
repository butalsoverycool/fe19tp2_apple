import React, { Component } from 'react';
import styled from 'styled-components';
import { withTheme } from '../Theme';

const Logo = styled.img`
  max-width: 120px;
  max-height: 120px;
`;

const H2 = styled.h2`
font-weight: lighter;
margin-bottom: 2em;
`;

const FileInput = styled.input`
margin-left: 7em;
margin-top: 3em;
`;

const Logotext = styled.p`
margin: 0;
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

  changeHandler = e => { };

  render() {
    const { logo, logoUrl } = this.state;
    const { previewLogo } = this.props.theme.setters;

    //console.log('in LOGOUPLOADER logo', logo, 'logoUrl', logoUrl);

    const uploadInfo = !this.props.theme.state.logo ? (
      ''
    ) : (
        <>
          <Logotext>Name: {this.props.theme.state.logo.name}</Logotext>
          {/* <p>Size: {this.props.theme.state.logo.size}</p>
          <p>Type: {this.props.theme.state.logo.type}</p> */}
        </>
      );

    return (
      <div className="logoContainer">
        <H2>Upload company logo</H2>
        {logoUrl ? (
          <Logo
            className="logoPreview"
            src={logoUrl}
            alt={logo ? logo.name : 'your_company_logo'}
          />
        ) : null}
        <div>{uploadInfo}</div>

        <FileInput type="file" onChange={previewLogo} />
      </div>
    );
  }
}

export default withTheme(LogoUploader);
