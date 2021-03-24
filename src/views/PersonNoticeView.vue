<template>
  <div class="home">
    <v-container mt="30">
      <v-row class="text-center">
        <v-col cols="12">
          <h1>Notice : Personne - RDA</h1>
        </v-col>
        <v-col cols="12">
          <error-api-response v-if="resFromApi && errorApi !== ''">
            {{ errorApi }}
          </error-api-response>
          <success-api-response v-if="resFromApi && successApi !== ''">
            {{ successApi }}
          </success-api-response>
        </v-col>
      </v-row>
      <v-row class="text-center">
        <v-col md="8" offset-md="2">
          <person-notice-input
            @post-personnotice-action="postPersonNoticeAction"
            @post-personnotice-action-success="postPersonNoticeActionSuccess"
            @post-personnotice-action-error="postPersonNoticeActionError"
          ></person-notice-input>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PersonNoticeInput from "@/components/notice-components/PersonNoticeInput.vue";
import ErrorApiResponse from "@/components/base-components/ErrorApiResponse.vue";
import SuccessApiResponse from "@/components/base-components/SuccessApiResponse.vue";
@Component({
  components: {
    SuccessApiResponse,
    ErrorApiResponse,
    PersonNoticeInput
  }
})
export default class PersonNotice extends Vue {
  resFromApi = false;
  errorApi = "";
  successApi = "";

  postPersonNoticeAction() {
    this.resFromApi = !this.resFromApi;
    this.errorApi = "";
    this.successApi = "";
  }
  postPersonNoticeActionSuccess(person: any) {
    this.resFromApi = true;
    if (person.status == "OK") {
      const url = "http://fne-test.abes.fr/wiki/Item:" + person.itemId;
      this.successApi = "Votre notice a envoyé à Wikibase avec succès: " + url;
    } else if (person.status == "Doublons") {
      this.errorApi = "Erreur doublons: " + person.itemId;
    }
  }

  postPersonNoticeActionError(err: any) {
    this.resFromApi = true;
    this.errorApi = err;
  }
}
</script>
