const messageReducer = (currState = {currentUser: null, currentRoomId: null, currentRoom: null, messages: [], users: [], rooms: [], joinableRooms: [], }, action) => {
 // console.log("State from reducer",currState);
  switch(action.type) {
    case 'SET_CURRENT_USER': 
     // const {currentUser, currentRoom} = action.payload;
      let newState = {...currState, ...action.payload};
      //console.log("Set State=", action.payload.rooms);
      return {...currState, currentUser: action.payload, rooms: action.payload.rooms};

    case 'SET_CURRENT_ROOM_ID':
      return {...currState, currentRoomId: action.payload};

    case 'SET_CURRENT_ROOM': 
      return {...currState, currentRoom: action.payload, users: action.payload.users, messages:[]}

    case 'SET_JOINABLE_ROOMS':
      return {...currState, joinableRooms: action.payload};

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