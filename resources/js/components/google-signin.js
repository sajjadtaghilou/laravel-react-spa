import React, { useState, useEffect } from 'react';
import loadGoogleApi from '../helpers/load-google-api';
import {getIntendedUrl} from '../utils/auth';
import {useHistory} from 'react-router-dom';
import {AuthConsumer} from '../context/auth';
import {googleLogin} from '../api/auth';

function GoogleLogin () {
  let [gapi, setGapi] = useState(null);

  const handleAuthClick = onGoogleLogin => async () => {
    try {
      let res = await gapi.auth2.getAuthInstance().signIn();

      googleLogin({ id_token: res.getAuthResponse().id_token })
        .then(({ user, token }) => {
          onGoogleLogin({ user, token });
          getIntendedUrl().then(url => useHistory().push(url));
        });
    } catch (e) {
      console.log('e', e);
    }
  };

  const initGoogleGapiInstance = async () => {
    try {
      let loadGapi = await loadGoogleApi();
      setGapi(loadGapi);
      gapi.load('auth2', () => {
        gapi.auth2.init({
          client_id: window.App.google_client_id,
          fetch_basic_profile: true,
          scope: 'profile'
        });
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    initGoogleGapiInstance();
  }, []);

  return (
    <AuthConsumer>
      {
        ({onGoogleLogin}) => (
          <button type="button"
            id="g-signin-btn"
            className="w-full text-grey-darker"
            onClick={handleAuthClick(onGoogleLogin)}>
            <img width="32"
              className="align-middle mx-2 rounded-full"
              alt="Google"
              title="Google"
              src="/images/icons/google.svg" />
          </button>
        )
      }
    </AuthConsumer>
  );
}

export default GoogleLogin;
