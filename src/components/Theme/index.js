import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import ThemeContext, { withTheme } from './context';
import GlobalStyle from './GlobalStyle';
import { defaultLogoUrl, defaultColor } from './default';

class Theme extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
      logo: null,
      dataUrl: defaultLogoUrl,
      color: defaultColor
    };

    this.previewLogo = this.previewLogo.bind(this);
    this.previewColor = this.previewColor.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
  }

  componentDidMount() {
    // load colors from admin user in firestore...
    // get auth user
    this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    });
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
        dataUrl: e.target.result
      });
    };

    reader.readAsDataURL(logo);
  };

  previewColor = newColor => {
    this.setState({
      color: newColor
    });
  };

  // WIP - save changes to firestore
  saveChanges = () => {
    if (!this.state.logo) return;

    // save logo and color...
    // https://firebase.google.com/docs/storage/web/start
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
