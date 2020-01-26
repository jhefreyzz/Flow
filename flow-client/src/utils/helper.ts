import firebase from "firebase/app";

export const serverTimestamp = (): any => {
  return firebase.firestore.FieldValue.serverTimestamp();
};
