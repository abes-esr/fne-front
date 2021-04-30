<template>
  <div class="home">
    <loading-page v-if="loadingPage"></loading-page>
    <v-container mt="30" v-else>
      <v-row class="text-center">
        <v-col cols="12">
          <h1>Notice : Personne - RDA</h1>
          <h2 v-if="personNotice.ppn !== ''">PPN: {{ personNotice.ppn }}</h2>
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
            :resFromApi="resFromApi"
            @post-personnotice-action="postPersonNoticeAction"
            @put-personnotice-action-update="putPersonNoticeActionUpdate"
          ></person-notice-input>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import PersonNoticeInput from "@/components/notice-components/person-notice/PersonNoticeInput.vue";
import ErrorApiResponse from "@/components/base-components/ErrorApiResponse.vue";
import SuccessApiResponse from "@/components/base-components/SuccessApiResponse.vue";
import { WikibaseApiUtilsRequest } from "@/axios/WikibaseApiUtilsRequest";
import axios from "axios";
import { PersonNoticeRequest } from "@/axios/PersonNoticeRequest";

interface Person {
  instantOf: string;
  ppn: string;
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
export default class PersonNoticeView extends Vue {
  resFromApi = false;
  errorApi = "";
  successApi = "";
  loadingPage = false;

  apiLangues: string[] = [];
  apiCountries: string[] = [];

  personNotice: Person = {
    instantOf: "Personne - RDA",
    ppn: "",
    firstName: "",
    lastName: "",
    dateBirth: "",
    dateDead: "",
    langue: "",
    country: "",
    source: ""
  };

  created() {
    if (this.$route.params.itemId !== undefined) {
      this.loadingPage = true;
    }
  }

  async mounted() {
    const apiReqLangues = await WikibaseApiUtilsRequest.getLangues();
    const apiReqCountires = await WikibaseApiUtilsRequest.getCounties();
    const requeteList = [apiReqLangues, apiReqCountires];
    await axios
      .all(requeteList)
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

    if (typeof this.$route.params.itemId !== "undefined") {
      await this.personNoticeByItemId(this.$route.params.itemId);
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

  async personNoticeByItemId(itemId: string) {
    this.loadingPage = true;
    await PersonNoticeRequest.getPersonNotice(itemId)
      .then(res => {
        this.personNotice = res.data;
        this.loadingPage = false;
      })
      .catch(err => {
        console.log(err.message);
        this.loadingPage = false;
        this.$router.push({
          name: "not-found",
          params: { messageCustom: "Cette notice n'existe pas" }
        });
      });
  }

  async putPersonNoticeActionUpdate(personNoticeUpdate: any): Promise<void> {
    this.resFromApi = false;
    this.errorApi = "";
    this.successApi = "";
    await PersonNoticeRequest.updatePersonNotice(personNoticeUpdate)
      .then(res => {
        setTimeout(() => {
          this.resFromApi = true;
        }, 2000);
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
    if (typeof this.$route.params.itemId !== "undefined") {
      this.personNoticeByItemId(this.$route.params.itemId);
    } else {
      this.personNotice = {
        instantOf: "Personne - RDA",
        ppn: "",
        firstName: "",
        lastName: "",
        dateBirth: "",
        dateDead: "",
        langue: "",
        country: "",
        source: ""
      };
    }
  }
}
</script>
