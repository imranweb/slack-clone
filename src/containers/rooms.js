import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import AddRoom from '../components/add-room';
import {createRoom} from '../actions';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    float:'right',
  },
});

class Rooms extends React.PureComponent {  

  onRoomCreation(name) {
    this.props.currentUser.createRoom({
      name: name,
      //private: true,
     // addUserIds: [this.props.currentUser.id]
    }).then(room => {
      this.props.createRoom(room);
    })
    .catch(err => {
      console.log(`Error creating room ${err}`)
    })
  }
  
  render() {
   // console.log("Room ender");
    let items = '';
    let currentRoom = this.props.currentRoom;
    if(this.props.rooms && currentRoom) {
      items = this.props.rooms.map((room, index) => {
        let name = "# "+room.name;
        let selected = (room.id === currentRoom.id);
        let link = `/messages/${room.id}`;
        return (
          <ListItem key={index} button selected={selected} component={Link} to={link}>
            {/* <ListItemIcon>
              <InboxIcon />
            </ListItemIcon> */}
           
            <ListItemText primary={name} />
            
          </ListItem>
        )
      });
    }
    return (
      <List component="nav"
          subheader={<ListSubheader component="div">Rooms
          <AddRoom onRoomCreation={this.onRoomCreation.bind(this)} />
           
          </ListSubheader>}>
        <div>{items}</div>
      </List>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    rooms: state.rooms,
    currentRoom: state.currentRoom
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({createRoom}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Rooms));
