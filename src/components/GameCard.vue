<template>
  <div
    v-if="isShowing"
    ref="interactElement"
    :class="{
      isAnimating: isInteractAnimating,
      isCurrent: isCurrent,
    }"
    class="card"
    :style="{ transform: transformString }"
  >
    <v-sheet
      style="height: 100%; width: 100% border-radius: 24px"
      color="primary"
    >
      <div>
        <div v-if="(swipes == 0) & (index == 0)" class="ma-6">
          <h1>{{ thread.title }}</h1>
          <i>por {{ thread.author }} </i>
        </div>
        <div v-else>
          <v-subheader>{{ thread.title }}</v-subheader>
          <v-divider></v-divider>
        </div>
        <img
          v-if="card.urls.length > 0"
          class="mb-n2"
          :src="card.urls[0]"
          style="max-height: 200px; width: 100%; object-fit: cover"
          @click="image = card.urls[0]"
        />
        <div
          v-html="linkify(card.text)"
          class="font-weight-bold mx-6 mt-6"
          style="font-size: 2vh"
        ></div>
      </div>
      <v-layout
        class="pb-6"
        justify-space-between
        align-center
        style="position: absolute; bottom: 0; left: 0; right: 0; width: 100%"
      >
        <v-btn icon :disabled="swipes == 0" @click="$emit('back')">
          <v-icon color="black">mdi-chevron-left</v-icon>
        </v-btn>
        <v-progress-linear
          color="black"
          class="mx-3"
          :height="10"
          :value="(swipes * 100) / (count - 1)"
        ></v-progress-linear>
        <v-btn icon @click="playCard('cardAccepted')">
          <v-icon color="black">mdi-chevron-right</v-icon>
        </v-btn>
      </v-layout>
    </v-sheet>
    <v-dialog :value="image" class="pa-12">
      <img
        :src="image"
        style="max-height: 100%; max-width: 100%; object-fit: cover"
        @click="image = card.urls[0]"
      />
      <v-btn
        fab
        @click="image = null"
        dark
        color="secundary"
        style="position: absolute; top: 48px; right: 32px"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-dialog>
  </div>
</template>

<script>
import interact from "interact.js";
const ACCEPT_CARD = "cardAccepted";
const REJECT_CARD = "cardRejected";
const SKIP_CARD = "cardSkipped";

