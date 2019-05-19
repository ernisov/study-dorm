import React from 'react';
import AnnouncementForm from './AnnouncementForm';

export default (props) => {
  console.log(props.location.state)
  return (
    <AnnouncementForm user={props.location.state} edit />
  );
}
