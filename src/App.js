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
        <Signup setCurrentUser={setCurrentUser} />
        <Login setCurrentUser={setCurrentUser} />
      </div>
    )
  } else {
    return (
      <div>
        <p>{user.attributes.email}</p>
        <button onClick={() => logout()}>Sign out</button>
      </div>
    )
  };
}