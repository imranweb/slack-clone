import React, { Component } from 'react'
import Chatkit from '@pusher/chatkit'
import Messages from './messages';
import SendMessage from './send-message'
import Users from './users';

class ChatView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: {},
      currentRoom: {},
      messages: []
    }

    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage(text) {
    this.state.currentUser.sendMessage({
      text,
      roomId: this.state.currentRoom.id,
    })
  }

    
  componentDidMount () {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: 'v1:us1:701636f0-be86-4c26-ae6b-525ac671c4eb',
      userId: this.props.currentUsername,
      tokenProvider: new Chatkit.TokenProvider({
        url: 'http://localhost:3001/authenticate',
      }),
    })

    chatManager
      .connect()
      .then(currentUser => {
        this.setState({ currentUser })
        return currentUser.subscribeToRoom({
          roomId:15327483,
          messageLimit: 100,
          hooks: {
            onNewMessage: message => {
              this.setState({
                messages: [...this.state.messages, message],
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
    const styles = {
      container: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      },
      chatContainer: {
        display: 'flex',
        flex: 1,
      },
      whosOnlineListContainer: {
        width: '300px',
        flex: 'none',
        padding: 20,
        backgroundColor: '#2c303b',
        color: 'white',
      },
      chatListContainer: {
        padding: 20,
        width: '85%',
        display: 'flex',
        flexDirection: 'column',
      },
    }

    return (
      <div style={styles.container}>
        <div style={styles.chatContainer}>
          <aside style={styles.whosOnlineListContainer}>
            <Users currentUser={this.state.currentUser} users={this.state.currentRoom.users} />
          </aside>
          <section style={styles.chatListContainer}>
            <Messages messages={this.state.messages} style={styles.chatList} />     
            <SendMessage onSubmit={this.sendMessage} />
          </section>
        </div>
      </div>
    )
  }
}

export default ChatView