import React, { useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {getToken, setToken} from '../utils/auth';
import {getUser} from '../api/auth';

const AuthContext = React.createContext();
const AuthConsumer = AuthContext.Consumer;

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired
};

function AuthProvider ({ children }) {
  const [initializing, setInitializing] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  const initAuth = () => {
    return getToken()
      ? getUser()
      : Promise.resolve(null);
  };

  const handleUserResponse = ({user, token}) => {
    setToken(token);
    setCurrentUser(user);
    setAuthenticated(!!user);
  };

  const onLogin = handleUserResponse;
  const onRegister = handleUserResponse;
  const onLogout = () => handleUserResponse({user: null, token: null});

  useEffect(() => {
    initAuth().then((user) => {
      setInitializing(false);
      setCurrentUser(user);
      setAuthenticated(!!user);
    });
  }, []);

  return (
    <AuthContext.Provider value={{
      initializing,
      currentUser,
      onLogin,
      onRegister,
      onLogout,
      authenticated }
    }> { children }
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthConsumer };
