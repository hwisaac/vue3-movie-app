import { createApp } from "vue";
import App from "./App.vue";
import router from "./routes"; // routes 폴더의 index.js 찾아오기
import store from "./store"; //store 폴더의 index.js 찾아오기
import loadImage from "./plugins/loadImage"; //store 폴더의 index.js 찾아오기

createApp(App)
  .use(router) // 라우터 연결 $route, $router
  .use(store) // $store
  .use(loadImage) //$loadImage
  .mount("#app");
