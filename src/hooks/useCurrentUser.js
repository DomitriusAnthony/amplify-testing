import { gql, useQuery } from '@apollo/client';

import useCognito from './useCognito';

const CURRENT_USER = gql`
  query GetUser($email: String!) {
    getUser(email: $email) {
      username
      email
    }
  }
`

export default function useCurrentUser() {
  const [currentUser, setCurrentUser] = useCognito();

  const { data, loading } = useQuery(CURRENT_USER, {
    variables: {
      email: currentUser && currentUser.attributes.email
    }
  });

  return [data, loading, setCurrentUser];
}