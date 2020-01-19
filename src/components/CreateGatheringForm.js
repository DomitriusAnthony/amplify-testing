import React from 'react';
import { gql, useMutation } from '@apollo/client';

const CREATE_GATHERING = gql`
  mutation CreateGathering($userId: ID!, $gathering: GatheringInput!) {
    createGathering(userId: $userId, gathering: $gathering) {
      title
    }
  }
`

export default function CreateGatheringForm(props) {
  console.log(props.user);
  const [gathering, setGathering] = React.useState();
  const [createGathering] = useMutation(CREATE_GATHERING);
  return (
    <form onSubmit={e => {
      e.preventDefault();

      createGathering({
        variables: {
          userId: props.user.id,
          gathering
        }
      })
    }}>
      <input type="text" name="title" onChange={(e) => setGathering({ ...gathering, title: e.target.value })} />
      <textarea onChange={(e) => setGathering({ ...gathering, description: e.target.value })} />
      <button>Create Gathering</button>
    </form>
  )
}