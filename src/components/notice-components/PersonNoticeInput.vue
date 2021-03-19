<template>
  <v-container fluid>
    <v-card elevation="12">
      <v-row class="text-center">
        <v-col cols="12">
          <v-form
            class="pa-10"
            ref="noticeForm"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              v-model.trim="personNotice.firstName"
              :rules="formRules"
              :min="4"
              counter
              label="Nom"
              required
            ></v-text-field>
            <v-text-field
              v-model.trim="personNotice.lastName"
              :rules="formRules"
              :min="4"
              counter
              label="Prénom"
              required
            ></v-text-field>

            <v-text-field
              v-if="dateBirthYearOnly"
              v-model.trim="personNotice.dateBirth"
              :rules="dateRules"
              :max="4"
              counter
              label="Date de naissance"
              prepend-inner-icon="mdi-calendar"
            ></v-text-field>

            <v-layout row wrap v-else-if="!dateBirthYearOnly">
              <v-menu
                v-model="dateMenuBirth"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    readonly
                    :value="addDateBirth"
                    v-on="on"
                    label="Date de naissance"
                    prepend-inner-icon="mdi-calendar"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model.trim="personNotice.dateBirth"
                  no-title
                  @input="dateMenuBirth = !dateMenuBirth"
                ></v-date-picker>
              </v-menu>
            </v-layout>
            <v-checkbox
              v-model="dateBirthYearOnly"
              label="L'année uniquement"
            ></v-checkbox>

            <v-text-field
              v-if="dateDeadYearOnly"
              v-model.trim="personNotice.dateDead"
              :rules="dateRules"
              :min="4"
              :max="4"
              counter
              label="Date de décès"
              prepend-inner-icon="mdi-calendar"
            ></v-text-field>
            <v-layout row wrap v-else-if="!dateDeadYearOnly">
              <v-menu
                v-model="dateMenuDead"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    readonly
                    :value="addDateDead"
                    v-on="on"
                    label="Date de décès"
                    prepend-inner-icon="mdi-calendar"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model.trim="personNotice.dateDead"
                  no-title
                  @input="dateMenuDead = !dateMenuDead"
                ></v-date-picker>
              </v-menu>
            </v-layout>

            <v-checkbox
              v-model="dateDeadYearOnly"
              label="L'année uniquement"
            ></v-checkbox>

            <v-select
              required
              :rules="formRules"
              :items="apiLangues"
              v-model.trim="personNotice.langue"
              label="Langue de la personne"
            ></v-select>
            <v-select
              required
              :rules="formRules"
              :items="apiCountries"
              v-model="personNotice.country"
              label="Pays associé à la personne"
            ></v-select>
            <v-text-field
              required
              :rules="formRules"
              v-model.trim="personNotice.source"
              counter
              label="Source"
            ></v-text-field>

            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="validate"
            >
              Envoyer
            </v-btn>
            <v-btn color="error" @click="reset">
              Annuler
            </v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Emit, Watch } from "vue-property-decorator";
import { PersonNoticeRequest } from "@/axios/PersonNoticeRequest";
import { WikibaseApiUtilsRequest } from "@/axios/WikibaseApiUtilsRequest";
import axios from "axios";

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
  components: {}
})
export default class PersonNoticeInput extends Vue {
  valid = true;
  dateMenuDead = false;
  dateMenuBirth = false;
  dateBirthYearOnly = false;
  dateDeadYearOnly = false;
  personNotice: Person = {
    instantOf: "Personne - RDA",
    firstName: "",
    lastName: "",
    dateBirth: "",
    dateDead: "",
    langue: "",
    country: "",
    source: ""
  };
  apiLangues: string[] = [];
  apiCountries: string[] = [];
  formRules = [
    (v: any) => !!v || "ce champ ne doit pas être vide",
    (v: any) => (v && v.length >= 4) || "Min 4 caractères"
  ];
  dateRules = [
    (v: any) => (v && v.length == 4) || "Max 4 caractères",
    (v: any) =>
      /([1-2]([0-9]{2})([x]|[0-9]))/.test(v) || "La date n'est pas valide"
  ];

  async mounted() {
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
  }

  get formValid(): Vue & { validate: () => boolean } {
    return this.$refs.noticeForm as Vue & { validate: () => boolean };
  }
  get formReset(): Vue & { reset: () => boolean } {
    return this.$refs.noticeForm as Vue & { reset: () => boolean };
  }
  get addDateBirth() {
    return this.personNotice.dateBirth;
  }
  get addDateDead() {
    return this.personNotice.dateDead;
  }

  async validate(): Promise<void> {
    if (this.formValid.validate()) {
      this.createNewPersonNoticeAction();
      await PersonNoticeRequest.createPersonNotice(this.personNotice)
        .then(res => {
          this.createNewPersonNotice(res.data);
        })
        .catch(err => this.createNewPersonNoticeWithError(err.message));
    }
  }
  reset(): void {
    this.formReset.reset();
  }

  @Watch("dateBirthYearOnly")
  cleanDateBirth() {
    this.personNotice.dateBirth = "";
  }

  @Watch("dateDeadYearOnly")
  cleanDateDead() {
    this.personNotice.dateDead = "";
  }

  @Emit("post-personnotice-action-success")
  createNewPersonNotice(person: any) {
    return person;
  }

  @Emit("post-personnotice-action")
  createNewPersonNoticeAction() {
    return null;
  }

  @Emit("post-personnotice-action-error")
  createNewPersonNoticeWithError(errorMessage: any) {
    return errorMessage;
  }
}
</script>
