import state from "@/store.js";

export default {
    showNotification(data) {
        state.commit('index/EDIT_STATE', {name: 'statusShowNotification', data})
    },
}
