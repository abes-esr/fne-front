<template>
  <v-card elevation="12" class="pa-4 mx-auto">
    <v-row>
      <v-col cols="12">
        <v-simple-table>
          <template v-slot:default>
            <tbody>
              <tr v-if="personNotice.firstName !== null">
                <td>Nom :</td>
                <td>{{ personNotice.firstName }}</td>
              </tr>
              <tr v-if="personNotice.lastName !== null">
                <td>Prénom :</td>
                <td>{{ personNotice.lastName }}</td>
              </tr>
              <tr v-if="personNotice.dateBirth !== null">
                <td>Date de naissance :</td>
                <td>{{ personNotice.dateBirth }}</td>
              </tr>
              <tr v-if="personNotice.dateDead !== null">
                <td>date de décès :</td>
                <td>{{ personNotice.dateDead }}</td>
              </tr>
              <tr v-if="personNotice.langue !== null">
                <td>Langue :</td>
                <td>{{ personNotice.langue }}</td>
              </tr>
              <tr v-if="personNotice.country !== null">
                <td>Pays :</td>
                <td>{{ personNotice.country }}</td>
              </tr>
              <tr v-if="personNotice.source !== null">
                <td>Source :</td>
                <td>{{ personNotice.source }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

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
  components: {}
})
export default class PersonNoticeDetail extends Vue {
  @Prop() readonly personNotice!: Person;
}
</script>
