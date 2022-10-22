import { createRouter, createWebHashHistory } from 'vue-router';
import Home from './Home';
import About from './About';
import Movie from './Movie';

export default createRouter({
  // hash
  // https://google.com/#/search 꼴의 # 해쉬 를 일단 사용
  history: createWebHashHistory(),
  //pages
  // https://google.com/
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/movie',
      component: Movie,
    },
    {
      path: '/about',
      component: About,
    },
  ],
});
