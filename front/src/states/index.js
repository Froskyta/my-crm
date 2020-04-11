import Vue from 'vue'
// import Vuex from 'vuex'

// Vue.use(Vuex);

export default {
    namespaced: true,
    state: {
        statusShowNotification: false,
    },
    mutations: {
        EDIT_STATE(state, { name, data }){
          Vue.set(state, name, data)
        },
    },
}
