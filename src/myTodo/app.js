import Vue from 'vue';
import MyTodo from './MyTodo.vue';
import router from './router/router'
//import store from './store';

new Vue({
    el: '#app',
    render:h=>h(MyTodo),
    router
    //store
});