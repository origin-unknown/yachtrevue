import Vue from "vue";
import Vuex from "vuex";
// import axios from "axios";
import templates from "./modules/templates.js";
import apps from "./modules/apps.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  modules: {
    templates,
    apps
  }
});
