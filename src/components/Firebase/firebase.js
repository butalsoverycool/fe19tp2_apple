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
  user = userId => this.firestore.collection('users').doc(userId);

  organizations = () => this.firestore.collection('organization');
  organization = orgId => this.firestore.collection('organization').doc(orgId);

  createOrganization = ({ name, userId }) =>
    this.firestore.collection('organization').add({ name, users: [userId] });

  // TODO: updateOrganization

  createUser = ({ userId, email, orgId, ...rest }) =>
    this.firestore
      .collection('users')
      .doc(userId)
      .set({ email, orgId, ...rest });

  // TODO: updateUser

  // TODO: deleteUser
}

export default Firebase;
