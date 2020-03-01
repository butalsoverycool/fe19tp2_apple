/* export const createUser = functions.firestore
  .document('newUsers/{userId}')
  .onCreate(async (snap, context) => {
    const userId = context.params.userId;
    const newUser = await admin.auth().createUser({
      disabled: false,
      displayName: snap.get('displayName'),
      email: snap.get('email'),
      password: snap.get('password'),
      phoneNumber: snap.get('phoneNumber')
    });
    // You can also store the new user in another collection with extra fields
    await admin
      .firestore()
      .collection('users')
      .doc(newUser.uid)
      .set({
        uid: newUser.uid,
        email: newUser.email,
        name: newUser.displayName,
        phoneNumber: newUser.phoneNumber,
        otherfield: snap.get('otherfield'),
        anotherfield: snap.get('anotherfield')
      });
    // Delete the temp document
    return admin
      .firestore()
      .collection('newUsers')
      .doc(userId)
      .delete();
  });
 */
