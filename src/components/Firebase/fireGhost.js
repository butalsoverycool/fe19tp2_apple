import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';

import * as ROLES from '../../constants/roles';
import { withFirebase } from '../Firebase/context';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
};

const ghostApp = app.initializeApp(config, 'ghostApp');

const fireGhost = firebase => {
  const self = ghostApp;

  self.firestore = app.firestore();
  self.auth = app.auth();

  self.users = () => self.firestore.collection('users');
  self.user = uid => self.firestore.doc(`users/${uid}`);
  self.organizations = () => self.firestore.collection('organizations');
  self.organization = orgId => self.firestore.doc(`organizations/${orgId}`);

  self.create = (em, pwd, orgId) =>
    self.auth // create auth user
      .createUserWithEmailAndPassword(em, pwd)
      .then(function(newUser) {
        console.log('User ' + newUser.uid + ' created successfully!');

        // create regular user
        self.user(newUser.uid).set({ orgId, em, role: ROLES.USER });

        // update org with new user
        console.log(orgId);
        console.log(self.organization(orgId));
        /* organization(orgId).update({
          users: self.firestore.FieldValue.arrayUnion(newUser.uid)
        }); */

        firebase.addUserToOrg(orgId, newUser.uid);

        // signout created user (just in case)
        self.auth.signOut();
      });

  return self;
};

export default fireGhost;
