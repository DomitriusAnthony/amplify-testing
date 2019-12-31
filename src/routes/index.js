import React from 'react';
import { Router } from '@reach/router';

import useCurrentUser from '../hooks/useCurrentUser';
import NoAuthLanding from '../components/NoAuthLanding';
import Landing from '../components/Landing';

export default function Routes() {
  const [user, loading, setCurrentUser] = useCurrentUser();

  return (
    <Router>
      {!user && (
        <NoAuthLanding path="/" setCurrentUser={setCurrentUser} />
      )}

      {user && (
        <Landing path="/" user={user} loading={loading} setCurrentUser={setCurrentUser} />
      )}
    </Router>
  )
}