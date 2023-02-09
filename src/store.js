import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import index from "./states";

export default new Vuex.Store({
    modules: {
        index
    }
})
