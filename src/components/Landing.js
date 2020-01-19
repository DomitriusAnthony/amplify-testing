import React from 'react';
import { Auth } from 'aws-amplify';
import CreateGatheringForm from './CreateGatheringForm';


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
      <CreateGatheringForm user={props.user} />
      <button onClick={() => logout()}>Sign out</button>
    </div>
  )
}