<template>
  <v-autocomplete
    v-model="select"
    :loading="loading"
    :items="items"
    :search-input.sync="search"
    @change="items = []"
    @keypress.enter="noticeListPageSearch"
    v-click-outside="cleanItemList"
    class="mx-4"
    color="error"
    hide-no-data
    hide-details
    label="Rechercher une entité"
    rounded
    solo-inverted
  ></v-autocomplete>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { WikibaseApiUtilsRequest } from "@/axios/WikibaseApiUtilsRequest";
import debounce from "lodash/debounce";

interface Notice {
  title: string;
  snippet: string;
}
@Component
export default class SearchNavbar extends Vue {
  loading = false;
  items: string[] = [];
  noticeList: Notice[] = [];
  search = "";
  select = "";

  created() {
    this.onDebouncedSearch = debounce(this.onDebouncedSearch, 1000);
  }
  onDebouncedSearch(term: any) {
    term && term !== this.select && this.querySelections(term);
  }
  querySelections(term: any) {
    this.loading = true;
    if (term.trim != "") {
      setTimeout(() => {
        WikibaseApiUtilsRequest.findItem(term)
          .then(res => {
            this.noticeList = res.data;
            for (const v of this.noticeList) {
              this.items.push(v.snippet);
            }
            this.loading = false;
          })
          .catch(err => console.log(err));
      }, 500);
    }
  }

  cleanItemList() {
    this.items = [];
    this.select = "";
  }

  noticeListPageSearch() {
    if (this.search !== "" && this.$route.params.term !== this.search) {
      this.$router.push({
        name: "notice-list",
        params: { term: this.search }
      });
      this.search = "";
    }
  }

  @Watch("search")
  findItem(term: any) {
    this.onDebouncedSearch(term);
  }

  @Watch("select")
  async selectItem() {
    const noticeIdComplete = this.noticeList.find(v => v.snippet == this.select)
      ?.title;
    const noticeId = noticeIdComplete?.substring(
      noticeIdComplete?.lastIndexOf(":") + 1,
      noticeIdComplete?.length
    );
    if (typeof noticeId == "string") {
      const itemDescription: string = await WikibaseApiUtilsRequest.getItemDescript(
        noticeId
      )
        .then(res => {
          if (res.status === 200) {
            return res.data.value;
          }
        })
        .catch(err => console.log(err.message));

      /*eslint no-empty-function: "error"*/
      /*eslint-env es6*/
      if (itemDescription === "Personne - RDA") {
        await this.$router
          .push({
            name: "person-notice-detail",
            params: { itemId: noticeId }
          })
          .catch(() => {
            // do nothing same page.
          });
      } else {
        await this.$router.push({
          name: "home"
        });
      }
    }
  }
}
</script>
