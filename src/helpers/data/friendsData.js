import axios from 'axios';
import apiKeys from '../../../db/apiKeys.json';

// All CRUD stuff for friends goes here //

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllFriends = (uid) => {
  console.log(uid);
};

const getSingleFriend = friendId => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/friends/${friendId}.json`)
    .then((result) => {
      const singleFriend = result.data;
      singleFriend.id = friendId;
      resolve(singleFriend);
    })
    .catch((error) => {
      reject(error);
    });
});

const deleteFriend = (friendId) => {
  console.log(friendId);
};

export default { getAllFriends, getSingleFriend, deleteFriend };
