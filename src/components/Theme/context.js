import React from 'react';

const ThemeContext = React.createContext(null);

export const withTheme = Component => props => (
  <ThemeContext.Consumer>
    {theme => <Component {...props} theme={theme} />}
  </ThemeContext.Consumer>
);

export default ThemeContext;
