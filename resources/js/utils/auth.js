const authToken = 'auth_token';
const INTENDED_URL = 'intended_url';
const DEFAULT_INTENDED_URL = '/home';

export const getToken = () => {
  window.localStorage.getItem(authToken);
};

export const setToken = token => {
  window.localStorage.setItem(authToken, token);
};

export const getIntendedUrl = () => {
  let intendedUrl = window.localStorage.getItem(INTENDED_URL) || DEFAULT_INTENDED_URL;
  return Promise.resolve(intendedUrl);
};

export const setIntendedUrl = url => {
  window.localStorage.setItem(INTENDED_URL, url);
};
