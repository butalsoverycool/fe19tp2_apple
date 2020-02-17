import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './components/App';
import Firebase, { FirebaseContext } from './components/Firebase';
import Theme, { ThemeContext } from './components/Theme';

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <Theme>
      <App />
    </Theme>
  </FirebaseContext.Provider>,
  document.getElementById('root')
);
serviceWorker.unregister();