export default {
  static: {
    interactMaxRotation: 15,
    interactOutOfSightXCoordinate: 500,
    interactOutOfSightYCoordinate: 600,
    interactYThreshold: 150,
    interactXThreshold: 100,
  },

  props: {
    card: {
      type: Object,
      required: true,
    },
    thread: {
      type: Object,
    },
    index: {
      type: Number,
    },
    swipes: {
      type: Number,
    },
    isCurrent: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      isShowing: true,
      image: null,
      isInteractAnimating: true,
      isInteractDragged: null,
      interactPosition: {
        x: 0,
        y: 0,
        rotation: 0,
      },
      count: JSON.parse(JSON.stringify(this.thread.content.length)),
    };
  },

  computed: {
    transformString() {
      if (!this.isInteractAnimating || this.isInteractDragged) {
        const { x, y, rotation } = this.interactPosition;
        return `translate3D(${x}px, ${y}px, 0) rotate(${rotation}deg)`;
      }

      return null;
    },
  },

  mounted() {
    const element = this.$refs.interactElement;

    interact(element).draggable({
      onstart: () => {
        this.isInteractAnimating = false;
      },

      onmove: (event) => {
        const { interactMaxRotation, interactXThreshold } =
          this.$options.static;
        const x = this.interactPosition.x + event.dx;
        const y = this.interactPosition.y + event.dy;

        let rotation = interactMaxRotation * (x / interactXThreshold);

        if (rotation > interactMaxRotation) rotation = interactMaxRotation;
        else if (rotation < -interactMaxRotation)
          rotation = -interactMaxRotation;

        this.interactSetPosition({ x, y, rotation });
      },

      onend: () => {
        const { x, y } = this.interactPosition;
        const { interactXThreshold, interactYThreshold } = this.$options.static;
        this.isInteractAnimating = true;

        if (x > interactXThreshold) this.playCard(ACCEPT_CARD);
        else if (x < -interactXThreshold) this.playCard(REJECT_CARD);
        else if (y > interactYThreshold) this.playCard(SKIP_CARD);
        else this.resetCardPosition();
      },
    });
  },

  beforeDestroy() {
    interact(this.$refs.interactElement).unset();
  },

  methods: {
    linkify(inputText) {
      //URLs starting with http://, https://, or ftp://
      var replacePattern1 =
        /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
      var replacedText = inputText.replace(
        replacePattern1,
        '<a href="$1" target="_blank">$1</a>'
      );

      //URLs starting with www. (without // before it, or it'd re-link the ones done above)
      var replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
      var replacedText = replacedText.replace(
        replacePattern2,
        '$1<a href="http://$2" target="_blank">$2</a>'
      );

      //Change email addresses to mailto:: links
      var replacePattern3 =
        /(([a-zA-Z0-9_\-\.]+)@[a-zA-Z_]+?(?:\.[a-zA-Z]{2,6}))+/gim;
      var replacedText = replacedText.replace(
        replacePattern3,
        '<a href="mailto:$1">$1</a>'
      );

      return replacedText.replace(/\n/g, "<br />");
    },
    hideCard() {
      setTimeout(() => {
        this.isShowing = false;
        this.$emit("hideCard", this.card);
      }, 300);
    },

    playCard(interaction) {
      const {
        interactOutOfSightXCoordinate,
        interactOutOfSightYCoordinate,
        interactMaxRotation,
      } = this.$options.static;

      this.interactUnsetElement();

      switch (interaction) {
        case ACCEPT_CARD:
          this.interactSetPosition({
            x: interactOutOfSightXCoordinate,
            rotation: interactMaxRotation,
          });
          this.$emit(ACCEPT_CARD);
          break;
        case REJECT_CARD:
          this.interactSetPosition({
            x: -interactOutOfSightXCoordinate,
            rotation: -interactMaxRotation,
          });
          this.$emit(REJECT_CARD);
          break;
        case SKIP_CARD:
          this.interactSetPosition({
            y: interactOutOfSightYCoordinate,
          });
          this.$emit(SKIP_CARD);
          break;
      }

      this.hideCard();
    },

    interactSetPosition(coordinates) {
      const { x = 0, y = 0, rotation = 0 } = coordinates;
      this.interactPosition = { x, y, rotation };
    },

    interactUnsetElement() {
      interact(this.$refs.interactElement).unset();
      this.isInteractDragged = true;
    },

    resetCardPosition() {
      this.interactSetPosition({ x: 0, y: 0, rotation: 0 });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/index.scss";

$cardsTotal: 3;
$cardsWidth: 300px;
$cardsPositionOffset: 55vh * 0.06;
$cardsScaleOffset: 0.05;
$defaultTranslation: $cardsPositionOffset * $cardsTotal;
$defaultScale: 1 - ($cardsScaleOffset * $cardsTotal);
$fs-card-title: 1.125em;

.card {
  @include card();
  @include absolute(0);
  @include sizing(100% 80vw);
  @include flex-center();

  @include after() {
    @include sizing(21px 3px);
    @include absolute(right 0 bottom 11px left 0);

    margin: auto;
    border-radius: 100px;
    background: rgba($c-black, 0.3);
  }

  display: flex;
  // max-height: 350px;
  margin: auto;
  font-size: $fs-h2;
  font-weight: $fw-bold;
  color: $c-white;
  background-image: #ffc764;
  opacity: 0;
  transform: translateY($defaultTranslation) scale($defaultScale);
  transform-origin: 50%, 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  user-select: none;
  pointer-events: none;
  will-change: transform, opacity;

  height: 100%;

  &.isCurrent {
    pointer-events: auto;
  }

  &.isAnimating {
    transition: transform 0.7s $ease-out-back;
  }
}

.cardTitle {
  margin: 0 0 15px;
  font-size: $fs-card-title;
}

@for $i from 1 through $cardsTotal {
  $index: $i - 1;
  $translation: $cardsPositionOffset * $index;
  $scale: 1 - ($cardsScaleOffset * $index);

  .card:nth-child(#{$i}) {
    z-index: $cardsTotal - $index;
    opacity: 1;
    transform: translateY($translation) scale($scale);

    @if $i == 3 {
      color: #ffc764;
      background-color: #ffc764;
    } @else if $i == 2 {
      color: #ffc764;
      background-color: #ffc764;
    }

    @if $i != 1 {
      background-image: none;

      @include after() {
        @include sizing(0 0);
      }
    }
  }
}
</style>
