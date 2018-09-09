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

  render() {
   // console.log("Room ender");
    let items = '';
    //let currentRoom = this.props.currentRoom;
    let heading = this.props.joinable ? 'Joinable Rooms' : 'Rooms';
    let AddRooms = this.props.addRoom ? this.props.addRoom : '';
    if(this.props.rooms) {
      items = this.props.rooms.map((room, index) => {
        let name = "# "+room.name;
        let selected = (room.id === this.props.currentRoomId);
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
          subheader={<ListSubheader component="div">{this.props.heading}
          {AddRooms}
          </ListSubheader>}>
        <div>{items}</div>
      </List>
    )
  }
}



export default (withStyles(styles)(Rooms));
