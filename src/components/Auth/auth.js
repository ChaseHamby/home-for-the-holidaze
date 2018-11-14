import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import './auth.scss';

const loginButton = () => {
  const domString = `
    <button id="google-auth" class="btn btn-secondary">Login</button>
  `;
  $('#auth').html(domString); // prints button to page
  $('#google-auth').on('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider(); // tells page we're using google auth
    firebase.auth().signInWithPopup(provider); // calls pop up and passes google auth through it
  });
};

export default loginButton;
