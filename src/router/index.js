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
    },
    {
      name: 'cabinet',
      path: '/cabinet',
      component: () => import('@/layouts/cabinet/Cascade'),
      children: cabinet,
    },
  ]
});

export default router
