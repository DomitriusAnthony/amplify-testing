import React from 'react';
import { Auth } from 'aws-amplify';

export default function useCognitoSession() {
  const [currentUser, setCurrentUser] = React.useState();

  React.useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        return setCurrentUser(user)

      } catch (e) {
        console.log(e);
      }
    }

    getCurrentUser();

    return () => setCurrentUser();
  }, []);

  return [currentUser, setCurrentUser];
}