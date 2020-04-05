import Vue from 'vue'
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

console.log("instanceb", instance.defaults);

// instance.defaults.withCredentials = true;
// instance.defaults.headers = {'Access-Control-Allow-Origin': '*'};
// instance.defaults.xsrfHeaderName = 'X-CSRFToken';
// instance.defaults.xsrfCookieName = 'csrftoken';

export default instance;
