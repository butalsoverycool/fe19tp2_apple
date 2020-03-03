import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import ThemeContext, { withTheme } from './context';
import GlobalStyle from './GlobalStyle';
import { defaultLogoUrl, defaultColor } from './default';

class Theme extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logo: null,
      logoUrl: null,
      defaultLogoUrl: defaultLogoUrl,
      color: defaultColor
    };

    this.previewLogo = this.previewLogo.bind(this);
    this.previewColor = this.previewColor.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
  }

  componentDidMount() {
    this.listener = this.props.firebase.onAuthUserListener(authUser => {
      if (authUser) {
        const { color, logoUrl } = authUser.organizationData;

        console.log('in THEME color', color, 'logoUrl', logoUrl);

        if (logoUrl != null) {
          this.setState({ logoUrl: logoUrl || this.state.defaultLogo });
        }

        if (color != null) {
          this.setState({ color });
        }
      }
    });
  }

  componentWillUnmount() {
    this.listener();
  }

  // WIP - upload/preview logo
  previewLogo = e => {
    const logo = e.target.files[0];

    if (!logo) return;

    // preview logo to upload
    const reader = new FileReader();

    reader.onload = e => {
      this.setState({
        logo,
        logoUrl: e.target.result
      });
    };

    reader.readAsDataURL(logo);
  };

  previewColor = newColor => {
    this.setState({
      color: newColor
    });
  };

  saveChanges = callback => {
    this.listener = this.props.firebase.onAuthUserListener(authUser => {
      if (authUser) {
        if (this.state.logo) {
          this.props.firebase.storage
            .ref()
            .child(
              `organization-profiles/${authUser.orgId}/${this.state.logo.name}`
            )
            .put(this.state.logo)
            .then(response => response.ref.getDownloadURL())
            .then(logoUrl =>
              this.props.firebase
                .organization(authUser.orgId)
                .update({ logoUrl })
            );
        }
        this.props.firebase.organization(authUser.orgId).update({
          color: this.state.color
        });

        if (typeof callback === 'function') callback();
      }
    });
  };

  render() {
    const setters = {
      previewLogo: this.previewLogo,
      previewColor: this.previewColor,
      saveChanges: this.saveChanges
    };

    return (
      <ThemeContext.Provider
        value={{
          state: this.state,
          setters
        }}
      >
        <GlobalStyle bg={this.state.color.hex} />
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}

export default withFirebase(Theme);
export { ThemeContext, GlobalStyle, withTheme };
