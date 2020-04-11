function load(folder) {
  return () => import(`@/layouts/authorization/${folder}/Page`);
}

export default [
  {
    name: 'sign_in',
    path: 'sign-in',
    component: load('sign_in'),
    meta: {
      title: 'Авторизация'
    }
  },
  {
    name: 'sign_up',
    path: 'sign-up',
    component: load('sign_up'),
    meta: {
      title: 'Регистрация'
    }
  }
]
