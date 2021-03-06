import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom'
import config from '../config';
import Drawer from '../drawer';
import {
  connectChatkit, receiveMessage, joinRoom, getJoinableRooms, setCurrentRoomId, userCameOnLine,
} from '../actions';

class ChatView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersTyping: [],
    };
    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage(text) {
    this.props.currentUser.sendMessage({
      text,
      roomId: this.props.currentRoom.id,
    });
  }

  sendTypingEvent() {
    if (this.props.currentRoom.id) {
      this.props.currentUser
        .isTypingIn({ roomId: this.props.currentRoom.id })
        .catch(error => console.error('error', error));
    }
  }

  subscribe(props) {
    if (props.currentUser) {
      const roomId = +(props.match ? props.match.params.roomId : config.DEFAULT_ROOM_ID);
      if (!props.currentRoom || (roomId !== props.currentRoom.id)) {
        props.setCurrentRoomId(roomId);
        props.joinRoom(props.currentUser, roomId);
      }

      if (props.currentRoom && (!props.currentUser.roomSubscriptions[props.currentRoom.id]
        || (props.currentRoom.id !== roomId))) {
        props.currentUser.subscribeToRoom({
          roomId,
          messageLimit: 100,
          hooks: {
            onNewMessage: (message) => {
              this.props.receiveMessage(message);
            },
            onUserStartedTyping: (user) => {
              this.setState({
                usersTyping: [...this.state.usersTyping, user.name],
              });
            },
            userStoppedTyping: (user) => {
              this.setState({
                usersTyping: this.state.usersTyping.filter(
                  username => username !== user.name,
                ),
              });
            },
            onUserCameOnline: (user) => {
              if (user.id !== props.currentUser.id) {
                this.props.userCameOnLine(user);
                // this.forceUpdate();
              }
            },
            // onUserWentOffline: (user) => this.this.props.userCameOnLine(user);,
            onUserJoined: () => this.forceUpdate(),
          },
        });
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      if (this.props.currentUser && this.props.disconnect) {
        this.props.currentUser.disconnect();
      } else {
        this.subscribe(this.props);
        // if(this.props.currentUser && (!this.props.currentRoom)) {
        if (this.props.currentUser) {
          this.props.getJoinableRooms(this.props.currentUser);
        }
      }
    }
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.currentUser) {
      return {
        currentUser: nextProps.currentUser,
        currentRoom: nextProps.currentRoom,
      };
    }
    return null;
  }

  componentDidMount() {
    const userId = this.props.currentUserId;
    this.props.connectChatkit(userId);
  }

  render() {
    if (this.props.currentUserId === '') {
      window.location.href = '/';
      // return <Redirect to='/' />
    }
    return (
      <Drawer onSubmit={this.sendMessage}
        usersTyping={this.state.usersTyping}
        onChange={this.sendTypingEvent.bind(this)}
        />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    currentRoom: state.currentRoom,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    connectChatkit, receiveMessage, joinRoom, setCurrentRoomId, getJoinableRooms, userCameOnLine,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatView);
