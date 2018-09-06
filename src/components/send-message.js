import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
//import TextField from '@material-ui/core/TextField';
//import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import ContentSend from '@material-ui/icons/Send';

const styles = theme => ({
  form: {
    display: 'flex',
    marginTop:'auto',
    paddingLeft:'24px',
  },
  textField: {
    color: 'inherit',
    background: 'none',
    outline: 'none',
    border: 'none',
    flex: 1,
    fontSize: 16,
    marginLeft: 0,
  },
  sendIcon: {
    fontSize: '24px',
  }
});

class SendMessage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onSubmit(e) {
    e.preventDefault()
    this.props.onSubmit(this.state.text)
    this.setState({ text: '' })
  }

  onChange(e) {
    this.setState({ text: e.target.value })
    if (this.props.onChange) {
      this.props.onChange()
    }
  }

  render() {
    const { classes } = this.props;
    const styles = {
      container: {
        background: '#fff',
        borderTop: '1px #4C758F solid',
        marginLeft: '-24px',
        marginRight: '-24px',
        paddingTop: '20px',
        paddingBottom: '20px',
        
        // marginBottom: 20,
        // position: 'fixed',
        // bottom:30,
        //display:'flex',
       // marginTop:'auto',

      },
      form: {
     
      },
      input: {
        color: 'inherit',
        background: 'none',
        outline: 'none',
        width:'100%',
        fontSize: 14,
        border: 'none',
      },
    }
    return (
      <div style={styles.container}>
         
          <form className={classes.form} onSubmit={this.onSubmit} style={styles.form}>
            <input
              type="text"
              placeholder="Type a message here then hit ENTER"
              onChange={this.onChange}
              value={this.state.text}
              style={styles.input}
            />

           <IconButton className={classes.sendIcon}  color="primary" aria-label="Send">
            <ContentSend onClick={this.onSubmit}/>
          </IconButton>
          
           {/* <TextField
          id="message"
          className={classes.textField}
          placeholder="Type a message here then hit ENTER"
          margin="normal"
          onChange={this.onChange}
          value={this.state.text}
        /> */}
         
          </form>
        
      </div>
    )
  }
}

export default  withStyles(styles)(SendMessage);