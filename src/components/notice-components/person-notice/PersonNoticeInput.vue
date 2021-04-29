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
              clearable
            ></v-text-field>
            <v-text-field
              v-model.trim="personNotice.lastName"
              :rules="formRules"
              :min="4"
              counter
              label="Prénom"
              required
              clearable
            ></v-text-field>

            <v-text-field
              v-if="dateBirthYearOnly"
              v-model.trim="personNotice.dateBirth"
              :value="addDateBirth"
              :rules="dateRules"
              :max="4"
              counter
              label="Date de naissance"
              prepend-inner-icon="mdi-calendar"
              clearable
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
                    required
                    :rules="formRules"
                    :value="addDateBirth"
                    v-on="on"
                    label="Date de naissance"
                    prepend-inner-icon="mdi-calendar"
                    append-icon="mdi-close-circle"
                    @click:append="cleanDateBirth"
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
              :value="selectDateBirth"
              v-model="dateBirthYearOnly"
              label="L'année uniquement"
            ></v-checkbox>

            <v-text-field
              v-if="dateDeadYearOnly"
              v-model.trim="personNotice.dateDead"
              :value="addDateDead"
              :rules="dateRules"
              :min="4"
              :max="4"
              counter
              label="Date de décès"
              prepend-inner-icon="mdi-calendar"
              clearable
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
                    append-icon="mdi-close-circle"
                    @click:append="cleanDateDead"
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
              :value="selectDateDead"
              v-model="dateDeadYearOnly"
              label="L'année uniquement"
            ></v-checkbox>

            <v-select
              clearable
              :items="langues"
              v-model.trim="personNotice.langue"
              label="Langue de la personne"
            ></v-select>
            <v-select
              clearable
              :items="countries"
              v-model="personNotice.country"
              label="Pays associé à la personne"
            ></v-select>
            <v-text-field
              required
              clearable
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
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";

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

interface PersonUpdate {
  itemId: string;
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
  @Prop() readonly personNotice!: Person;
  @Prop() readonly langues!: string[];
  @Prop() readonly countries!: string[];
  valid = true;
  dateMenuDead = false;
  dateMenuBirth = false;
  dateBirthYearOnly = false;
  dateDeadYearOnly = false;
  personNoticeUpdate: PersonUpdate = {
    itemId: "",
    firstName: "",
    lastName: "",
    dateBirth: "",
    dateDead: "",
    langue: "",
    country: "",
    source: ""
  };

  formRules = [
    (v: any) => !!v || "ce champ ne doit pas être vide",
    (v: any) => (v && v.length >= 4) || "Min 4 caractères"
  ];
  dateRules = [
    (v: any) => (v && v.length == 4) || "Max 4 caractères",
    (v: any) =>
      /([1-2]([X]|[0-9])([X]|[0-9])([X]|[0-9]))/.test(v) ||
      "La date n'est pas valide"
  ];

  get formValid(): Vue & { validate: () => boolean } {
    return this.$refs.noticeForm as Vue & { validate: () => boolean };
  }
  get formReset(): Vue & { reset: () => boolean } {
    return this.$refs.noticeForm as Vue & { reset: () => boolean };
  }
  get addDateBirth() {
    if (this.personNotice.dateBirth != null) {
      if (this.personNotice.dateBirth.includes("X")) {
        const indexOfX = this.personNotice.dateBirth.lastIndexOf("X");
        for (let i = indexOfX; i < 3; i++) {
          this.personNotice.dateBirth += "X";
        }
      }
    }
    return this.personNotice.dateBirth;
  }
  get addDateDead() {
    if (this.personNotice.dateDead != null) {
      if (this.personNotice.dateDead.includes("X")) {
        const indexOfX = this.personNotice.dateDead.lastIndexOf("X");
        for (let i = indexOfX; i < 3; i++) {
          this.personNotice.dateDead += "X";
        }
      }
    }
    return this.personNotice.dateDead;
  }

  get selectDateBirth(): boolean {
    if (this.personNotice.dateBirth.length === 4) {
      this.dateBirthYearOnly = true;
    }
    return this.dateBirthYearOnly;
  }

  get selectDateDead(): boolean {
    if (this.personNotice.dateDead.length === 4) {
      this.dateDeadYearOnly = true;
    }
    return this.dateDeadYearOnly;
  }

  validate(): void {
    if (this.formValid.validate()) {
      if (typeof this.$route.params.itemId !== "undefined") {
        this.personNoticeUpdate = {
          itemId: this.$route.params.itemId,
          firstName: this.personNotice.firstName,
          lastName: this.personNotice.lastName,
          dateBirth: this.personNotice.dateBirth,
          dateDead: this.personNotice.dateDead,
          langue: this.personNotice.langue,
          country: this.personNotice.country,
          source: this.personNotice.source
        };
        this.updatePersonNoticeAction(this.personNoticeUpdate);
      } else {
        this.createNewPersonNoticeAction(this.personNotice);
      }
    }
  }

  reset(): void {
    this.formReset.reset();
  }

  @Watch("dateBirthYearOnly")
  cleanDateBirth() {
    if (!this.dateBirthYearOnly) {
      this.personNotice.dateBirth = "";
    }
  }

  @Watch("dateDeadYearOnly")
  cleanDateDead() {
    if (!this.dateDeadYearOnly){
      this.personNotice.dateDead = "";
    }
  }

  @Emit("post-personnotice-action")
  createNewPersonNoticeAction(person: Person) {
    return person;
  }

  @Emit("put-personnotice-action-update")
  updatePersonNoticeAction(person: PersonUpdate) {
    return person;
  }
}
</script>
