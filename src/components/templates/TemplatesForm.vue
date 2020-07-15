<template lang="html">
  <ValidationObserver ref="obs" v-slot="{ invalid, validated }">
    <v-card>
      <v-card-title>
        New Template
      </v-card-title>
      <v-card-text>
        <v-form ref="form" @submit.prevent="submit">
          <ValidationProvider
            name="Title"
            rules="required"
            v-slot="{ errors, valid }"
          >
            <!-- :rules="titleRules" -->
            <v-text-field
              label="Title"
              v-model="form.title"
              :error-messages="errors"
              :success="valid"
              required
            ></v-text-field>
          </ValidationProvider>
          <!-- :rules="urlRules" -->
          <ValidationProvider
            name="URL"
            rules="required|url"
            v-slot="{ errors, valid }"
          >
            <v-text-field
              label="URL"
              v-model="form.url"
              :error-messages="errors"
              :success="valid"
              required
            ></v-text-field>
          </ValidationProvider>
          <v-btn
            class="mr-4"
            type="submit"
            @click="submit"
            :disabled="invalid || !validated"
          >
            Submit
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </ValidationObserver>
</template>

<script>
import { mapActions } from "vuex";
import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data: () => ({
    form: {
      title: "",
      url: ""
    }
    // titleRules: [
    //   value => !!value || "Required.",
    //   value => {
    //     const valid =
    //       (value.trim() || "").length > 1 && (value.trim() || "").length < 256;
    //     return valid || "Length between 2 and 255 Characters.";
    //   }
    // ],
    // urlRules: [
    //   value => !!value || "Required.",
    //   value => {
    //     const pattern = /https?:\/\/(([a-z0-9$-_@.&+!*"'(),]+(\.[a-z0-9$-_ @.&+!*"'(),]+)*)|(\d+.\d+.\d+.\d+))(:\d+)?\/.*/i;
    //     return pattern.test(value) || "Invalid URL";
    //   }
    // ]
  }),
  methods: {
    ...mapActions({
      writeTemplate: "templates/writeTemplate"
    }),
    submit() {
      const data = { ...this.form };
      console.log("submit", data);
      this.writeTemplate(data);
      this.$router.push("/templates/");
    }
  }
};
</script>

<style lang="css" scoped></style>
