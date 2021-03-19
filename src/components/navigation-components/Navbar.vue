<template>
  <nav>
    <component :is="navBarType"></component>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NavbarVisitor from "@/components/navigation-components/NavbarVisitor.vue";

@Component({
  components: {
    NavbarVisitor
  }
})
export default class Navbar extends Vue {
  logo = "FNE";
  navType = "navbar-visitor";

  get navBarType() {
    return this.navType;
  }
}
</script>
