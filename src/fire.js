import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCd0YgRs41as2VRX8lAr1JiCEq22Aed-GU",
    authDomain: "mynotes-d1e3f.firebaseapp.com",
    databaseURL: "https://mynotes-d1e3f-default-rtdb.firebaseio.com",
    projectId: "mynotes-d1e3f",
    storageBucket: "mynotes-d1e3f.appspot.com",
    messagingSenderId: "1054323081729",
    appId: "1:1054323081729:web:dbc0a1cff3ea1ac63ab600"
  };

  const fire = initializeApp(firebaseConfig);

  export default fire;