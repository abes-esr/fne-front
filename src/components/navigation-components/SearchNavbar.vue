<template>
  <v-autocomplete
    v-model="select"
    :loading="loading"
    :items="items"
    :search-input.sync="search"
    @change="items = []"
    v-click-outside="cleanItemList"
    class="mx-4"
    color="error"
    hide-no-data
    hide-details
    label="Cherche une notice"
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
    if (term != "") {
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
  }

  @Watch("search")
  findItem(term: any) {
    this.onDebouncedSearch(term);
  }
  // Todo
  @Watch("select")
  selectItem() {
    console.log(this.noticeList.find(v => v.snippet == this.select));
  }
}
</script>
