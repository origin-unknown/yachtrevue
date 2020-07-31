<template lang="html">
  <div class="templates-details">
    <v-container fluid v-if="template">
      <v-card>
        <v-card-title>
          {{ template.title }}
        </v-card-title>
        <v-card-subtitle>
          {{ template.url }}
        </v-card-subtitle>
      </v-card>

      <v-text-field label="Search" v-model="search"></v-text-field>

      <v-row dense class="mt-3">
        <v-col
          v-for="item in sortByTitle(filteredTemplateItems)"
          :key="item.id"
          cols="12"
          xl="2"
          md="3"
          sm="6"
          xs="12"
          class="d-flex"
          style="flex-direction:column"
        >
          <v-card class="flex-grow-1">
            <v-img
              :src="item.logo"
              contain
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              aspect-ratio="1"
              height="200px"
            >
              <v-card-title v-text="item.title"></v-card-title>
            </v-img>
            <v-card-text style="overflow-y: auto; height:168px">
              <!--
                Back link required!
                Perhaps display the description scrollable and add an action
                "Deploy"
                {{ item.description ? item.description : "" | truncate(200) }}
              -->
              {{ item.description }}
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text :to="{ name: 'Deploy', params: { appId: item.id } }">
                Deploy
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      search: ""
    };
  },
  computed: {
    ...mapGetters({
      getTemplateById: "templates/getTemplateById"
    }),
    template() {
      const templateId = this.$route.params.templateId;
      return this.getTemplateById(templateId);
    },
    filteredTemplateItems() {
      const templ = this.template;
      if (!templ) {
        return [];
      }
      if (this.search.length === "") {
        return this.items;
      }
      return templ.items.filter(this.filterByTitle);
    }
  },
  methods: {
    ...mapActions({
      readTemplate: "templates/readTemplate"
    }),
    sortByTitle(arr) {
      // Set slice() to avoid to generate an infinite loop!
      return arr.slice().sort(function(a, b) {
        return a.title.localeCompare(b.title);
      });
    },
    filterByTitle(item) {
      if (!("title" in item)) { return false; }
      const regex = new RegExp(this.search, "i");
      return regex.test(item.title);
      // return item.title.includes(this.search);
    }
  },
  async created() {
    const templateId = this.$route.params.templateId;
    let template = await this.readTemplate(templateId);
    console.log(template);
    // console.log(this.getTemplateById(templateId));
  }
};
</script>

<style lang="css" scoped></style>
