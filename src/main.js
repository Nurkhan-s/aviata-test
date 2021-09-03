import Vue from 'vue'
import App from './App.vue'
import {store} from "@/store/store.js";

Vue.config.productionTip = false

//filters
Vue.filter('dateSetter', function (value) {
    if (value) {
        const months = [
            'янв',
            'фев',
            'мар',
            'апр',
            'мая',
            'июн',
            'июл',
            'авг',
            'сен',
            'окт',
            'ноя',
            'дек',
        ]
        const days = [
            'вс',
            'пн',
            'вт',
            'ср',
            'чт',
            'пт',
            'сб'
        ]
        const time = new Date(value)
        const date = time.getDate()
        const month = time.getMonth()
        const day = time.getDay()
        const dayName = days[day]
        const monthName = months[month]
        return `${date} ${monthName}, ${dayName}`
    }
})

new Vue({
    render: h => h(App),
    store
}).$mount('#app')
