import firebase from "firebase/app";
import "firebase/firestore"
import "firebase/auth"

const config = {
    apiKey: "AIzaSyCYFN4vlIkcVFfv9S7fdRryhz6Roe5Q4bE",
    authDomain: "cryptotracker-25e7b.firebaseapp.com",
    databaseURL: "https://cryptotracker-25e7b.firebaseio.com",
    projectId: "cryptotracker-25e7b",
    storageBucket: "cryptotracker-25e7b.appspot.com",
    messagingSenderId: "414866496543",
    appId: "1:414866496543:web:033de057444bbf59"
};

firebase.initializeApp(config);

export default firebase;