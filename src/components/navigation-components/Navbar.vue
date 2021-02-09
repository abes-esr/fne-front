<template>
  <nav>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title
        @click="$router.push('/')"
        class="display-1 Bold text"
        style="cursor:pointer"
        >{{ logo }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Navbar extends Vue {
  logo = "FNE";
}
</script>
