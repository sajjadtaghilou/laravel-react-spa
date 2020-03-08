import React, { useState, useEffect} from 'react';
import {getToken, setToken} from '../utils/auth';
import {getUser} from '../api/auth';
import PropTypes from 'prop-types';

const AuthContext = React.createContext();
const AuthConsumer = AuthContext.Consumer;

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired
};

function AuthProvider ({ children }) {
  const [initializing, setInitializing] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    initAuthFromExistingToken().then((user) => {
      setInitializing(false);
      setCurrentUser(user);
      setAuthenticated(!!user);
    });
  }, []);

  const handleUserResponse = ({user, token}) => {
    setToken(token);
    setCurrentUser(user);
    setAuthenticated(true);
  };

  const onLogin = handleUserResponse;
  const onRegister = handleUserResponse;
  const onLogout = () => {
    setToken(null);
    setCurrentUser(null);
    setAuthenticated(false);
  };

  return <AuthContext.Provider value={{
    initializing,
    currentUser,
    onLogin,
    onRegister,
    onLogout,
    authenticated }
  }> { children }
  </AuthContext.Provider>;
}

export {AuthProvider, AuthConsumer};

function initAuthFromExistingToken () {
  let token = getToken();

  if (token) {
    return getUser();
  } else {
    return Promise.resolve(null);
  }
}
