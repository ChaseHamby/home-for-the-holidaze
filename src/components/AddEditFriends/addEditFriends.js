import $ from 'jquery';
import authHelpers from '../../helpers/authHelpers';
import friendsData from '../../helpers/data/friendsData';
import initializeFriendsPage from '../FriendsPage/friendsPage';

const formBuilder = (friend) => {
  const form = `
  <div class="form-group">
    <label for="form-friend-name">Name: </label>
    <input type="text" class="form-control" value="${friend.name}" id="form-friend-name" placeholder="John Smith">
  </div>
  <div class="form-group">
    <label for="form-friend-address">Address: </label>
    <input type="text" class="form-control" value="${friend.address}" id="form-friend-address" placeholder="123 Blvd">
  </div>
  <div class="form-group">
    <label for="form-friend-email">Email: </label>
    <input type="text" class="form-control" value="${friend.email}" id="form-friend-email" placeholder="johnny@schittscreek.com">
  </div>
  <div class="form-group">
    <label for="form-friend-phone">Phone Number: </label>
    <input type="text" class="form-control" value="${friend.phoneNumber}" id="form-friend-phone" placeholder="888-888-8888">
  </div>
  <div class="form-group">
    <label for="form-friend-relationship">Relationship: </label>
    <input type="text" class="form-control" value="${friend.relationship}" id="form-friend-relationship" placeholder="3rd Cousin">
  </div>
  `;
  return form;
};

const gettingFriendFromForm = () => {
  const friend = {
    name: $('#form-friend-name').val(),
    address: $('#form-friend-address').val(),
    email: $('#form-friend-email').val(),
    phoneNumber: $('#form-friend-phone').val(),
    relationship: $('#form-friend-relationship').val(),
    isAvoiding: false,
    uid: authHelpers.getCurrentUid(),
  };
  return friend;
};

const buildAddForm = () => {
  const emptyFriend = {
    name: '',
    address: '',
    email: '',
    phoneNumber: '',
    relationship: '',
  };
  let domString = '<h2>Add New Friend</h2>';
  domString += formBuilder(emptyFriend);
  domString += '<button id="add-friend">Save New Friend</button>';
  $('#add-edit-friend').html(domString).show();
  $('#friends').hide();
};

const plusNewFriend = () => {
  const newFriend = gettingFriendFromForm();
  friendsData.addNewFriend(newFriend)
    .then(() => {
      $('#add-edit-friend').html('').hide();
      $('#friends').show();
      initializeFriendsPage(); // always need to call the database like this
    })
    .catch((error) => {
      console.error('error', error);
    });
};

// Edit
const showEditForm = (e) => {
  const idToEdit = e.target.dataset.editId;
  friendsData.getSingleFriend(idToEdit)
    .then((singleFriend) => {
      let domString = '<h2>Edit Friend</h2>';
      domString += formBuilder(singleFriend);
      domString += `<button id="edit-friend" data-single-edit-id=${singleFriend.id}>Save Friend</button>`;
      $('#add-edit-friend').html(domString).show();
      $('#friends').hide();
    })
    .catch((error) => {
      console.error('error in getting single friend', error);
    });
};

const updateFriend = (e) => {
  const updatedFriend = gettingFriendFromForm();
  const friendId = e.target.dataset.singleEditId;
  friendsData.updateFriend(updatedFriend, friendId)
    .then(() => {
      $('#add-edit-friend').html('').hide();
      $('#single-container').html('');
      $('#friends').show();
      initializeFriendsPage(); // always need to call the database like this
    })
    .catch((error) => {
      console.error('error', error);
    });
};

$('body').on('click', '#add-friend', plusNewFriend); // Adds friend
$('body').on('click', '.edit-btn', showEditForm); // Shows Edit form
$('body').on('click', '#edit-friend', updateFriend); // Saves Edit

export default buildAddForm;
