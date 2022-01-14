import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCGrW_BpgreIw_qTfkm5FdDxh2XaLStzvE",
    authDomain: "meet-in-the-middle-b5bd8.firebaseapp.com",
    projectId: "meet-in-the-middle-b5bd8",
    storageBucket: "meet-in-the-middle-b5bd8.appspot.com",
    messagingSenderId: "1051422626382",
    appId: "1:1051422626382:web:76c40a1c6cc9af1442291f",
    measurementId: "G-RQDHX5M1YZ"
};

firebase.initializeApp(firebaseConfig);

export default firebase;