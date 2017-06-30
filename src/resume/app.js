import Vue from 'vue';
import Resume from './Resume.vue'
import store from './store';

new Vue({
    el: '#app',
    store,
    render: h => h(Resume)
});