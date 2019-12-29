import React from 'react';
import { Auth } from 'aws-amplify';
import Signup from './components/Signup';
import Login from './components/Login';
import useCurrentUser from './hooks/useCurrentUser';

export default function App() {
  const [user, setCurrentUser] = useCurrentUser();

  const logout = async () => {
    try {
      await Auth.signOut();
      setCurrentUser()
    } catch (e) {
      console.error(e);
    }
  }

  if (!user) {
    return (
      <div>
        <Signup />
        <Login />
      </div>
    )
  }

  return (
    <div>
      <p>{console.log(user.attributes.email)}</p>
      <button onClick={() => logout()}>Sign out</button>
    </div>
  )
}