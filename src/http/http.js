import axios from 'axios';
import store from '@/store/store';
import router from '@/router';

let config = {
  headers: {},
  timeout: 30000, // globalny timeout zeby polepszyc UI experience,
};

let httpAxios = axios.create(config);

let beforeRequest = async config => {
  let token = null;
  if (localStorage.getItem('userChat')) {
    token = JSON.parse(localStorage.getItem('userChat')).token;
  }
  config.baseURL = 'http://localhost:3000/api/';
  config.headers.token = token;
  return config;
};
httpAxios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response && error.response.status == 401) {
      localStorage.removeItem('userChat');
      store.commit('user/logOutUser');
      router.push({name: 'Login'});
    }
    return Promise.reject(error);
  }
);

httpAxios.interceptors.request.use(beforeRequest);
export default httpAxios;
