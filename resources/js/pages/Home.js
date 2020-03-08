import React from 'react';
import {AuthConsumer} from '../context/auth';

function Home () {
  return (
    <AuthConsumer>
      {
        ({currentUser}) => (
          <div className="container p-2 mx-auto flex flex-col">
            <h1>Welcome back {currentUser.name}</h1>
          </div>
        )
      }
    </AuthConsumer>
  );
}

export default Home;
