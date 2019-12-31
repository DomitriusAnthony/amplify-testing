import React from 'react';
import { Auth } from 'aws-amplify';

export default function Login(props) {
  const [userFields, setUserFields] = React.useState({
    password: '',
    username: '',
  });

  const login = async () => {
    try {
      await Auth.signIn({ ...userFields }).then(user => props.setCurrentUser(user))
    } catch (e) {
      console.log(e);
    }
  }

  return (

    <form onSubmit={e => {
      e.preventDefault();
      login();
    }}>
      <input type="text" placeholder="Username.." onChange={e => setUserFields({ ...userFields, username: e.target.value })} />
      <input type="text" placeholder="Password.." onChange={e => setUserFields({ ...userFields, password: e.target.value })} />
      <button>Login</button>
    </form>
  )
}
