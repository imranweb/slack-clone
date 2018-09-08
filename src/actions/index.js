

export const createUser = ({name, id}) =>{
  let payload = {name, id, customData: {"avatar_color": getRandomColorByUsername()}};
  return {
    type: 'CREATE_USER',
    payload,
  }
}


export const connectChatkit = (userId) => {
  return {
    type: 'CONNECT',
    payload: userId,
  }
}

export const joinRoom = (currentUser, roomId) => {
  return {
    type: 'JOIN_ROOM',
    payload: {currentUser, roomId}
  }
}

export const receiveMessage = payload => {
  return {
    type: 'RECEIVE_MESSAGE', 
    payload,
  }
}

export const createRoom = (payload) => {
  return {
    type: 'CREATE_ROOM', 
    payload,
  }
}


export const userCameOnLine = (payload) => {
  return {
    type: 'USER_CAME_ONLINE', 
    payload,
  }
}

 
const getRandomColorByUsername = () => {
  const avatarColor = [ 'red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue',  'teal', 'green',
  'light-green', 'lime', 'amber', 'orange', 'deep-orange', 'brown', 'grey', 'blue-grey' ];
  return  avatarColor[Math.floor(Math.random()*avatarColor.length)];
}

