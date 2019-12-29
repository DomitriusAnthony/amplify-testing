import React from 'react';
import { Auth } from 'aws-amplify';

export default function useCurrentUser() {
  const [currentUser, setCurrentUser] = React.useState();

  React.useEffect(() => {
    const getCurrentUser = async () => {
      try {
        await Auth.currentAuthenticatedUser().then(user => setCurrentUser(user));
      } catch (e) {
        console.log(e);
      }
    }

    getCurrentUser();
  }, [])

  const user = currentUser && currentUser;

  return [user, setCurrentUser];
}