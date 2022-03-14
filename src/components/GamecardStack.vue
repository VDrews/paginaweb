<template>
  <div class="cards">
    <GameCard
      v-for="(card, index) in cards"
      :key="card.text"
      :card="card"
      :thread="thread"
      :index="index"
      :swipes="swipes"
      :is-current="index === 0"
      @back="goBack"
      @cardAccepted="cardSkipped"
      @cardRejected="cardSkipped"
      @cardSkipped="cardSkipped"
      @hideCard="cardSkipped"
    />
  </div>
</template>

<script>
import GameCard from "@/components/GameCard";

export default {
  components: {
    GameCard,
  },

  data() {
    return {
      swipes: 0,
      backhistory: [],
    };
  },

  props: {
    cards: {
      type: Array,
      required: true,
    },
    thread: {
      type: Object,
      required: true,
    },
  },

  methods: {
    cardSkipped() {
      this.backhistory.push(this.cards.shift());
      this.swipes += 1;
      this.$emit("cardSkipped");
    },
    goBack() {
      this.swipes -= 1;
      this.cards.unshift(this.backhistory.pop());
    },
  },
};
</script>

<style lang="scss" scoped>
.cards {
  position: relative;
  display: flex;
  width: 100%;
  height: auto !important;
}
</style>
