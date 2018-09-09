import React, { Component } from 'react';
import {BrowserRouter as Router,Route,}  from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import NavBar from './navbar';
import SignForm from './containers/sign-in';
import ChatView from './containers/chat-view';

const theme = createMuiTheme({
  palette: {
    type: 'light',
  },
});

class App extends Component {
  constructor() {
    super()
    this.state = {
      currentUsername: '',
      disconnect: false,
    }
    this.onUsernameSubmitted = this.onUsernameSubmitted.bind(this)
  }
  onUsernameSubmitted(data) {
    fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => {
      this.setState({
        currentUsername: data.username
      })
    })
    .catch(error => console.error('error', error))
  }

  logout() {
    window.sessionStorage.removeItem('current_user');
    this.setState({
      currentUsername: ''
    });
   // window.location.href = '/';
    this.setState({disconnect: true});
  }

  render() {
    // const view = this.state.currentUsername === '' ? <SignForm onSubmit={this.onUsernameSubmitted} />
    // : <ChatView currentUsername={this.state.currentUsername} />;
    // return (
    //   <Fragment>
    //     <NavBar />
    //     {view}
    //   </Fragment>
    // )
    const currentUsername =  window.sessionStorage.getItem('current_user') || '';


    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <Route path="/" component={() => <NavBar currentUsername={currentUsername} onLogout={this.logout.bind(this)} />} />
          <Route exact path="/" component={() => <SignForm onSubmit={this.onUsernameSubmitted} />}/>
          <Route exact path="/messages/:roomId"  render={(props) => <ChatView match={props.match} currentUserId={currentUsername} disconnect={this.state.disconnect} /> } />
          <Route exact path="/messages" component={() => <ChatView currentUserId={currentUsername}  disconnect={this.state.disconnect} /> } />
        </MuiThemeProvider>
        
      </Router>
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