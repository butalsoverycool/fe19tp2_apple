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
    this.unsubscribe = this.props.firebase.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.props.firebase
          .user(authUser.uid)
          .get()
          .then(snapshot => {
            const dbUser = snapshot.data();

            if (dbUser.photoURL != null) {
              const dbLogo = dbUser.photoURL;

              this.setState({ logoUrl: dbLogo || this.state.defaultLogo });
            }
            if (dbUser.settings.color != null) {
              const dbColor = dbUser.settings.color;
              this.setState({ color: dbColor });
            }
          });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe();
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
  /* get file() {
    return this.state.logo && this.state.logo.files[0];
  } */

  /* }

  } */

  //
  // WIP - save changes to firestore

  saveChanges = () => {
    alert('Saved');

    this.props.firebase.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        if (this.state.logo) {
          this.props.firebase.storage
            .ref()
            .child('user-profiles')
            .child(authUser.uid)
            .child(this.state.logo.name)
            .put(this.state.logo)
            .then(response => response.ref.getDownloadURL())
            .then(photoURL =>
              this.props.firebase.user(authUser.uid).update({ photoURL })
            );
        }
        this.props.firebase.user(authUser.uid).update({
          settings: {
            color: this.state.color
          }
        });
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
