import client from './client';

export const login = credentials => {
  return client().post('/api/signin', credentials).then(({ data: { data: user, meta: { token } } }) => {
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
  return client().post('/api/google/signin', credentials).then(({ data: { data: user, meta: {token} } }) => {
    return Promise.resolve({ user, token });
  }).catch(error => {
    return Promise.reject(error);
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
