<template>
  <v-alert type="error" dismissible>
    <slot></slot>
  </v-alert>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class ErrorApiResponse extends Vue {}
</script>
