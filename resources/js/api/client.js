import axios from 'axios';
import loadProgressBar from '../utils/progress-bar';
import {getToken} from '../utils/auth';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

loadProgressBar(axios);

function client () {
  let token = getToken();
  axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : null;
  return axios;
}

export default client;
