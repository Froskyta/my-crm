import Vue from 'vue'
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api/',
});

instance.defaults.withCredentials = true;
// instance.defaults.headers = {'Access-Control-Allow-Origin': '*'};
// instance.defaults.xsrfHeaderName = 'X-CSRFToken';
// instance.defaults.xsrfCookieName = 'csrftoken';

export default instance;
