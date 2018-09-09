import { put, call } from 'redux-saga/effects';
import axios from 'axios';
import Chatkit from '@pusher/chatkit'
import config from './config';


const chatManager = userId =>
  new Chatkit.ChatManager({
    instanceLocator: config.app.instanceLocator,
    userId,
    tokenProvider: new Chatkit.TokenProvider({
      url: `${config.base_url}authenticate`,
    }),
});

const onSuccess = (userId) => {
  window.sessionStorage.setItem('current_user', userId);
  window.location.href = './messages';
}

const onError = (error) =>{
  console.log(error);
}


const onConnect = (userId) => {
  return chatManager(userId)
  .connect()
  .then(currentUser => {
    return new Promise((resolve, reject) => {
      currentUser.joinRoom({ roomId: config.DEFAULT_ROOM_ID })
      .then(currentRoom => {
        resolve({currentUser, currentRoom});
      })
    });
    //return currentUser
  })
  .then(currentRoom => {
    //console.log("Curent room", currentRoom);
    return currentRoom;
  })
  .catch(err => {
    onError(err);
  });
}


const onJoinRoom = ({currentUser, roomId}) => {
  return currentUser.joinRoom({ roomId})
  .then(currentRoom => {
    return currentRoom;
  })
}

const onGetJoinableRooms = (currentUser) => {
  return currentUser.getJoinableRooms()
  .then(rooms => {
    return rooms;
  })
  .catch(err => {
    onError(err);
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







export function* connect({payload}) {
  try {
    const currentUser = yield call(onConnect, payload);
    yield put({ type: 'SET_CURRENT_USER', payload:currentUser});
  } catch(error) {
    onError(error);
  }
}


export function* joinRoom({payload}) {
  try {
    const currentRoom = yield call(onJoinRoom, payload);
    yield put({ type: 'SET_CURRENT_ROOM', payload:currentRoom});
  } catch(error) {
    onError(error);
  }
}

export function * getJoinableRooms({payload}) {
  try {
    const joinableRooms = yield call(onGetJoinableRooms, payload);
    yield put({ type: 'SET_JOINABLE_ROOMS', payload:joinableRooms});
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

