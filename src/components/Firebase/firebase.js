import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
};

// make firebase object available in console during development
if (process.env.NODE_ENV === 'development') {
  window.firebase = app;
}

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.firestore = app.firestore();
  }

  // ##########
  // Auth API
  // ##########

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();
  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  // ##########
  // Firestore API
  // ##########

  users = () => this.firestore.collection('users');
  user = userId => this.firestore.doc(`users/${userId}`);

  organizations = () => this.firestore.collection('organizations');
  organization = orgId => this.firestore.doc(`organizations/${orgId}`);

  // createUser = ({ userId, email, orgId, ...rest }) =>
  //   this.user(userId).set({ email, orgId, ...rest });

  // updateUser = ({ userId, ...rest }) =>
  //   this.user(userId).set({ ...rest }, { merge: true });

  // deleteUser = ({ userId }) => this.user(userId).delete();

  // createOrganization = ({ name, userId }) =>
  //   this.organizations().add({ name, users: [userId] });

  // updateOrganization = ({ orgId, ...rest }) =>
  //   this.organization(orgId).set({ ...rest }, { merge: true });
}

export default Firebase;
