import React from 'react';
import { Auth } from 'aws-amplify';
import useCurrentUser from '../hooks/useCurrentUser';

export default function Login() {
  const [userFields, setUserFields] = React.useState({
    password: '',
    username: '',
  });

  const [user, setCurrentUser] = useCurrentUser();

  const login = async () => {
    try {
      await Auth.signIn({ ...userFields })
    } catch (e) {
      console.log(e);
    }
  }

  return (

    <form onSubmit={e => {
      e.preventDefault();
      login().then(u => setCurrentUser(u));
      console.log(user)
    }}>
      <input type="text" placeholder="Username.." onChange={e => setUserFields({ ...userFields, username: e.target.value })} />
      <input type="text" placeholder="Password.." onChange={e => setUserFields({ ...userFields, password: e.target.value })} />
      <button>Login</button>
    </form>
  )
}
