<template>
  <div class="person-notice-detail-view">
    <loading-page v-if="loadingPage"></loading-page>
    <v-container mt="30" v-else>
      <v-row align="center" justify="center">
        <v-col cols="12">
          <h1>
            Notice : {{ noticeTitle }}
            <v-icon medium color="red darken-2" @click="editNotice">
              mdi-pencil
            </v-icon>
          </h1>
          <h2>Type : {{ personNotice.instantOf }}</h2>
          <h2 v-if="personNotice.ppn !== ''">PPN: {{ personNotice.ppn }}</h2>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-col cols="12">
          <person-notice-detail
            :personNotice="personNotice"
          ></person-notice-detail>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PersonNoticeDetail from "@/components/notice-components/person-notice/PersonNoticeDetail.vue";
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
    PersonNoticeDetail
  }
})
export default class PersonNoticeDetailView extends Vue {
  loadingPage = true;
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

  async mounted() {
    if (this.$route.params.itemId !== undefined) {
      await this.personNoticeByItemId(this.$route.params.itemId);
    }
  }

  get noticeTitle() {
    let noticeTitle =
      this.personNotice.firstName + ", " + this.personNotice.lastName;
    if (
      this.personNotice.dateBirth !== "" &&
      this.personNotice.dateBirth !== null
    ) {
      noticeTitle +=
        " ( " + this.personNotice.dateBirth.substring(0, 4) + " - ";
      if (
        this.personNotice.dateDead !== "" &&
        this.personNotice.dateDead !== null
      ) {
        noticeTitle += this.personNotice.dateDead + " )";
      } else {
        noticeTitle += " ... )";
      }
    }
    return noticeTitle;
  }
  async personNoticeByItemId(itemId: string) {
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

  editNotice() {
    this.$router.push({
      name: "edit-person-notice",
      params: { itemId: this.$route.params.itemId }
    });
  }
}
</script>
