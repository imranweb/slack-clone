import React, { Component } from 'react'
//import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import LinearProgress from '@material-ui/core/LinearProgress';

function LinearQuery(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <LinearProgress variant="query" />
      <br />
      <LinearProgress color="secondary" variant="query" />
    </div>
  );
}


let userAvatars = [];
const avatarColor = [ 'red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue',  'teal', 'green',
 'light-green', 'lime', 'amber', 'orange', 'deep-orange', 'brown', 'grey', 'blue-grey' ];

 
const getRandomColorByUsername = (username) =>{
  if(userAvatars[username]=== undefined) {
    userAvatars[username] = avatarColor[Math.floor(Math.random()*avatarColor.length)];
  }
  return userAvatars[username];
}

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    overflowY: 'scroll',
    height: '680px',
  },
  listItem: {

  },
  avatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: 'red',
  }
});



class Messages extends Component {
  render() {
   // console.log(userAvatars);
    // const styles = {
    //   container: {
    //     overflowY: 'scroll',
    //     flex: 1,
    //     height: '650px',
    //   },
    // }
   
    const { classes } = this.props;

    if(this.props.messages.length === 0) {
      return (
        <LinearQuery classes={classes} />
      )
    }
    return (
      <div className={classes.root}>
        <List>
          {this.props.messages.map((message, index) => {
             let inLineStyles = {
              avatar: {
                backgroundColor: getRandomColorByUsername(message.senderId),
              }
            }
            return (
              <ListItem key={index} dense button className={classes.listItem}>
                <Avatar className={classes.avatar} style={inLineStyles.avatar}>
                  {message.senderId.charAt(0).toUpperCase()}
                </Avatar>
                <ListItemText primary={message.senderId} secondary={message.text} />
              </ListItem>
            )
          }
        )}
        </List>
      </div>
    );

    
  }
}


export default withStyles(styles)(Messages);