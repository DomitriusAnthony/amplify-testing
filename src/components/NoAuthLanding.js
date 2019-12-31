import React from 'react';
import Signup from './Signup';
import Login from './Login';

export default function NoAuthLanding(props) {
  return (
    <div>
      <Signup setCurrentUser={props.setCurrentUser} />
      <Login setCurrentUser={props.setCurrentUser} />
    </div>
  )
}