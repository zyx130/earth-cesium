import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        weather: null,
        Landing: false,
        cameraState: ''
    },
    mutations: {
        set_weather(state, data) {
            state.weather = data
        },
        SET_Landing(state, data) {
            state.Landing = data
        },
        SET_camera(state, data) {
            state.cameraState = data
        }
    },
    actions: {},
    modules: {}
})