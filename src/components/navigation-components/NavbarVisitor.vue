<template>
  <v-app-bar app color="primary" dark>
    <v-toolbar-title
      @click="$router.push({ name: 'Home' }).catch(() => {})"
      class="display-1 Bold text"
      style="cursor:pointer"
      >{{ logo }}
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <search-navbar></search-navbar>
    <div v-for="link in links" :key="link.text">
      <v-btn :to="link.route" text>
        <span class="mr-2">{{ link.namePage }}</span>
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SearchNavbar from "@/components/navigation-components/SearchNavbar.vue";

@Component({
  components: {
    SearchNavbar
  }
})
export default class NavbarVisitor extends Vue {
  logo = "FNE";
  links = [
    {'namePage': 'Home', 'route': '/'},
    {'namePage': 'Personne Notice', 'route': '/person-notice'},
  ];
}
</script>
