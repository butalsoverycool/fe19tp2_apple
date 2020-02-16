import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './components/App';
import Firebase, { FirebaseContext } from './components/Firebase';
import { ApolloProvider } from '@apollo/react-hooks';
import client from '../src/components/client/';

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </FirebaseContext.Provider>,
  document.getElementById('root')
);
serviceWorker.unregister();
