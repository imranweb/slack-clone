const { createStore } = require('redux');
const Chatkit  = require('@pusher/chatkit');
const TrelloApp = require('.');
const should = require('chai').should();
//const deepFreeze = require('deep-freeze');
const config = require('../config');

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

const connect = (userId) => {
  return chatManager(userId)
  .connect()
  .then(currentUser => {
    return currentUser
  })
  .then(currentRoom => {
    //console.log("Curent room", currentRoom);
    return currentRoom;
  })
  .catch(err => {
    onError(err);
  });
}




const currState = {
  messages: [
    {
      roomId : 15620739,
      senderId: "Imran",
      text: "Hi",
      sender : {
        customData: {avatar_color: "orange"},
        id: "Imran",
        name: "Mohd Imran"
      },
      presence: {
        state: 'online'
      }
    },
    {
      roomId : 15620739,
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
  ]
}



// Deep Freeze State to avoid mutation
//deepFreeze(currState);

describe('TrelloApp2', function() {

  beforeEach(function() {
    
  });


  it('should ADD_CARD', function() {
    // const action = {
    //   type: 'ADD_CARD',
    //   payload: {
    //     listId: '111',
    //     text: 'New Card'
    //   }
    // };

    // const store = createStore(TrelloApp, currState);
    // store.dispatch(action);
    // store.getState().should.have.property('currentBoard');
    // store.getState().currentBoard.should.have.property('lists').and.be.an('array').of.length(2);
    // store.getState().currentBoard.lists[0].should.have.property('cards').and.be.an('array').of.length(3);
    // store.getState().currentBoard.lists[0].cards[2].should.have.property('id');
    // store.getState().currentBoard.lists[0].cards[2].should.have.property('text').and.equal(action.payload.text);
  });

  
  it('should validate user', function(done) {

    // return connect(userId).then(function(currentUser) {
    //   console.log(currentUser);
    //   done();
    // })
    done();
    

  });


 

  
});