import React, { Component, Fragment } from 'react';
import NavBar from './navbar';
import SignForm from './components/sign-in';
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
    const view = this.state.currentUsername === '' ? <SignForm onSubmit={this.onUsernameSubmitted} />
    : <ChatView currentUsername={this.state.currentUsername} />;
    return (
      <Fragment>
        <NavBar />
        {view}
      </Fragment>
    )
    // if(this.state.currentUsername === '') {
    //   //return <UserForm onSubmit={this.onUsernameSubmitted} />
    //   return <SignForm onSubmit={this.onUsernameSubmitted} />
    // }
    // else {
    //   return <ChatView currentUsername={this.state.currentUsername} />
    // } 
 }
 
}

export default App