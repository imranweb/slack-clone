import React, { Component } from 'react';
import UserForm from './components/user-form';
import ChatView from './components/chat-view';

class App extends Component {
  constructor() {
    super()
    this.state = {
      currentUsername: '',
    }
    this.onUsernameSubmitted = this.onUsernameSubmitted.bind(this)
  }
  onUsernameSubmitted(username) {
    fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    })
      .then(response => {
        this.setState({
          currentUsername: username
        })
      })
      .catch(error => console.error('error', error))
  }

  render() {
    if(this.state.currentUsername === '') {
      return <UserForm onSubmit={this.onUsernameSubmitted} />
    }
    else {
      return <ChatView currentUsername={this.state.currentUsername} />
    } 
 }
 
}

export default App