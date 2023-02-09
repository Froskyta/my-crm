import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

// Страницы layouts
import authorization from '@/layouts/authorization/routers';
import cabinet from '@/layouts/cabinet/routers';

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      name: 'authorization',
      path: '/authorization',
      component: () => import('@/layouts/authorization/Cascade'),
      children: authorization,
      redirect: { name: 'sign_in' }
    },
    {
      name: 'cabinet',
      path: '/cabinet',
      component: () => import('@/layouts/cabinet/Cascade'),
      children: cabinet,
    },
  ]
});

router.beforeEach((to, from, next) => {

    // Проверка на заходишь на главную страницу
    to.fullPath === '/' ? next({ name: 'home' }) : next();

    // Проверка на авторизованность
    if (!(document.cookie.indexOf('session=true') === 0) && to.matched[0].name !== 'authorization') next({ name: 'sign_in' });

    if (document.cookie.indexOf('session=true') === 0 && to.matched[0].name !== 'cabinet') next({ name: 'home' })

    // !(document.cookie.indexOf('session=true') === 0) && to.name !== 'sign_in' ? next({ name: 'sign_in' }) : false;
    // document.cookie.indexOf('session=true') === 0 && to.name === 'sign_in' ? next({ name: 'home' }) : false;
});

export default router
