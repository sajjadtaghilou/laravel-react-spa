import client from './client';

export const login = credentials => {
  return client().post('/api/login', credentials).then(({ data: { data: user, meta: { token } } }) => {
    return Promise.resolve({ user, token });
  }).catch(error => {
    return Promise.reject(error);
  });
};

export const register = credentials => {
  return client().post('/api/register', credentials
  ).then(({ data: { data: user, meta: { token } } }) => {
    return Promise.resolve({ user, token });
  }).catch(error => {
    return Promise.reject(error);
  });
};

export const googleLogin = credentials => {
  return client().post('/api/google/login', credentials).then(({ data: { data: user, meta: {token} } }) => {
    return Promise.resolve({ user, token });
  }).catch(error => {
    return Promise.reject(error);
  });
};

export const forgotPassword = ({ email }) => {
  return client().post('/api/password/email', { email })
    .then(({ data: { status } }) => {
      return Promise.resolve({ status });
    });
};

export const resetPassword = credentials => {
  return client().post('/api/password/reset', credentials)
    .then(({ data: { status } }) => {
      return Promise.resolve({status});
    });
};

export const logout = () => {
  return client().post('/api/logout');
};
export const getUser = () => {
  return client().get('/api/me')
    .then(({ data: { data } }) => Promise.resolve(data))
    .catch(() => {
      return Promise.resolve(null);
    });
};
