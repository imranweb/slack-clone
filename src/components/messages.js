import React, { Component } from 'react'
import {connect} from 'react-redux';
//import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import LinearProgress from '@material-ui/core/LinearProgress';



const LinearQuery = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <LinearProgress variant="query" />
      <br />
      <LinearProgress color="secondary" variant="query" />
    </div>
  );
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
                backgroundColor: message.sender.customData.avatar_color
              }
            }
            return (
              <ListItem key={index} dense button className={classes.listItem}>
                <Avatar className={classes.avatar} style={inLineStyles.avatar}>
                  {message.sender.name.charAt(0).toUpperCase()}
                </Avatar>
                <ListItemText primary={message.sender.name} secondary={message.text} />
              </ListItem>
            )
          }
        )}
        </List>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    messages: state.messages,
  };
}

// const mapDispatchToProps = (dispatch, ownProps) => {
//   return bindActionCreators({connectChatkit}, dispatch);
// }

export default connect(mapStateToProps, null)(withStyles(styles)(Messages));
//export default withStyles(styles)(Messages);