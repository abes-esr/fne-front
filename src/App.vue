<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <navbar></navbar>
    </v-app-bar>

    <v-main class="my-10">
      <RouterView />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Navbar from "@/components/navigation-components/Navbar.vue";

@Component({
  components: {
    navbar: Navbar
  }
})
export default class App extends Vue {}
</script>
