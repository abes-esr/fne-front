<template>
  <div class="not-found">
    <v-container mt="30">
      <v-row class="text-center">
        <v-col cols="12">
          <error-api-response>
            <h1>404 not found</h1>
            <h2 v-if="messageCustom === undefined">it seems you're in the wrong page</h2>
            <h2 v-else>{{ messageCustom }}</h2>
          </error-api-response>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import ErrorApiResponse from "@/components/base-components/ErrorApiResponse.vue";

@Component({
  components: {
    ErrorApiResponse
  }
})
export default class NotFoundPage extends Vue {
  @Prop() readonly messageCustom: string | undefined;
}
</script>
