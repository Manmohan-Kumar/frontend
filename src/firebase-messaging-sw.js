importScripts('https://www.gstatic.com/firebasejs/4.6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.6.1/firebase-messaging.js');
var config = {
    apiKey: "AIzaSyAhAFkZ1w_as6K0_1ZPBc7HkBT-gX66WkQ",
    authDomain: "conversations-manmohan.firebaseapp.com",
    databaseURL: "https://conversations-manmohan.firebaseio.com",
    projectId: "conversations-manmohan",
    storageBucket: "",
    messagingSenderId: "74058689148"
  };
  firebase.initializeApp(config);
const messaging = firebase.messaging();