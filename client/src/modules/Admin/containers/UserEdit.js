import React from 'react';
import UserForm from './UserForm';

export default (props) => {
  console.log(props.location.state)
  return (
    <UserForm user={props.location.state} edit />
  );
}
