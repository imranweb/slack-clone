import React from 'react';
import { connect } from 'react-redux';
// import {bindActionCreators} from 'redux';
import Rooms from '../components/rooms';

class JoinableRooms extends React.PureComponent {
  render() {
    return <Rooms rooms={this.props.joinableRooms} currentRoomId={this.props.currentRoomId} heading="Joinable Rooms" />;
  }
}


const mapStateToProps = (state) => {
  return {
    joinableRooms: state.joinableRooms,
    currentUser: state.currentUser,
    currentRoomId: state.currentRoomId,
  };
};

// const mapDispatchToProps = (dispatch, ownProps) => {
//   return bindActionCreators({createRoom}, dispatch);
// }

export default connect(mapStateToProps, null)(JoinableRooms);
