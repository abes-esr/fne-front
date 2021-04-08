<template>
  <v-row align="center" justify="center">
    <v-col cols="8">
      <v-card elevation="12">
        <template v-for="(notice, index) in noticeList">
          <v-list-item :key="notice.title">
            <v-list-item-content>
              <v-list-item-title>{{ notice.snippet }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon>
              <v-icon
                medium
                color="red darken-2"
                @click="editNotice(notice.title)"
              >
                mdi-pencil
              </v-icon>
              <v-spacer></v-spacer>
              <v-icon
                medium
                color="red darken-2"
                @click="showNotice(notice.title)"
              >
                mdi-eye
              </v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-divider
            v-if="index < noticeList.length - 1"
            :key="index"
          ></v-divider>
        </template>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from "vue-property-decorator";

interface Notice {
  title: string;
  snippet: string;
}

@Component({
  components: {}
})
export default class PersonNoticeList extends Vue {
  @Prop() readonly noticeList!: Notice[];

  @Emit("edit-notice")
  editNotice(noticeId: string) {
    return noticeId.substring(noticeId.lastIndexOf(":") + 1, noticeId.length);
  }

  @Emit("show-notice")
  showNotice(noticeId: string) {
    return noticeId.substring(noticeId.lastIndexOf(":") + 1, noticeId.length);
  }
}
</script>
