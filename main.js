import App from './App';
import catchAndLogException from '@/utils/catchAndLogException.js';

// #ifndef VUE3
import Vue from 'vue';
import './uni.promisify.adaptor';
Vue.config.productionTip = false;
App.mpType = 'app';
const app = new Vue({
  ...App,
});
app.$mount();
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue';
import * as Pinia from 'pinia';
export function createApp() {
  const app = createSSRApp(App);
  app.use(Pinia.createPinia()).use(catchAndLogException);
  return {
    app,
    Pinia,
  };
}
// #endif
