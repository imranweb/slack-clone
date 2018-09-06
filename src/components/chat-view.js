import React, { Component, Fragment } from 'react'
import Chatkit from '@pusher/chatkit'
import config from '../config';
// import Messages from './messages';
// import SendMessage from './send-message'
import Drawer from '../drawer';

class ChatView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: {},
      currentRoom: {},
      messages: [],
      usersTyping: []
    }

    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage(text) {
    this.state.currentUser.sendMessage({
      text,
      roomId: this.state.currentRoom.id,
    })
  }

  sendTypingEvent() {
    //console.log("RoomId=", this.state.currentRoom.id)
    if(this.state.currentRoom.id) {
      // this.state.currentUser
      // .isTypingIn(this.state.currentRoom.id)
      // .catch(error => console.error('error', error))
    }
   
  }

    
  componentDidMount () {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: config.instanceLocator,
      userId: this.props.currentUsername,
      tokenProvider: new Chatkit.TokenProvider({
        url: 'http://localhost:3001/authenticate',
      }),
    })

    chatManager
      .connect()
      .then(currentUser => {
        this.setState({ currentUser });
        return currentUser.subscribeToRoom({
          roomId:15497973,
          messageLimit: 100,
          hooks: {
            onNewMessage: message => {
              this.setState({
                messages: [...this.state.messages, message],
              })
            },
            userStartedTyping: user => {
              this.setState({
                usersTyping: [...this.state.usersTyping, user.name],
              })
            },
            userStoppedTyping: user => {
              this.setState({
                usersTyping: this.state.usersTyping.filter(
                  username => username !== user.name
                ),
              })
            },
            onUserCameOnline: () => this.forceUpdate(),
            onUserWentOffline: () => this.forceUpdate(),
            onUserJoined: () => this.forceUpdate(),
          },
        })
      })
      .then(currentRoom => {
        this.setState({ currentRoom })
      })
     .catch(error => console.error('error', error))
  }

  render() {
    // const styles = {
    //   container: {
    //     height: '100vh',
    //     display: 'flex',
    //     flexDirection: 'column',
    //   },
    //   chatContainer: {
    //     display: 'flex',
    //     flex: 1,
    //   },
    //   whosOnlineListContainer: {
    //     width: '300px',
    //     flex: 'none',
    //     padding: 20,
    //     backgroundColor: '#2c303b',
    //     color: 'white',
    //   },
    //   chatListContainer: {
    //     padding: 20,
    //     width: '85%',
    //     display: 'flex',
    //     flexDirection: 'column',
    //   },
    // }
    return (
      <Fragment>
          <Drawer messages={this.state.messages} rooms={this.state.currentUser.rooms ? this.state.currentUser.rooms : []}  
          currentUser={this.state.currentUser} users={this.state.currentRoom.users} onSubmit={this.sendMessage}
          usersTyping={this.state.usersTyping}
          onChange={this.sendTypingEvent.bind(this)}
           />
        
      </Fragment>
      
    )
  }
}

export default ChatView