import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import base from '../views/base/index.vue'
import experiment from '../views/experiment/index.vue'
import bd_cesium from '../views/bd_cesium/index.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
    redirect: 'bd_cesium',
    children: [{
            path: "/base",
            component: base,
            name: 'base'
        },
        {
            path: "/experiment",
            component: experiment,
            name: 'experiment'
        }, {
            path: "/bd_cesium",
            component: bd_cesium,
            name: 'bd_cesium'
        }
    ]
}]

const router = new VueRouter({
    routes,

})

export default router