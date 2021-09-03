import Vue from 'vue'
import App from './App.vue'
import {store} from "@/store/store.js";
import vClickOutside from 'v-click-outside'

Vue.use(vClickOutside)
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
Vue.filter('countTime', function (time){
    const minutes = Math.floor((time / 60) % 60)
    const hours = Math.floor((time / (60 * 60) % 24))
    return `${hours} ч ${minutes} м`
})

new Vue({
    render: h => h(App),
    store
}).$mount('#app')
