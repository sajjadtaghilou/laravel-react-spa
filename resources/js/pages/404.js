import React from 'react';
import AuthNav from '../components/AuthNav';
import GuestNav from '../components/GuestNav';
import {AuthConsumer} from '../context/auth';

function NotFound () {
  return (
    <AuthConsumer>
      {
        ({authenticated}) => (
          <div className="flex flex-col min-h-screen">
            { authenticated ? <AuthNav /> : <GuestNav /> }
            <div className="flex flex-col flex-1 items-center">
              <h1 className="py-8">Sorry, that page isn’t here.</h1>
              <p className="text-grey-dark">
                  You didn’t do anything wrong. We may have moved the page you’re looking for somewhere else.
              </p>
            </div>
          </div>
        )
      }
    </AuthConsumer>
  );
};

export default NotFound;
