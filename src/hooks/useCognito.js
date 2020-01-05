import React from 'react';
import { Auth } from 'aws-amplify';

export default function useAuthenticatedUser() {
  const [currentUser, setCurrentUser] = React.useState();

  React.useEffect(() => {
    const getCurrentUser = async () => {
      try {
        await Auth.currentAuthenticatedUser().then(user => {
          return setCurrentUser(user)
        });
      } catch (e) {
        console.log(e);
      }
    }

    getCurrentUser();

    return () => setCurrentUser();
  }, []);

  return [currentUser, setCurrentUser];
}