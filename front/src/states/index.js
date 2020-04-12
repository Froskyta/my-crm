import Vue from 'vue'
import axios from "@/axios";
import global from "@/plugins/global";


axios.interceptors.request.use(config => config, error => error);

axios.interceptors.response.use(response => response.data, ({ message, response: { status, config: { url }, data } }) => {
    // Если превышено время ожидания
    if (message.match('timeout')) global.showNotification('У вас слишком медленный интернет. Обновите страницу для продолжения');

    // Если нету интернета, но приложение загружено
    if (message.match('Network')) global.showNotification('Нет доступа к интернету. Пожалуйста проверьте доступ');

    if (status === 400) {
        // Клиентские ошибки
        global.showNotification(String(data.errors.toString()).replace(',',', '));
        throw data;
    } else {
        // Обработка необычных ошибок
        global.showNotification(data.message);
        // global[status]();
        throw false;
    }
});


export default {
    namespaced: true,
    state: {
        statusShowNotification: '',
    },
    mutations: {
        EDIT_STATE(state, { name, data }){
          Vue.set(state, name, data)
        },
    },
}
