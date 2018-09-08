import React, { Component, Fragment } from 'react'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
//import { Redirect } from 'react-router-dom'
import Chatkit from '@pusher/chatkit'
import config from '../config';
// import Messages from './messages';
// import SendMessage from './send-message'
import Drawer from '../drawer';
import {connectChatkit, receiveMessage, userCameOnLine} from '../actions';

class ChatView extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      //currentUser: {},
     // currentRoom: {},
      //messages: [],
      usersTyping: []
    }

    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage(text) {
    this.props.currentUser.sendMessage({
      text,
      roomId: this.props.currentRoom.id,
    })
  }

  sendTypingEvent() {
    //console.log("RoomId=", this.state.currentRoom.id)
    // if(this.state.currentRoom.id) {
    //   // this.state.currentUser
    //   // .isTypingIn(this.state.currentRoom.id)
    //   // .catch(error => console.error('error', error))
    // }
  }

  subscribe(props) {
    
    if (props.currentUser && props.currentRoom) {
      //if (!this.props.currentUser.roomSubscriptions[this.props.currentRoom.id]) {
      
        props.currentUser.subscribeToRoom({
          roomId: props.currentRoom.id,
          hooks: {
            onNewMessage: message => {
              const { createdAt, senderId, text, roomId } = message;
              console.log("Message", message);
              if (senderId !== props.currentUser.id && roomId === props.currentRoom.id) {
                // this.props.receiveMessage({
                //   createdAt,
                //   senderId,
                //   text,
                // });
                
              }
            },
            onUserJoined: user => {
              
              //this.props.userJoined(user);
            },
            onUserLeft: user => {
              //this.props.userLeft(user);
            },
            onUserWentOffline: user => {
              //this.props.userLeft(user);
            },
            onUserStartedTyping: user => {
              //this.props.userStartedTyping(user);
            },
            onUserStoppedTyping: user => {
              //this.props.userStoppedTyping(user);
            },
          },
          messageLimit: 0,
        });
      //}
    }
  }


  componentWillReceiveProps(props) {

    console.log('will recieve props', props.match);
    //this.subscribe(props);
      props.currentUser.subscribeToRoom({
      roomId:props.currentRoom.id,
      messageLimit: 100,
      hooks: {
        onNewMessage: message => {
          console.log("new message", message)
          // this.setState({
          //   messages: [...this.state.messages, message],
          // })
          this.props.receiveMessage(message);
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
        onUserCameOnline: (user) =>  {
          if(user.id !== props.currentUser.id) {
            this.props.userCameOnLine(user);
            this.forceUpdate();
          } 
        },
        onUserWentOffline: () => this.forceUpdate(),
        onUserJoined: () => this.forceUpdate(),
      },
    })
  } 

  getCurrentRoomId() {
    // const {match} = this.props;
    // return match ? match.params.roomId : config.DEFAULT_ROOM_ID;
  }

  componentDidMount () {
    
   // console.log(match);
    const userId = this.props.currentUserId;

  //  console.log("Did mount", userId);
    console.log("Connect cahtkit=", this.props.connectChatkit(userId));

    //console.log("current user=", this.props.currentUser)

   

    //this.props.setCurrentRoom(config.DEFAULT_ROOM_ID);
    //this.renderMessage(userId);
   
  }

  renderMessage(userId) {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: config.app.instanceLocator,
      userId: userId,
      tokenProvider: new Chatkit.TokenProvider({
        url: 'http://localhost:3001/authenticate',
      }),
    })

    chatManager
      .connect()
      .then(currentUser => {
       // this.setState({ currentUser });
        // return currentUser.subscribeToRoom({
        //   roomId:config.DEFAULT_ROOM_ID,
        //   messageLimit: 100,
        //   hooks: {
        //     onNewMessage: message => {
        //       console.log("new message", message)
        //       this.setState({
        //         messages: [...this.state.messages, message],
        //       })
        //     },
        //     userStartedTyping: user => {
        //       this.setState({
        //         usersTyping: [...this.state.usersTyping, user.name],
        //       })
        //     },
        //     userStoppedTyping: user => {
        //       this.setState({
        //         usersTyping: this.state.usersTyping.filter(
        //           username => username !== user.name
        //         ),
        //       })
        //     },
        //     onUserCameOnline: () => this.forceUpdate(),
        //     onUserWentOffline: () => this.forceUpdate(),
        //     onUserJoined: () => this.forceUpdate(),
        //   },
        // })
      })
      .then(currentRoom => {
        console.log("Cuurent room", currentRoom);
        //this.setState({ currentRoom:this.props.currentRoom })
      })
     .catch(error => console.error('error', error))
  }

  render() {
    console.log("Render mount")
    if (this.props.currentUserId === '') {
      window.location.href = '/';
      //return <Redirect to='/' />
    }
    
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
          <Drawer   
          currentUser={this.props.currentUser}  onSubmit={this.sendMessage}
          usersTyping={this.state.usersTyping}
          onChange={this.sendTypingEvent.bind(this)}
           />
        
      </Fragment>
      
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  console.log('Starte=', state);
  return {
    currentUser: state.currentUser,
    currentRoom: state.currentRoom,
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({connectChatkit, receiveMessage, userCameOnLine}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatView);
//export default ChatView