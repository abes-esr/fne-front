<template>
  <v-sheet :color="`'lighten-4'`">
    <v-skeleton-loader
      v-bind="attrs"
      max-width="600"
    ></v-skeleton-loader>
  </v-sheet>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class LoadingPage extends Vue {
  attrs = {
    class: "mx-auto my-16",
    type: "article, list-item-two-line, actions",
    elevation: 5
  };
}
</script>
