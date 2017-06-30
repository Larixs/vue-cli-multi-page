import Vue from 'vue';
import VueRouter from 'vue-router';
import Day from "../component/Day.vue";

Vue.use(VueRouter);

const routes =[
    { path:'/day/:date',component:Day}
];

export default new VueRouter({
   routes
});