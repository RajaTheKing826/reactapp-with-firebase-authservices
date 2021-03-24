import firebase from 'firebase'
var firebaseConfig = {
    apiKey: "AIzaSyCRcBByU7t4lbZgpwAwVK-Kfi3EeoZqSq0",
    authDomain: "fir-with-react-bae6f.firebaseapp.com",
    projectId: "fir-with-react-bae6f",
    storageBucket: "fir-with-react-bae6f.appspot.com",
    messagingSenderId: "778383989217",
    appId: "1:778383989217:web:c371c343a04cfd5482daa0",
    measurementId: "G-8RKVXD929H"
  };

  const fire = firebase.initializeApp(firebaseConfig);

  export default fire
