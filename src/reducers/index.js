const messageReducer = (currState = {currentUser: {}, currentRoom: null, messages: [], users: [], rooms: [], joinableRooms: [], }, action) => {
 // console.log("State from reducer",currState);
  switch(action.type) {
    case 'SET_CURRENT_USER_AND_ROOM': 
      const {currentUser, currentRoom} = action.payload;
      let newState = {...currState, ...action.payload};
      return {...newState, rooms: currentUser.rooms, users: currentRoom.users};

    case 'RECEIVE_MESSAGE':
      return {...currState, messages: [...currState.messages, action.payload]};
    
    case 'CREATE_ROOM':
      return {...currState, rooms: [...currState.rooms, action.payload]};
    
    case 'USER_CAME_ONLINE': 
      return {...currState, users: [...currState.users, action.payload]};

    default:
      return currState;
  }
}



module.exports = messageReducer;