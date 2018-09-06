// const Rooms = (props) => {
//   console.log(props);
//   const rooms = props.rooms.map(room => {
//     return room.name;
//   })
//   return rooms;
// }


import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { withStyles } from '@material-ui/core/styles';
import AddRoom from './add-room';

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
      addUserIds: [this.props.currentUser.id]
    }).then(room => {
      console.log(`Created room called ${room.name}`);
    })
    .catch(err => {
      console.log(`Error creating room ${err}`)
    })
  }
  
  render() {
   
    let items = '';
    if(this.props.rooms) {
      items = this.props.rooms.map((room, index) => {
        let name = "# "+room.name;
        let selected = (room.id === 15497973);
        return (
          <ListItem key={index} button selected={selected}>
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
        {items}
      </List>
    )
  }
}

export default withStyles(styles)(Rooms);;