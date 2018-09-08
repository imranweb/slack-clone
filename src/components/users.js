import React, { Component } from 'react'
import {connect} from 'react-redux';

import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';

import User from './user';

class Users extends Component {
  
  renderUsers() {
    let users = this.props.users.map((user, index) => {
      return (
        <User key={index} user={user} />
      )
    });
    return (
      <List component="nav"
          subheader={<ListSubheader component="div">Users</ListSubheader>}>
        {users}
      </List>
      // <Fragment>
      //   <h3>Users</h3>
      //   <hr />
      //   <ul>
      //     {this.props.users.map((user, index) => {
      //       if (user.id === this.props.currentUser.id) {
      //         return (
      //           <User key={index} presenceState="online">
      //             {user.name} (You)
      //           </User>
      //         )
      //       }
      //       return (
      //         <User key={index} presenceState={user.presence.state}>
      //           {user.name}
      //         </User>
      //       )
      //     })}
      //   </ul>
      // </Fragment>
    )
  }

  render() {
    if (this.props.users) {
      return this.renderUsers()
    } else {
      return ''//<p>Loading...</p>
    }
  }
}



const mapStateToProps = (state, ownProps) => {
  return {
    users: state.users,
  };
}

// const mapDispatchToProps = (dispatch, ownProps) => {
//   return bindActionCreators({connectChatkit}, dispatch);
// }

export default connect(mapStateToProps, null)(Users);
//export default Users