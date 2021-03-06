import firebase from 'firebase/app';
import $ from 'jquery';
import 'bootstrap';
import apiKeys from '../db/apiKeys.json';
import './index.scss';
import createNavbar from './components/Navbar/navbar';
import loginButton from './components/Auth/auth';
import authHelpers from './helpers/authHelpers';
import friendsPage from './components/FriendsPage/friendsPage';
import showAddForm from './components/AddEditFriends/addEditFriends';

const initializeApp = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  createNavbar();
  authHelpers.checkLoginStatus(friendsPage);
  loginButton();
  $('#show-friend-form').on('click', showAddForm);
};

initializeApp();
