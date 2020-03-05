function load(folder) {
  return () => import(`@/layouts/cabinet/${folder}/Page`);
}

export default [
  {
    name: 'home',
    path: 'home',
    component: load('home')
  }
]
