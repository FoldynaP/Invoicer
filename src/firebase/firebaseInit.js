import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA3Q6wpTrsO8ieVLPU--Y-1GALeTDX4OrA",
    authDomain: "invoice-app-5dae4.firebaseapp.com",
    projectId: "invoice-app-5dae4",
    storageBucket: "invoice-app-5dae4.appspot.com",
    messagingSenderId: "43008659754",
    appId: "1:43008659754:web:9e625a903fbce82d5b8e53"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  export default firebaseApp.firestore();