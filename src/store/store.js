import Vue from 'vue'
import Vuex from 'vuex'
import results from "@/mock/results.json";

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        tickets: [],
        airlines: {},
        airlineCompanies: []
    },
    mutations: {
        setCards(state, [tickets]) {
            state.tickets.push(tickets)
        },
        setAirlines(state, airlines) {
            // setting array for checkbox
            const checkboxArray = Object.entries(airlines).map(([key, value], i) => {
                return {
                    value: false,
                    id: i + 2,
                    key: key,
                    text: value
                }
            })
            // adding 'all' key
            checkboxArray.unshift({id: 1, value: false, key: 'all', text: 'Все'})
            state.airlineCompanies = checkboxArray
            state.airlines = airlines
        },

    },
    getters: {
        tickets: state => state.tickets,
        airlines: state => state.airlines,
        airlineCompanies: state => state.airlineCompanies
    },
    actions: {
        // imitating fetch request via setTimeout
        async fetchCards({commit}) {
            const {flights, airlines} = await new Promise((resolve) => {
                setTimeout(() => {
                    resolve(results);
                }, 3000);
            });
            // getting needed arrays for ticket and setting them to store
            flights.forEach(item => {
                const [tickets] = item.itineraries
                commit('setCards', tickets)
            })
            commit('setAirlines', airlines)
        }
    }
});

