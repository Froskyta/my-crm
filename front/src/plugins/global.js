import state from "@/store.js";

export default {
    showNotification(title, options = 3000) {
        state.commit('index/EDIT_STATE', { name: 'statusShowNotification', data: true })
    }
}
