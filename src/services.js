import Chatkit from '@pusher/chatkit';
import axios from 'axios';
import config from './config';


const chatManager = (userId) => {
  return new Chatkit.ChatManager({
    instanceLocator: config.app.instanceLocator,
    userId,
    tokenProvider: new Chatkit.TokenProvider({
      url: `${config.base_url}authenticate`,
    }),
  });
};

const onError = (error) => {
  console.log(error);
};

const setCurrentUserInStorage = (userId) => {
  window.sessionStorage.setItem('current_user', userId);
};

const onSuccess = (userId) => {
  setCurrentUserInStorage(userId);
  window.location.href = './messages';
};


const getCurrentUserInStorage = () => window.sessionStorage.setItem('current_user');

const getCurrentUserAndCurrentRoom = (userId) => {
  return chatManager(userId)
    .connect()
    .then((currentUser) => {
      return new Promise((resolve) => {
        currentUser.joinRoom({ roomId: config.DEFAULT_ROOM_ID })
          .then(currentRoom => resolve({ currentUser, currentRoom }));
      });
    })
    .then(currentRoom => currentRoom)
    .catch(err => onError(err));
};


const signIn = (payload) => {
  return axios
    .post(`${config.base_url}create/user`, payload)
    .then(onSuccess(payload.id))
    .catch((error) => {
      if (error.response.data.error === 'services/chatkit/user_already_exists') {
        onSuccess(payload.id);
      } else {
        onError(error);
      }
    });
};

const signOut = () => {
  window.sessionStorage.removeItem('current_user');
};

export default {
  getCurrentUserAndCurrentRoom,
  setCurrentUserInStorage,
  getCurrentUserInStorage,
  signIn,
  signOut,
};
