import Vue from 'vue';

import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import VeeValidate from 'vee-validate';

import menuApp from './components/admin/MenuApp.vue';
import adminApp from './components/admin/AdminApp.vue';

const validateConf = {
    events: "input"
};
Vue.use(VeeValidate, validateConf);

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        rubric: 'index',
        action: 'start',
        rubrics: {
            ranked: {
                title: 'Сортировка',
                description: 'В тестах на сортировку необходимо расположить элементы по порядку'
            },
            choose: {
                title: 'Выбор ответа',
                description: 'Выбрать правильный ответ из четырех вариантов'
            },
            compare: {
                title: 'Соответствие',
                description: 'Тест на выбор соответствующих друг другу вариантов'
            }
        }
    },
    getters: {
        currentRubricInfo: state => {
            return state.rubrics[state.rubric];
        }
    },
    actions: {
        changeRubric({commit}, rubric) {
            commit('CHANGE_RUBRIC', rubric)
        },
        changeAction({commit}, action) {
            commit('CHANGE_ACTION', action)
        },
    },
    mutations: {
        CHANGE_RUBRIC(state, rubric) {
            state.rubric = rubric;
        },
        CHANGE_ACTION(state, action) {
            state.action = action;
        }
    },
    plugins: [createPersistedState()]
});

new Vue({
    el: '#menu',
    data: {},
    store,
    render(h) {
        return h(menuApp)
    }
});

new Vue({
    el: '#root',
    data: {},
    store,
    render (h) {
        return h(adminApp)
    }
})

require('./css/admin.scss');
