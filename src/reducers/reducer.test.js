const { createStore } = require('redux');
const Chatkit  = require('@pusher/chatkit');
const Reducers = require('.');
const should = require('chai').should();
//const deepFreeze = require('deep-freeze');
const config = require('../config');
const currState = require('./sample-data');

const chatManager = userId =>
  new Chatkit.ChatManager({
    instanceLocator: config.app.instanceLocator,
    userId,
    tokenProvider: new Chatkit.TokenProvider({
      url: `${config.base_url}authenticate`,
    }),
});


const ROOM_ID = config.DEFAULT_ROOM_ID;

const userId = 'Imran';

// const connect = (userId) => {
//   return chatManager(userId)
//   .connect()
//   .then(currentUser => {
//     return currentUser
//   })
//   .then(currentRoom => {
//     //console.log("Curent room", currentRoom);
//     return currentRoom;
//   })
//   .catch(err => {
//     onError(err);
//   });
// }



// Deep Freeze State to avoid mutation
//deepFreeze(currState);

describe('Reducers', function() {

  beforeEach(function() {
    
  });


  it('should RECEIVE_MESSAGE', function() {
    const action = {
      type:'RECEIVE_MESSAGE',
      payload: {
        roomId : ROOM_ID,
        senderId: "Admin",
        text: "Hello",
        sender : {
          customData: {avatar_color: "blue"},
          id: "Admin",
          name: "Admin"
        },
        presence: {
          state: 'online'
        }
      }
     
    }

    const store = createStore(Reducers, currState);
    store.dispatch(action);
    store.getState().should.have.property('messages').and.be.an('array').of.length(3);;
    store.getState().messages[2].should.have.property('sender').and.be.an('object')
    store.getState().messages[2].should.have.property('text').and.be.an('string');
  });

  
  it('should USER_CAME_ONLINE', function() {
    const action = {
      type:'USER_CAME_ONLINE',
      payload: {
        customData: {avatar_color: "red"},
        id: "Newuser",
        name: "New User"
      },
    }

    const store = createStore(Reducers, currState);
    store.dispatch(action);
    store.getState().should.have.property('users').and.be.an('array').of.length(3);
    store.getState().users[2].should.have.property('customData').and.be.an('object')
    store.getState().users[2].should.have.property('name').and.be.an('string');
  });

  it('should CREATE_ROOM', function() {
    const action = {
      type:'CREATE_ROOM',
      payload: {
        id:1232434445,
        name: 'Room 3',
        isPrivate: false,
        users: [
          {
            customData: {avatar_color: "red"},
            id: "Newuser",
            name: "New User"
          }
        ],
      },
    }

    const store = createStore(Reducers, currState);
    store.dispatch(action);
    store.getState().should.have.property('rooms').and.be.an('array').of.length(3);;
    store.getState().rooms[2].should.have.property('users').and.be.an('array').of.length(1);
    store.getState().rooms[2].should.have.property('isPrivate').and.be.an('boolean');
  });

});