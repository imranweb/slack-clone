import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AddRoom from '../components/add-room';
import Rooms from '../components/rooms';
import {createRoom} from '../actions';

class UserRooms extends React.PureComponent {  

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
    const addRoom = <AddRoom onRoomCreation={this.onRoomCreation.bind(this)} />;
    return <Rooms rooms={this.props.rooms} addRoom={addRoom} currentRoomId={this.props.currentRoomId} heading="Rooms" />
  }
}


const mapStateToProps = (state, ownProps) => {
  //console.log("User room state", state.rooms)
  return {
    rooms: state.rooms,
    currentUser: state.currentUser,
    currentRoomId: state.currentRoomId,
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({createRoom}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRooms);
