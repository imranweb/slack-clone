const config = require('../config');

const ROOM_ID = config.DEFAULT_ROOM_ID;
const defautUsers = [
  {
    customData: { avatar_color: 'orange' },
    id: 'Imran',
    name: 'Mohd Imran',
  },

  {
    customData: { avatar_color: 'blue' },
    id: 'Admin',
    name: 'Admin',
  },
];

const currState = {
  messages: [
    {
      roomId: ROOM_ID,
      senderId: 'Imran',
      text: 'Hi',
      sender: defautUsers[0],
      presence: {
        state: 'online',
      },
    },
    {
      roomId: ROOM_ID,
      senderId: 'Admin',
      text: 'Hello',
      sender: defautUsers[1],
      presence: {
        state: 'online',
      },
    },
  ],

  users: defautUsers,

  rooms: [
    {
      id: 1434433545,
      name: 'Room 1',
      isPrivate: false,
      users: defautUsers,
    },
    {
      id: 2133123344,
      name: 'Room 2',
      isPrivate: true,
      users: defautUsers,
    },

  ],
};

module.exports = currState;
