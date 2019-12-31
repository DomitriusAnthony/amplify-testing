import React from 'react'
import { useMutation, gql } from '@apollo/client';
import { Auth } from 'aws-amplify';

const CREATE_USER = gql`
  mutation CreateUser($email: String! $username: String) {
    createuUser(email: $email username: $username) {
      username
      id
    } 
  }
`

export default function Signup(props) {
  const [step, setStep] = React.useState(0);

  const [createUser] = useMutation(CREATE_USER);

  const [userFields, setUserFields] = React.useState({
    email: '',
    username: '',
    password: '',
    authCode: ''
  });

  const signUp = async () => {
    const { email, username, password } = userFields;
    try {
      await Auth.signUp({ username, email, password }).then(() => createUser({ variables: { username, email } }));
    } catch (e) {
      console.log(e)
    }
  }

  const confirmAuthentication = async () => {
    const { username, authCode } = userFields;

    try {
      await Auth.confirmSignUp(username, authCode).then(user => props.setCurrentUser(user));

      console.log("User successfully signed up");

    } catch (e) {
      console.log(e);
    }
  }

  return (
    step === 0 ? (
      <form onSubmit={e => {
        e.preventDefault();
        signUp();
        setStep(1);
      }}>
        <input type="text" placeholder="Email.." onChange={e => setUserFields({ ...userFields, email: e.target.value })} />
        <input type="text" placeholder="Username.." onChange={e => setUserFields({ ...userFields, username: e.target.value })} />
        <input type="password" placeholder="Password.." onChange={e => setUserFields({ ...userFields, password: e.target.value })} />
        <button>Signup</button>
      </form>
    ) : (
        <form onSubmit={e => {
          e.preventDefault();
          confirmAuthentication();
        }}>
          <input type="text" placeholder="Username.." onChange={e => setUserFields({ ...userFields, username: e.target.value })} />
          <input type="text" placeholder="Auth Code" onChange={e => setUserFields({ ...userFields, authCode: e.target.value })} />
          <button>Signup</button>
        </form>
      )

  )
}
