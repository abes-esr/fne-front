<template>
  <div class="home">
    <v-container mt="30">
      <v-row class="text-center">
        <v-col cols="12">
          <h1>Notice</h1>
        </v-col>
      </v-row>
      <v-row class="text-center">
        <v-col md="8" offset-md="2">
          <notice-form-input></notice-form-input>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NoticeFormInput from "@/components/home-components/NoticeFormInput.vue";
@Component({
  components: {
    NoticeFormInput
  }
})
export default class Home extends Vue {}
</script>
