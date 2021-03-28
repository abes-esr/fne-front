<template>
  <v-app-bar app color="primary" dark>
    <v-toolbar-title
      @click="$router.push('/')"
      class="display-1 Bold text"
      style="cursor:pointer"
      >{{ logo }}
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text>
      <span class="mr-2">Se déconnecter</span>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class NavbarLoged extends Vue {}
</script>
