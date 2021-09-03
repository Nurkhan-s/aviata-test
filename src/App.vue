<template>
  <div id="app">
    <div class="main-page">
      <div class="container">
        <div class="layout">
          <div class="sidebar">
            <div class="options">
              <div class="options__head">
                Опции тарифа
              </div>
              <BaseCheckbox
                  class="options__checkboxes"
                  :id="checkbox.id"
                  v-for="(checkbox) in optionCheckboxes"
                  :key="checkbox.id"
                  v-model="checkbox.value"
                  :text="checkbox.text"
                  @input="onCheckboxStateChange(checkbox.key, $event)"
              />
            </div>
            <div class="options">
              <div class="options__head">
                Авиакомпании
              </div>
              <BaseCheckbox
                  class="options__checkboxes"
                  :id="checkbox.id"
                  v-for="(checkbox) in airlineCompanies"
                  :key="checkbox.id"
                  v-model="checkbox.value"
                  :text="checkbox.text"
                  @input="onCheckboxStateChange(checkbox.key, $event)"
              />
            </div>
          </div>
          <div class="content">
            <BaseLoader v-if="isLoading"/>
            <Card class="card" v-for="(ticket, i) in cards" :key="i" :card="ticket"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Card from "@/components/Card";
// import Loader from "@/components/Loader";
import {mapGetters, mapActions} from "vuex";
import BaseLoader from "@/components/base/BaseLoader";
import BaseCheckbox from "@/components/base/BaseCheckbox";

export default {
  name: "App",
  components: {
    BaseLoader,
    Card,
    BaseCheckbox
  },
  computed: {
    ...mapGetters({
      tickets: "tickets",
      airlineCompanies: 'airlineCompanies'
    }),
  },
  data() {
    return {
      isLoading: false,
      optionCheckboxes: [
        {
          value: false,
          id: 1,
          text: 'Только прямые',
          key: 'stops'
        },
        {
          value: false,
          id: 2,
          text: 'Только с багажом',
          key: 'baggage'
        },
        {
          value: false,
          id: 3,
          text: 'Только возвратные',
          key: 'refundable'
        }
      ],
      cards: []
    }
  },
  methods: {
    ...mapActions({
      fetchCards: "fetchCards",
    }),
    onCheckboxStateChange(key, status) {
      let map = new Map()
      map.set(key, status)
      this.filterByBoolean(map, key)
      console.log(key, status)
    },
    filterByBoolean(map, key) {
      if (map.has(key)) {
        const filtered = this.cards.filter(item => {
          if (key === 'refundable') {
            return item.refundable
          }
          if (key === 'stops') {
            return item.stops === 0
          }
          if(key === 'baggage'){
            return item.segments[0].baggage_options[0].value !== 0
          }
        })
        this.cards = filtered
      } else {
        this.cards = JSON.parse(JSON.stringify(this.tickets))
      }
    }
  },
  created() {
    this.isLoading = true;
    this.fetchCards().then(() => {
      this.cards = JSON.parse(JSON.stringify(this.tickets))
      this.isLoading = false;
    });
  },
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap');

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Open Sans', sans-serif;
}

.container {
  max-width: 1140px;
  padding: 0 10px;
  margin: 0 auto;
}

.layout {
  display: grid;
  grid-template-columns: 202px 1fr;
  position: relative;

  .sidebar {
    height: auto;
    position: sticky;
    top: 0;
    max-height: 600px;
  }

}

.card + .card {
  margin-top: 12px;
}

.options {
  padding: 12px;
  background: #F5F5F5;
  border-radius: 4px;
  width: 100%;

  &__head {
    font-weight: bold;
    font-size: 14px;
    line-height: 20px;
    color: #202123;
    margin-bottom: 12px;
  }
}
</style>
