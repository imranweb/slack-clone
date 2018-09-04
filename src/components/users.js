import React, { Component } from 'react'
import User from './user';

class Users extends Component {
  renderUsers() {
    return (
      <ul>
        {this.props.users.map((user, index) => {
          if (user.id === this.props.currentUser.id) {
            return (
              <User key={index} presenceState="online">
                {user.name} (You)
              </User>
            )
          }
          return (
            <User key={index} presenceState={user.presence.state}>
              {user.name}
            </User>
          )
        })}
      </ul>
    )
  }

  render() {
    if (this.props.users) {
      return this.renderUsers()
    } else {
      return <p>Loading...</p>
    }
  }
}



export default Users