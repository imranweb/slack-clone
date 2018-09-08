import React, { Component } from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = {
  ListItemText: {
    paddingLeft: '20px',
  }
}

class User extends Component {
  render() {
    // const styles = {
    //   li: {
    //     display: 'flex',
    //     alignItems: 'center',
    //     marginTop: 5,
    //     marginBottom: 5,
    //     paddingTop: 2,
    //     paddingBottom: 2,
    //   },
    //   div: {
    //     borderRadius: '50%',
    //     width: 11,
    //     height: 11,
    //     marginRight: 10,
    //   },
    // }

    return (
      <ListItem button>
        <ListItemText primary={this.props.user.name} className={this.props.user.presence.state} style={styles.ListItemText} />
      </ListItem>
      // <li style={styles.li}>
      //   <div
      //     style={{
      //       ...styles.div,
      //       backgroundColor:
      //         this.props.presenceState === 'online' ? '#539eff' : '#414756',
      //     }}
      //   />
      //   {this.props.children}
      // </li>
    )
  }
}

export default User;