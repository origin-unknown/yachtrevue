<template lang="html">
  <div class="apps-form">
    <v-stepper v-model="deployStep">
      <v-stepper-header>
        <v-stepper-step step="1" :complete="deployStep > 1">
          Basics
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="2" :complete="deployStep > 2">
          Ports
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3" :complete="deployStep > 3">
          Volumes
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="4" :complete="deployStep > 4">
          Environment
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="5" :complete="deployStep > 5">
          System Controls
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="6" :complete="deployStep > 6">
          Capabilities
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <ValidationObserver ref="obs1" v-slot="{ invalid, validated }">
            <form>
              <ValidationProvider
                name="Title"
                rules="required"
                immediate
                v-slot="{ errors, valid }"
              >
                <v-text-field
                  label="Title"
                  placeholder="My Container"
                  v-model="form.title"
                  :error-messages="errors"
                  :success="valid"
                  required
                ></v-text-field>
              </ValidationProvider>
              <ValidationProvider
                name="Image"
                rules="required"
                immediate
                v-slot="{ errors, valid }"
              >
                <v-text-field
                  label="Image"
                  placeholder="image:my-image"
                  v-model="form.image"
                  :error-messages="errors"
                  :success="valid"
                  required
                ></v-text-field>
              </ValidationProvider>
              <ValidationProvider
                name="Restart Policy"
                rules="required"
                immediate
                v-slot="{ errors, valid }"
              >
                <v-select
                  :items="['always', 'on-failure', 'unless-stopped']"
                  label="Restart Policy"
                  v-model="form['restart_policy']"
                  :error-messages="errors"
                  :success="valid"
                  required
                ></v-select>
              </ValidationProvider>
            </form>
            <v-btn
              color="primary"
              @click="deployStep += 1"
              :disabled="invalid || !validated"
            >
              Continue
            </v-btn>
          </ValidationObserver>
        </v-stepper-content>

        <v-stepper-content step="2">
          <ValidationObserver ref="obs2" v-slot="{ invalid, validated }">
            <form>
              <v-row v-for="(item, index) in form.ports" :key="index">
                <v-col>
                  <ValidationProvider
                    name="Container"
                    rules=""
                    immediate
                    v-slot="{ errors, valid }"
                  >
                    <v-text-field
                      type="number"
                      label="Container"
                      placeholder="80"
                      min="0"
                      max="65535"
                      v-model="item['cport']"
                      :error-messages="errors"
                      :success="valid"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col>
                  <ValidationProvider
                    name="Host"
                    rules="required"
                    immediate
                    v-slot="{ errors, valid }"
                  >
                    <v-text-field
                      type="number"
                      label="Host"
                      placeholder="80"
                      min="0"
                      max="65535"
                      v-model="item['hport']"
                      :error-messages="errors"
                      :success="valid"
                      required
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col>
                  <ValidationProvider
                    name="Protocol"
                    rules="required"
                    immediate
                    v-slot="{ errors, valid }"
                  >
                    <v-select
                      :items="['tcp', 'udp']"
                      label="Protocol"
                      v-model="item['proto']"
                      :error-messages="errors"
                      :success="valid"
                      required
                    ></v-select>
                  </ValidationProvider>
                </v-col>
                <v-col class="d-flex justify-end" cols="1">
                  <v-btn
                    icon
                    class="align-self-center"
                    @click="removePort(index)"
                  >
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" class="d-flex justify-end">
                  <v-btn icon class="align-self-center" @click="addPort">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </form>
            <v-btn color="secondary" @click="deployStep -= 1" class="mx-2">
              Back
            </v-btn>
            <v-btn
              color="primary"
              @click="deployStep += 1"
              :disabled="invalid || !validated"
            >
              Continue
            </v-btn>
          </ValidationObserver>
        </v-stepper-content>

        <v-stepper-content step="3">
          <ValidationObserver ref="obs3" v-slot="{ invalid, validated }">
            <form>
              <v-row v-for="(item, index) in form.volumes" :key="index">
                <v-col>
                  <ValidationProvider
                    name="Container"
                    rules="required"
                    immediate
                    v-slot="{ errors, valid }"
                  >
                    <v-text-field
                      label="Container"
                      placeholder="/share"
                      v-model="item['container']"
                      :error-messages="errors"
                      :success="valid"
                      required
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col>
                  <ValidationProvider
                    name="Host"
                    rules="required"
                    immediate
                    v-slot="{ errors, valid }"
                  >
                    <v-text-field
                      label="Host"
                      placeholder="/yacht/image/share"
                      v-model="item['bind']"
                      :error-messages="errors"
                      :success="valid"
                      required
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col class="d-flex justify-end" cols="1">
                  <v-btn
                    icon
                    class="align-self-center"
                    @click="removeVolume(index)"
                  >
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" class="d-flex justify-end">
                  <v-btn icon class="align-self-center" @click="addVolume">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </form>
            <v-btn color="secondary" @click="deployStep -= 1" class="mx-2">
              Back
            </v-btn>
            <v-btn
              color="primary"
              @click="deployStep += 1"
              :disabled="invalid || !validated"
            >
              Continue
            </v-btn>
          </ValidationObserver>
        </v-stepper-content>

        <v-stepper-content step="4">
          <ValidationObserver ref="obs4" v-slot="{ invalid, validated }">
            <form>
              <v-row v-for="(item, index) in form.env" :key="index">
                <v-col>
                  <ValidationProvider
                    name="Label"
                    rules="required"
                    immediate
                    v-slot="{ errors, valid }"
                  >
                    <v-text-field
                      label="Label"
                      v-model="item['label']"
                      :error-messages="errors"
                      :success="valid"
                      required
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col>
                  <ValidationProvider
                    name="Host"
                    rules="required"
                    immediate
                    v-slot="{ errors, valid }"
                  >
                    <v-text-field
                      label="Host"
                      v-model="item['default']"
                      :error-messages="errors"
                      :success="valid"
                      required
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col class="d-flex justify-end" cols="1">
                  <v-btn icon class="align-self-center" @click="removeEnv(index)">
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" class="d-flex justify-end">
                  <v-btn icon class="align-self-center" @click="addEnv">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </form>
            <v-btn color="secondary" @click="deployStep -= 1" class="mx-2">
              Back
            </v-btn>
            <v-btn
              color="primary"
              @click="deployStep += 1"
              :disabled="invalid || !validated"
            >
              Continue
            </v-btn>
          </ValidationObserver>
        </v-stepper-content>

        <v-stepper-content step="5">
          <ValidationObserver ref="obs5" v-slot="{ invalid, validated }">
            <form>
              <v-row v-for="(item, index) in form.sysctls" :key="index">
                <v-col>
                  <ValidationProvider
                    name="Name"
                    rules="required"
                    immediate
                    v-slot="{ errors, valid }"
                  >
                    <v-text-field
                      label="Name"
                      v-model="item['name']"
                      :error-messages="errors"
                      :success="valid"
                      required
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col>
                  <ValidationProvider
                    name="Value"
                    rules="required"
                    immediate
                    v-slot="{ errors, valid }"
                  >
                    <v-text-field
                      label="Value"
                      v-model="item['value']"
                      :error-messages="errors"
                      :success="valid"
                      required
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col class="d-flex justify-end" cols="1">
                  <v-btn icon class="align-self-center" @click="removeSysctl(index)">
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" class="d-flex justify-end">
                  <v-btn icon class="align-self-center" @click="addSysctl">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </form>
            <v-btn color="secondary" @click="deployStep -= 1" class="mx-2">
              Back
            </v-btn>
            <v-btn
              color="primary"
              @click="deployStep += 1"
              :disabled="invalid || !validated"
            >
              Continue
            </v-btn>
          </ValidationObserver>
        </v-stepper-content>

        <v-stepper-content step="6">
          <ValidationObserver ref="obs6" v-slot="{ invalid, validated }">
            <form>
              <v-row>
                <v-col>
                  <ValidationProvider
                    name="Capabilities"
                    rules=""
                    immediate
                    v-slot="{ errors, valid }"
                  >
                    <v-combobox
                      :error-messages="errors"
                      :success="valid"
                      v-model="form.cap_add"
                      :items="optional_caps"
                      label="Capabilities"
                      multiple
                      hide-selected
                      clearable
                      small-chips
                    ></v-combobox>
                  </ValidationProvider>
                </v-col>
              </v-row>
            </form>
            <v-btn color="secondary" @click="deployStep -= 1" class="mx-2">
              Back
            </v-btn>
            <v-btn
              color="primary"
              @click="nextStep(6)"
              :disabled="invalid || !validated"
            >
              Submit
            </v-btn>
          </ValidationObserver>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
