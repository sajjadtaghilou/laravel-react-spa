import React, { useState, useEffect } from 'react';
import loadGoogleApi from '../utils/load-google-api';
import {getIntendedUrl} from '../utils/auth';
import {useHistory} from 'react-router-dom';
import {googleLogin} from '../api/auth';
import { useAuth } from '../context/auth';

function GoogleLogin () {
  let [gapi, setGapi] = useState(null);
  let history = useHistory();
  let {setCurrentUser, setToken} = useAuth();

  const handleAuthClick = async () => {
    try {
      let res = await gapi.auth2.getAuthInstance().signIn();

      googleLogin({ id_token: res.getAuthResponse().id_token })
        .then(({ user, token }) => {
          setCurrentUser(user);
          setToken(token);
          history.push(getIntendedUrl());
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
    <button type="button"
      id="g-signin-btn"
      className="w-full text-grey-darker"
      onClick={handleAuthClick}>
      <img width="32"
        className="align-middle mx-2 rounded-full"
        alt="Google"
        title="Google"
        src="/images/icons/google.svg" />
    </button>
  );
}

export default GoogleLogin;
