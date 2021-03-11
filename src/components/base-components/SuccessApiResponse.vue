<template>
  <v-alert type="success" dismissible>
    <slot></slot>
  </v-alert>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class SuccessApiResponse extends Vue {}
</script>