import axios from "axios";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      deployStep: 1,
      deploySteps: 6,
      optional_caps: [
        "SYS_MODULE",
        "SYS_RAWIO",
        "SYS_PACCT",
        "SYS_ADMIN",
        "SYS_NICE",
        "SYS_RESOURCE",
        "SYS_TIME",
        "SYS_TTY_CONFIG",
        "AUDIT_CONTROL",
        "MAC_ADMIN",
        "MAC_OVERRIDE",
        "NET_ADMIN",
        "SYSLOG",
        "DAC_READ_SEARCH",
        "LINUX_IMMUTABLE",
        "NET_BROADCAST",
        "IPC_LOCK",
        "IPC_OWNER",
        "SYS_PTRACE",
        "SYS_BOOT",
        "LEASE",
        "WAKE_ALARM",
        "BLOCK_SUSPEND"
      ],

      form: {
        title: "", // "My Container",
        image: "", // "image:my-image",
        restart_policy: "unless-stopped",
        ports: [
          // {
          //   cport: "80",
          //   hport: "80",
          //   proto: "tcp"
          // }
        ],
        volumes: [
          // {
          //   container: "/share",
          //   bind: "/yacht/image/share"
          // }
        ],
        env: [
          // {
          //   label: "JAVA_OPTS",
          //   default: "-IDK WHAT THE HELL",
          //   name: "" // unused, fixes error
          // }
        ],
        sysctls: [
          // {
          //   name: "name",
          //   value: "value"
          // }
        ],
        cap_add: []
      }
    };
  },
  computed: {
    ...mapGetters({
      getAppById: "apps/getAppById"
    }),
  },
  methods: {
    ...mapActions({
      readApp: "apps/readApp"
    }),
    addPort() {
      this.form.ports.push({ cport: "", hport: "", proto: "tcp" });
    },
    removePort(index) {
      this.form.ports.splice(index, 1);
    },
    addVolume() {
      this.form.volumes.push({ container: "", bind: "" });
    },
    removeVolume(index) {
      this.form.volumes.splice(index, 1);
    },
    addEnv() {
      this.form.env.push({ label: "", default: "" });
    },
    removeEnv(index) {
      this.form.env.splice(index, 1);
    },
    addSysctl() {
      this.form.sysctls.push({ name: "", value: "" });
    },
    removeSysctl(index) {
      this.form.sysctls.splice(index, 1);
    },
    nextStep(n) {
      if (n === this.deploySteps) {
        console.log(this.form.cap_add);
        // this.deployStep = 1;
        this.submitFormData();
      } else {
        this.deployStep = n + 1;
      }
    },
    submitFormData() {
      const payload = { ...this.form };
      payload.ports.map(port => {
        if (port.cport === "") { port.cport = null; }
        return port;
      });

      console.log("submit", payload);
      const appId = this.$route.params.appId;
      const url = `/api/apps/${appId}/deploy`;
      axios.post(url, payload).then(response => {
        console.log(response);
        this.deployStep = 1;
      });
    },
    async populateForm() {
      const appId = this.$route.params.appId;
      try {
        const app = await this.readApp(appId);
        this.form = {
          title: app.title || "",
          image: app.image || "",
          restart_policy: app.restart_policy || "",
          ports: app.ports || [],
          volumes: app.volumes || [],
          env: app.env || [],
          sysctls: app.sysctls || [],
          cap_add: app.cap_add || []
        };
      } catch(error) {
        console.error(error, error.response);
      }
    }
  },
  async created() {
    await this.populateForm();
  }
};
</script>

<style lang="css" scoped></style>
