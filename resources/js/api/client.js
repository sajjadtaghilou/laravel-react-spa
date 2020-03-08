import axios from 'axios';
import loadProgressBar from '../utils/progressBar';
import {getToken} from '../utils/auth';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

loadProgressBar(axios);

function client () {
  let token = getToken();
  let authorization = token ? `Bearer ${token}` : null;
  axios.defaults.headers.common['Authorization'] = authorization;
  return axios;
}

export default client;
