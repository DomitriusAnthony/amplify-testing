import React from 'react';
import { Auth } from 'aws-amplify';

export default function Landing(props) {
  const logout = async () => {
    try {
      await Auth.signOut();
      props.setCurrentUser()
    } catch (e) {
      console.error(e);
    }
  }

  if (props.loading === true) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <p>{props.user.username}</p>
      <button onClick={() => logout()}>Sign out</button>
    </div>
  )
}