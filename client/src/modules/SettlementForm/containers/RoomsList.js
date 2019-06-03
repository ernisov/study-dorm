import React, { Component } from 'react';

class RoomsList extends Component {
  render() {
    return (
      <p>{this.props.loading ? 'loading' : this.props.rooms.length}</p>
    );
  }
}

export default RoomsList;
