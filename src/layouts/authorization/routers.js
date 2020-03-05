function load(folder) {
  return () => import(`@/layouts/authorization/${folder}/Page`);
}

export default [
  {
    name: 'sign_in',
    path: 'sign-in',
    component: load('sign_in')
  }
]
