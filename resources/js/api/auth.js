import client from './client';

export const login = credentials => {
  return client().post('/api/login', credentials)
    .then(({ data: { data: user, meta: { token } } }) => {
      return { user, token };
    });
};

export const register = credentials => {
  return client().post('/api/register', credentials
  ).then(({ data: { data: user, meta: { token } } }) => {
    return { user, token };
  });
};

export const forgotPassword = ({ email }) => {
  return client().post('/api/password/email', { email })
    .then(({ data: { status } }) => status);
};

export const resetPassword = credentials => {
  return client().post('/api/password/reset', credentials)
    .then(({ data: { status } }) => status);
};

export const logout = () => {
  return client().post('/api/logout');
};

export const getUser = () => {
  return client().get('/api/me')
    .then(({ data: { data } }) => data)
    .catch(() => null);
};
