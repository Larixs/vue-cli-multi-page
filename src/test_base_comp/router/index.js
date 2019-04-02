/**
 * Created by lai on 2018/4/19.
 */
import Index from "../views/index.vue"
import Page from "../views/page.vue"
import VueRouter from 'vue-router';
import Vue from 'vue';

Vue.use(VueRouter);

const router = {
  routes: [
    { path: '/', component: Index, },
    { path: '/page/:comp', component: Page },
  ]
}
export default new VueRouter(router);