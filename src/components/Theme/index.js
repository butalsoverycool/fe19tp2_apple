import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import ThemeContext, { withTheme } from './context';
import GlobalStyle from './GlobalStyle';
import { defaultLogo, defaultColor } from './default';

class Theme extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
      logo: defaultLogo,
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
  previewLogo = newUrl => {
    console.log('WIP SETTING LOGO...');
  };

  previewColor = newColor => {
    this.setState({
      color: newColor
    });
  };

  // WIP - save changes to firestore
  saveChanges = () => {
    console.log('WIP SAVING CHANGES...');
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
