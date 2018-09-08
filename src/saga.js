import { put, call } from 'redux-saga/effects';
import axios from 'axios';
import Chatkit from '@pusher/chatkit'
import config from './config';
import { func } from 'prop-types';
//import { func } from 'prop-types';


const chatManager = userId =>
  new Chatkit.ChatManager({
    instanceLocator: config.app.instanceLocator,
    userId,
    tokenProvider: new Chatkit.TokenProvider({
      url: `${config.base_url}authenticate`,
    }),
});

const onConnect = (userId) => {
 // console.log("Connect", userId);
  let result = {};
  return chatManager(userId)
  .connect()
  .then(currentUser => {
    return new Promise((resolve, reject) => {
      currentUser.joinRoom({ roomId: config.DEFAULT_ROOM_ID })
      .then(currentRoom => {
        resolve({currentUser, currentRoom})
      })
    });
    //return currentUser
  }).
  then(currentRoom => {
    //console.log("Curent room", currentRoom);
    return currentRoom;
  })
  .catch(err => {
    onError(err);
  });
}


const onJoinChannel = (currentUser, roomId) => {
  currentUser.joinRoom({ roomId})
  .then(currentRoom => {
    return currentRoom;
  })
}


const onCreateUser = (payload) => {
  axios
    .post(`${config.base_url}create/user`, payload)
    .then(response => {
      onSuccess(payload.id);
    })
    .catch(error => {
      if (error.response.data.error === 'services/chatkit/user_already_exists') {
        onSuccess(payload.id);
      } else {
        onError(error);
      }
    });
};

const onSuccess = (userId) => {
  window.sessionStorage.setItem('current_user', userId);
  window.location.href = './messages';
}

const onError = (error) =>{
  console.log(error);
}






export function* connect({payload}) {
  try {
    const currentUser = yield call(onConnect, payload);
    yield put({ type: 'SET_CURRENT_USER_AND_ROOM', payload:currentUser});
  } catch(error) {
    onError(error);
  }
}


export function* joinRoom({payload}) {
  try {
    const currentRoom = yield call(onConnect, payload);
    yield put({ type: 'SET_CURRENT_ROOM', payload:currentRoom});
  } catch(error) {
    onError(error);
  }
}

export function* createUser({payload}) {
  try {
     yield call(onCreateUser, payload);

  } catch(error) {
    onError(error);
  }
}

