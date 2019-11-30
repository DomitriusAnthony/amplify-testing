import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';

const GET_USERS = gql`
  query {
    getUsers {
      username
    }
  }
`

export default function App() {
  const { data, loading } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;

  data && console.log("The data: ", data)

  return (
    <div>
      <p>Hello world!</p>
    </div>
  )
}