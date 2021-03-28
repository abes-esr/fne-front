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
            :personNotice="personNotice"
            :langues="apiLangues"
            :countries="apiCountries"
            @post-personnotice-action="postPersonNoticeAction"
          ></person-notice-input>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import PersonNoticeInput from "@/components/notice-components/PersonNoticeInput.vue";
import ErrorApiResponse from "@/components/base-components/ErrorApiResponse.vue";
import SuccessApiResponse from "@/components/base-components/SuccessApiResponse.vue";
import { WikibaseApiUtilsRequest } from "@/axios/WikibaseApiUtilsRequest";
import axios from "axios";
import { PersonNoticeRequest } from "@/axios/PersonNoticeRequest";

interface Person {
  instantOf: string;
  firstName: string;
  lastName: string;
  dateBirth: string;
  dateDead: string;
  langue: string;
  country: string;
  source: string;
}

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
  personNoticeDescription = "";

  apiLangues: string[] = [];
  apiCountries: string[] = [];

  personNotice: Person = {
    instantOf: "Personne - RDA",
    firstName: "",
    lastName: "",
    dateBirth: "",
    dateDead: "",
    langue: "",
    country: "France",
    source: ""
  };
  async mounted() {
    console.log(this.$route.params.itemId);
    const apiReqLangues = await WikibaseApiUtilsRequest.getLangues();
    const apiReqCountires = await WikibaseApiUtilsRequest.getCounties();
    await axios
      .all([apiReqLangues, apiReqCountires])
      .then(
        axios.spread((langueResponse, countryResponse) => {
          for (const itemLangue of langueResponse.data) {
            this.apiLangues.push(itemLangue.langueName);
          }
          for (const itemCountry of countryResponse.data) {
            this.apiCountries.push(itemCountry.countryName);
          }
        })
      )
      .catch(error => {
        console.log(error.message);
      });

    if (this.$route.params.itemId !== undefined) {
      console.log("OK Route Param");
    }
  }

  async postPersonNoticeAction(): Promise<void> {
    this.resFromApi = false;
    this.errorApi = "";
    this.successApi = "";
    await PersonNoticeRequest.createPersonNotice(this.personNotice)
      .then(res => {
        this.resFromApi = true;
        if (res.data.status == "OK") {
          const url = "http://fne-test.abes.fr/wiki/Item:" + res.data.itemId;
          this.successApi =
            "Votre notice a envoyé à Wikibase avec succès: " + url;
        } else if (res.data.status == "Doublons") {
          this.errorApi = "Erreur doublons: " + res.data.itemId;
        }
      })
      .catch(err => {
        this.resFromApi = true;
        this.errorApi = err.message;
      });
  }

  @Watch("$route")
  changeRouterParams() {
    console.log(this.$route.params.itemId);
  }
}
</script>
