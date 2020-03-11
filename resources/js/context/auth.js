import React, { useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {getToken, setToken} from '../utils/auth';
import {getUser} from '../api/auth';

const AuthContext = React.createContext();

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
      console.log('user', user);
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

function useAuth () {
  const context = React.useContext(AuthContext);

  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }

  return context;
}

export { AuthProvider, useAuth };
