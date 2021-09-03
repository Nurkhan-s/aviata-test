<template>
  <div class="card">
    <div class="card__left">
      <div class="card__left-top">
        <div class="logo">
          <img
              :src="`https://aviata.kz/static/airline-logos/80x80/${card.carrier}.png`"
              alt="logo">
          <span>{{ card.carrier_name }}</span>
        </div>
        <div class="dep_date">
          <div class="day">{{ card.dep_date | dateSetter }}</div>
          <div class="hour">{{ getHour(card.dep_date) }}</div>
        </div>
        <div class="traveltime">
          <div class="traveltime-info">
            <span>{{ card.segments[0].origin_code }}</span>
            <span class="time">{{ countTime(card.traveltime) }}</span>
            <span>{{ card.stops === 1 ? card.segments[1].dest_code : card.segments[0].dest_code }}</span>
          </div>
          <BaseIcon class="ic-height-5 ic-width-172">line</BaseIcon>
          <div class="traveltime-stop" v-if="card.stops > 0">{{
              `Через ${card.segments[0].dest}, ${countTime(card.layovers[0])}`
            }}
          </div>
        </div>
        <div class="arr_date">
          <div class="day">{{ card.arr_date | dateSetter }}</div>
          <div class="hour">{{ getHour(card.arr_date) }}</div>
        </div>
      </div>
      <div class="card__left-bottom">
        <div class="details">
          Детали перелета
        </div>
        <div class="conditions">
          Условия тарифа
        </div>
        <div class="refundable">
          <BaseIcon class="ic-size-16">non-refundable</BaseIcon>
          <span>{{ card.refundable ? 'возвратный' : 'невозвратный' }}</span>
        </div>
      </div>
    </div>
    <div class="card__right">
      <div class="price">
        {{ card.price.amount + ' ' + card.price.currency }}
      </div>
      <button class="button">Выбрать</button>
      <div class="passenger-price">Цена за всех пассажиров</div>
      <div class="baggage">
        <span>{{ hasBaggage ? 'С багажом' : 'Нет багажа' }}</span>
        <button class="baggage-button">{{
            !hasBaggage ? '+Добавить багаж' : '-Убрать багаж'
          }}
        </button>
      </div>
    </div>
    <DetailModal v-if="showDetails"
                 @click="showDetails = true"
                 :details="card.segments"/>
    <ConditionModal/>
  </div>
</template>
<script>
import BaseIcon from "@/components/base/BaseIcon"
import DetailModal from "@/components/common/modals/DetailModal"
import ConditionModal from "@/components/common/modals/ConditionModal"

export default {
  data() {
    return {
      showDetails: false,

    }
  },
  components: {
    BaseIcon,
    DetailModal,
    ConditionModal
  },
  props: {
    card: {
      type: Object,
      required: true
    },
  },
  computed: {
    hasBaggage(){
      return this.card.segments[0].baggage_options[0].value !== 0
    }
  },
  methods: {
    getHour(time) {
      return time.slice(-5)
    },
    countTime(time) {
      const minutes = Math.floor((time / 60) % 60)
      const hours = Math.floor((time / (60 * 60) % 24))
      return `${hours} ч ${minutes} м`
    }
  }
};
</script>
<style lang="scss" scoped>
.card {
  background: #FFFFFF;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  max-width: 880px;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  height: 168px;

  &__left {
    flex: 0 0 75%;
    padding: 40px 20px 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;


    &-top {
      display: grid;
      align-items: center;
      grid-template-columns: 1fr 0.75fr 1.3fr 0.75fr;
      justify-content: center;


      .logo {
        display: flex;

        img {
          width: 20px;
          height: 20px;
        }

        span {
          margin-left: 7px;
          font-weight: 600;
          font-size: 14px;
          line-height: 19px;
          color: #202123;
        }
      }

      .dep_date,
      .arr_date {
        display: flex;
        flex-direction: column;
        align-items: center;

        .day {
          font-size: 12px;
          line-height: 16px;
          color: #202123;
        }

        .hour {
          font-weight: 600;
          font-size: 24px;
          line-height: 33px;
          color: #202123
        }
      }

      .traveltime {
        display: flex;
        flex-direction: column;
        align-items: center;

        &-info {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 80%;

          span {
            font-size: 10px;
            line-height: 12px;;
            color: #B9B9B9
          }

          .time {
            font-size: 12px;
            line-height: 18px;
            color: #202123
          }
        }

        &-stop {
          font-size: 12px;
          line-height: 16px;
          color: #FF9900;
        }


      }
    }

    &-bottom {
      display: flex;
      align-items: center;

      .details,
      .conditions {
        font-size: 12px;
        line-height: 16px;
        color: #7284E4;
        margin-right: 23px;
        cursor: pointer;
        text-decoration: underline;
        text-decoration-style: dashed;
        text-underline-position: under;
        text-underline-offset: 2px;


      }

      .refundable {
        display: flex;
        align-items: center;
        margin-left: 23px;

        span {
          font-size: 12px;
          line-height: 14px;
          color: #707276;
          margin-left: 7px;
        }
      }
    }
  }

  &__right {
    flex: 0 0 23%;
    background: #F5F5F5;
    border-radius: 0px 4px 4px 0px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;

    .price {
      font-size: 24px;
      line-height: 28px;
      color: #202123;
    }

    button {
      border: none;
      outline: none;
      cursor: pointer;
      transition: 0.3s all;
      display: flex;
      justify-content: center;
      align-items: center;
      background: none;
    }

    .button {
      background: #55BB06;
      border-radius: 4px;
      font-size: 18px;
      line-height: 25px;
      color: #FFFFFF;
      width: 200px;
      height: 40px;
    }

    .passenger-price {
      font-size: 12px;
      line-height: 16px;
      color: #707276;
    }

    .baggage {
      display: flex;
      align-items: center;
      font-size: 12px;
      line-height: 16px;

      span {
        color: #202123;
        margin-right: 6px;
      }

      button {
        color: #5763B3;
        background: #EAF0FA;
        border-radius: 2px;
      }
    }
  }
}
</style>