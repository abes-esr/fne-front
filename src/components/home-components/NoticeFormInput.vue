<template>
  <v-container fluid>
    <v-card elevation="12">
      <v-row class="text-center">
        <v-col cols="12">
          <v-form class="pa-10" ref="noticeForm" v-model="valid" lazy-validation>
            <v-text-field
              v-for="zone in listOfZone"
              :key="zone.zoneName"
              v-model="zone.zoneValue"
              :rules="formRules"
              :min="3"
              counter
              :label="zone.zoneName"
              required
            ></v-text-field>
            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="validate"
            >
              Valider
            </v-btn>
            <v-btn color="error" @click="reset">
              Reset Form
            </v-btn>
          </v-form>
<!--          <div>-->
<!--            <pre>{{ listOfZone }}</pre>-->
<!--          </div>-->
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

interface Zone {
  zoneName: string;
  zonePlaceHolder: string;
  zoneValue: string ;
}

@Component
export default class NoticeFormInput extends Vue {
  valid = true;
  formRules = [
    (v: any) => !!v || "Name is required",
    (v: any) => (v && v.length >= 3) || "Name must be more than 3 characters"
  ];
  listOfZone: Zone[] = [
    {
      zoneName: "Nom",
      zonePlaceHolder: "200$a",
      zoneValue: ""
    },
    {
      zoneName: "Prénom",
      zonePlaceHolder: "200$b",
      zoneValue: ""
    },
    {
      zoneName: "Date de naissance",
      zonePlaceHolder: "103$a",
      zoneValue: ""
    },
    {
      zoneName: "Date de décès",
      zonePlaceHolder: "103$b",
      zoneValue: ""
    },
    {
      zoneName: "Langue",
      zonePlaceHolder: "101$a",
      zoneValue: ""
    },
    {
      zoneName: "Pays",
      zonePlaceHolder: "102$a",
      zoneValue: ""
    },
    {
      zoneName: "Source",
      zonePlaceHolder: "810$a",
      zoneValue: ""
    }
  ];

  get formValid(): Vue & { validate: () => boolean } {
    return this.$refs.noticeForm as Vue & { validate: () => boolean };
  }

  get formReset(): Vue & { reset: () => boolean } {
    return this.$refs.noticeForm as Vue & { reset: () => boolean };
  }

  validate(): void {
    if (this.formValid.validate()) {
      console.log(this.listOfZone);
    }
  }

  reset(): void {
    this.formReset.reset();
  }
}
</script>
