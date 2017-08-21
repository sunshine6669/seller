//The Vue build version to load with the `import` command
//(runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import goods from 'components/goods/goods';
import ratings from 'components/ratings/ratings';
import seller from 'components/seller/seller';

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(VueResource);
const routes = [{
    path: '/goods',
    component: goods
},
{
    path: '/ratings',
    component: ratings
},
{
    path: '/seller',
    component: seller
},
{
    path: '/',
    component: goods
}
];
const router = new VueRouter({
    routes,
    linkActiveClass: 'btn-active'
});
/*eslint-disable no-new*/
new Vue({
    el: '#app',
    template: '<App/>',
    components: {
        App
    },
    router: router,
    data: {
        eventHub: new Vue()
    }
});
