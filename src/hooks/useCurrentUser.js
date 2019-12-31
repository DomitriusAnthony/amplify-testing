import React from 'react';
import { Auth } from 'aws-amplify';

export default function useCurrentUser() {
  const [currentUser, setCurrentUser] = React.useState();

  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const getCurrentUser = async () => {
      try {

        await Auth.currentAuthenticatedUser().then(user => {
          setLoading(false);
          return setCurrentUser(user)
        });
      } catch (e) {
        console.log(e);
      }
    }

    getCurrentUser();
  }, [])
  const user = currentUser && currentUser;

  return [user, loading, setCurrentUser];
}

/*

TODO:

- When we find the current user from AWS, we should pass it to Appsync to get the rest of that user data
- Can we use the user from this to control the render of something? (Signup / Login --> Dashboard || Logout --> NoAuthHome)
- Can we hook into the loading of the request and expose that from the hook? Can this be combined to work with the AppSync call for the user?


*/