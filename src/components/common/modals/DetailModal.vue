<template>
  <div>
    <BaseModal>
      <div class="details" v-click-outside="() => $emit('updateShow', false)">
        <div class="details__title">
          {{ details[0].origin + " — " }}
          {{ details.length === 1 ? details[0].dest : details[1].dest }}
        </div>
        <div class="details__time">
          {{ time | countTime }} в пути
        </div>
        <div class="flights" v-for="(detail, i) in details" :key="i">
          <div class="flights__company">
            <img :src="`https://aviata.kz/static/airline-logos/80x80/${detail.carrier}.png`" alt="logo">
            <div class="flights__company-name">
              {{ detail.carrier_name }}
            </div>
          </div>
          <div>
            <div class="flights__info">
              <div class="flights__info-time">{{ detail.dep_time }}</div>
              <div class="flights__info-right">
                <div class="flights__info-city">{{ detail.origin }}</div>
                <div class="flights__info-port">{{ detail.airport_origin }}</div>
              </div>

            </div>
            <div class="flights__info">
              <div class="flights__info-time">{{ detail.arr_time }}</div>
              <div class="flights__info-right">
                <div class="flights__info-city">{{ detail.dest }}</div>
                <div class="flights__info-port">{{ detail.airport_dest }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="close" @click="$emit('updateShow', false)">X</div>
      </div>
    </BaseModal>
  </div>
</template>
<script>
import BaseModal from "@/components/base/BaseModal";
import vClickOutside from 'v-click-outside';

export default {
  props: {
    details: {
      type: Array,
      default: () => []
    },
    time: [Number, String]
  },
  components: {
    BaseModal
  },
  model: {
    prop: "show",
    event: "updateShow"
  },
  directives: {
    clickOutside: vClickOutside.directive
  }

}
</script>

<style lang="scss" scoped>
.details {
  width: 600px;
  background: #fff;
  padding: 40px;
  position: relative;

  &__title {
    font-size: 18px;
    line-height: 24px;
    color: #000000;
    font-weight: 600;
  }

  &__time {
    font-size: 14px;
    color: #707276;
  }

  .flights {
    margin-top: 15px;

    &__company {
      display: flex;
      align-items: center;

      img {
        width: 40px;
        height: 40px;
      }

      &-name {
        font-size: 14px;
        font-weight: 600;
        color: #000;
        margin-left: 8px;
      }
    }

    &__info {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;

      &-time,
      &-city {
        font-size: 16px;
        font-weight: 600;
        color: #000;
      }

      &-port {
        font-size: 16px;
        font-weight: 400;
        color: #707276;
        margin: 7px 0;
      }
    }
  }

  .close {
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 24px;
    opacity: .5;
    color: red;
  }
}
</style>