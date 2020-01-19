import { gql, useQuery } from '@apollo/client';

import useCognitoSession from './useCognitoSession';

const CURRENT_USER = gql`
  query GetUser($email: String!) {
    getUser(email: $email) {
      username
      email
      id
    }
  }
`

export default function useCurrentUser() {
  const [currentUser, setCurrentUser] = useCognitoSession();

  const { data, loading } = useQuery(CURRENT_USER, {
    variables: {
      email: currentUser && currentUser.attributes.email
    }
  });

  return [data, loading, setCurrentUser];
}