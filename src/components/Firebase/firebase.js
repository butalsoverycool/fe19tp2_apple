import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
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
    this.storage = app.storage();
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
  user = uid => this.firestore.doc(`users/${uid}`);

  organizations = () => this.firestore.collection('organizations');
  organization = orgId => this.firestore.doc(`organizations/${orgId}`);

  storage = () => this.storage.ref();

  addOrganizationUser = ({ uid, orgId, email, role }) => {
    this.organization(orgId).update({
      users: app.firestore.FieldValue.arrayUnion(uid)
    });

    this.user(uid).set({ orgId, email, role });
  };

  removeOrganizationUser = ({ uid, orgId }) => {
    this.organization(orgId).update({
      users: app.firestore.FieldValue.arrayRemove(uid)
    });

    this.user(uid).delete();
  };

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        // get user DB data
        this.user(authUser.uid)
          .get()
          .then(snapshot => {
            const dbUser = snapshot.data();

            // get org DB data
            this.organization(dbUser.orgId)
              .get()
              .then(snapshot => {
                const dbOrganization = snapshot.data();

                // merge user and org DB data with auth
                authUser = {
                  uid: authUser.uid,
                  email: authUser.email,
                  ...dbUser,
                  organizationData: { ...dbOrganization }
                };
                next(authUser);
              });
          });
      } else {
        fallback();
      }
    });
}

export default Firebase;
