import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./Home";
import About from "./About";
import Movie from "./Movie";
import NotFound from "./NotFound";

export default createRouter({
  // hash
  // https://google.com/#/search 꼴의 # 해쉬 를 일단 사용
  history: createWebHashHistory(),
  scrollBehavior() {
    return { top: 0 };
  },
  //pages
  // https://google.com/
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/movie/:id",
      component: Movie,
    },
    {
      path: "/about",
      component: About,
    },
    {
      path: "/:notFound(.*)",
      component: NotFound,
    },
  ],
});
