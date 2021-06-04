import Vue from 'vue'
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://back-mycrm.herokuapp.com/api/',
});

instance.defaults.withCredentials = true;
// instance.defaults.headers = {'Access-Control-Allow-Origin': '*'};
// instance.defaults.xsrfHeaderName = 'X-CSRFToken';
// instance.defaults.xsrfCookieName = 'csrftoken';

export default instance;
