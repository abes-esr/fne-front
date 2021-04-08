<template>
  <v-container fluid>
    <loading-page v-if="loadingPage"></loading-page>
    <person-notice-list
      v-else
      :noticeList="noticeList"
      @edit-notice="editNotice"
      @show-notice="showNotice"
    >
    </person-notice-list>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import PersonNoticeList from "@/components/notice-components/NoticeList.vue";
import { WikibaseApiUtilsRequest } from "@/axios/WikibaseApiUtilsRequest";

interface Notice {
  title: string;
  snippet: string;
}

@Component({
  components: {
    PersonNoticeList
  }
})
export default class PersonNoticeListView extends Vue {
  loadingPage = true;
  noticeList: Notice[] = [];

  created() {
    this.noticeByItemId(this.$route.params.term);
  }

  noticeByItemId(term: string) {
    this.loadingPage = true;
    WikibaseApiUtilsRequest.findItem(term)
      .then(res => {
        this.noticeList = res.data;
        this.loadingPage = false;
        if (this.noticeList.length === 0) {
          this.$router.push({
            name: "not-found",
            params: {
              messageCustom: "Aucun résultat ne correspond à la requête"
            }
          });
        }
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

  async editNotice(noticeId: string) {
    const itemDescription: string = await WikibaseApiUtilsRequest.getItemDescript(
      noticeId
    )
      .then(res => {
        if (res.status === 200) {
          return res.data.value;
        }
      })
      .catch(err => console.log(err.message));

    if (itemDescription === "Personne - RDA") {
      await this.$router.push({
        name: "edit-person-notice",
        params: { itemId: noticeId }
      });
    } else {
      await this.$router.push({
        name: "home"
      });
    }
  }

  async showNotice(noticeId: string) {
    const itemDescription: string = await WikibaseApiUtilsRequest.getItemDescript(
      noticeId
    )
      .then(res => {
        if (res.status === 200) {
          return res.data.value;
        }
      })
      .catch(err => console.log(err.message));

    if (itemDescription === "Personne - RDA") {
      await this.$router.push({
        name: "person-notice-detail",
        params: { itemId: noticeId }
      });
    } else {
      await this.$router.push({
        name: "home"
      });
    }
  }

  @Watch("$route")
  changeRouteParamsWatch() {
    if (this.$route.params.term !== undefined) {
      this.noticeByItemId(this.$route.params.term);
    }
  }
}
</script>
