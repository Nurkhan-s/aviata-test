<template>
  <div id="app">
    <div class="main-page">
      <div class="container">
        <div class="layout">
          <div class="sidebar">
            <div class="options">
              <div class="options__head">
                <span> Опции тарифа</span>
                <template v-if="optionsMap.size > 0">
                  <BaseIcon
                      @mouseover.native="showOptionFilterIcon = true"
                      v-if="!showOptionFilterIcon"
                      class="ic-size-20">filterIcon
                  </BaseIcon>
                  <BaseIcon
                      @mouseout.native="showOptionFilterIcon = false"
                      v-else
                      class="ic-size-20"
                      @click.native="clearOptions"
                  >filterIconHover
                  </BaseIcon>
                </template>
              </div>
              <BaseCheckbox
                  class="options__checkboxes"
                  :id="checkbox.id"
                  v-for="(checkbox) in optionCheckboxes"
                  :key="checkbox.id"
                  v-model="checkbox.value"
                  :text="checkbox.text"
                  @input="filterOptions(checkbox.key, $event)"
              />
            </div>
            <div class="options" v-if="airlineCompanies.length">
              <div class="options__head">
                <span>Авиакомпании</span>
                <template v-if="airlineMap.size > 0">
                  <BaseIcon
                      @mouseover.native="showCompanyFilterIcon = true"
                      v-if="!showCompanyFilterIcon"
                      class="ic-size-20">filterIcon
                  </BaseIcon>
                  <BaseIcon @mouseout.native="showCompanyFilterIcon = false"
                            v-else
                            class="ic-size-20"
                            @click.native="filterAirline('all', false)"
                  >filterIconHover
                  </BaseIcon>
                </template>

              </div>
              <BaseCheckbox
                  class="options__checkboxes"
                  :id="checkbox.id"
                  v-for="(checkbox) in airlineCompanies"
                  :key="checkbox.id"
                  v-model="checkbox.value"
                  :text="checkbox.text"
                  @input="filterAirline(checkbox.key, $event)"
              />
            </div>
          </div>
          <div class="content">
            <BaseLoader v-if="isLoading"/>
            <Card class="card" v-for="(ticket, i) in getFilteredOptions" :key="i" :card="ticket"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Card from "@/components/Card";
import BaseIcon from "@/components/base/BaseIcon"
import {mapGetters, mapActions} from "vuex";
import BaseLoader from "@/components/base/BaseLoader";
import BaseCheckbox from "@/components/base/BaseCheckbox";

export default {
  name: "App",
  components: {
    BaseLoader,
    Card,
    BaseCheckbox,
    BaseIcon
  },
  computed: {
    ...mapGetters({
      tickets: "tickets",
      airlines: 'airlines',
      airlineCompanies: 'airlineCompanies',
    }),
    getFilteredCards() {
      if (this.airlineMapTracker && this.airlineMap.size === 0) return this.cards
      return this.cards.filter(card => {
        const airline = this.airlineMap.get(card.carrier)
        return card.carrier_name === airline
      })
    },
    getFilteredOptions() {
      if (this.optionsMapTracker && this.optionsMap.size === 0) return this.getFilteredCards
      let array = this.getFilteredCards
      for (let [key] of this.optionsMap) {
        if (key === 'stops') {
          array = array.filter(item => item.stops === 0)
        }
        if (key === 'baggage') {
          array = array.filter(item => {
            return item.segments[0].baggage_options[0].value !== 0
          })
        }
        if (key === 'refundable') {
          array = array.filter(item => item.refundable)
        }
      }
      return array
    }
  },
  data() {
    return {
      showOptionFilterIcon: false,
      showCompanyFilterIcon: false,
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
      airlineMap: new Map(),
      airlineMapTracker: 1,
      cards: [],
      optionsMap: new Map(),
      optionsMapTracker: 1,
    }
  },
  methods: {
    ...mapActions({
      fetchCards: "fetchCards",
    }),
    filterAirline(key, toggle) {
      // Maps are not reactive, this line helps computed property know that map size is changed
      this.airlineMapTracker += 1;
      if (key === 'all') {
        for (let [key] of this.airlineMap) {
          this.airlineMap.delete(key)
        }
        // setting  other checkboxes false
        this.airlineCompanies.forEach(item => {
          if (item.key !== 'all') {
            item.value = false
          }
        })
        return
      }
      if (toggle) {
        // setting all-key checkbox to false
        this.airlineCompanies.find(item => item.key === 'all').value = false
        this.airlineMap.set(key, this.airlines[key])
      } else {
        this.airlineMap.delete(key)
      }
    },
    filterOptions(key, toggle) {
      this.optionsMapTracker += 1
      if (toggle) this.optionsMap.set(key, key)
      else this.optionsMap.delete(key)
    },
    clearOptions() {
      this.optionCheckboxes.forEach(item => {
        item.value = false
        this.filterOptions(item.key, false)
      })
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
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
