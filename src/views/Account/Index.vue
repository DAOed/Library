<template>
  <div class="">
    <div class="medium-container">
      <page-title title="Update profile">
        <template v-slot:extra>
          <zi-button
            auto
            type="abort"
          >
            Reset
          </zi-button>
        </template>
      </page-title>

      <div>
        <div
          class="input-area"
          style="display: flex; align-items: center;"
        >
          <zi-input
            v-model="account.name"
            placeholder="Enter display name"
            clearable
            style="margin-right: 0.35rem; width: 60%"
            :disabled="loading"
          />
          <zi-select
            v-model="account.type"
            :disabled="loading"
            style="margin-left: 0.35rem; width: 40%"
          >
            <zi-option
              v-for="(item, index) in accountTypes"
              :key="index"
              :value="item"
            />
          </zi-select>
        </div>

        <div class="input-area">
          <div
            class="zi-input-group-empty"
            style="width: 100% !important;"
          >
            <textarea
              v-model="account.bio"
              :maxlength="maxDescriptionLength"
              rows="10"
              class="zi-input"
              style="min-width: 100% !important; min-height: 10rem; margin: 0 !important;"
              placeholder="Describe yourself in text or markdown"
              :disabled="loading"
            />
          </div>
        </div>

        <div
          class="input-area"
          style="display: flex; align-items: center;"
        >
          <zi-input
            v-model="account.url"
            placeholder="Website"
            clearable
            style="width: 50%; margin-right: 0.35rem;"
            :disabled="loading"
          />
          <zi-input
            v-model="account.git"
            placeholder="Git URL"
            clearable
            style="width: 50%; margin-left: 0.35rem;"
            :disabled="loading"
          />
        </div>

        <div class="section-title">
          <zi-tag> Social accounts</zi-tag>
        </div>

        <div
          class="input-area"
          style="display: flex; align-items: center;"
        >
          <zi-input
            v-model="account.facebook"
            prefix-label="Facebook username"
            placeholder=""
            clearable
            style="width: 50%; margin-right: 0.35rem;"
            :disabled="loading"
          />
          <zi-input
            v-model="account.twitter"
            prefix-label="Twitter username"
            placeholder=""
            clearable
            style="width: 50%; margin-left: 0.35rem;"
            :disabled="loading"
          />
        </div>

        <div
          class="input-area"
          style="display: flex; align-items: center;"
        >
          <zi-input
            v-model="account.linkedin"
            prefix-label="LinkedIn URL"
            placeholder=""
            clearable
            style="width: 50%; margin-right: 0.35rem;"
            :disabled="loading"
          />
          <zi-input
            v-model="account.youtube"
            prefix-label="Youtube URL"
            placeholder=""
            clearable
            style="width: 50%; margin-left: 0.35rem;"
            :disabled="loading"
          />
        </div>

        <div class="section-title">
          <zi-tag> Blockchain accounts</zi-tag>
        </div>

        <div
          class="input-area"
          style="display: flex; align-items: center;"
        >
          <zi-input
            v-model="account.bitcoin"
            prefix-label="Bitcoin address"
            placeholder=""
            clearable
            style="width: 100%"
            :disabled="loading"
          />
        </div>

        <div
          class="input-area"
          style="display: flex; align-items: center;"
        >
          <zi-input
            v-model="account.stack"
            prefix-label="Stack address"
            placeholder=""
            clearable
            style="width: 100%"
            :disabled="loading"
          />
        </div>

        <div
          class="input-area"
          style="display: flex; align-items: center;"
        >
          <zi-input
            v-model="account.eth"
            prefix-label="Eth address"
            placeholder=""
            clearable
            style="width: 100%"
            :disabled="loading"
          />
        </div>

        <div
          class="input-area"
          style="display: flex; align-items: center;"
        >
          <zi-input
            v-model="account.steem"
            prefix-label="Steem username"
            placeholder=""
            clearable
            style="width: 100%"
            :disabled="loading"
          />
        </div>

        <div
          class="input-area"
          style="display: flex; align-items: center;"
        >
          <div style="width: 80%">
            <zi-checkbox
              v-model="account.donation"
              :disabled="loading"
            >
              Accept donation on documents
            </zi-checkbox>
          </div>
          <zi-button
            auto
            style="width: 20%"
            :loading="loading"
            @click="updateAccount"
          >
            Update
          </zi-button>
        </div>
      </div>

      <div class="s-70">
        Tips:
        <i>
          Be sure to enter the right Blockchain account details.

          Also note that maximum supported author bio {{ maxDescriptionLength }} characters.

          <router-link to="/faqs"> Learn more</router-link>.
        </i>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from "vuex"
import { accountTypes, maxDescriptionLength } from "@constants"
import { updateProfile } from "@lib/utils"

import PageTitle from "@components/title"

export default {
  components: {
    PageTitle
  },
  data: () => ({
    loading: false,
    //
    accountTypes,

    account: {
      type: accountTypes[0]
      /*
      name,
      bio,
      url,
      git,

      facebook,
      twitter,
      linkedin,
      youtube,

      bitcoin,
      stack,
      eth,
      steem
      */
    },
    maxDescriptionLength
  }),
  computed: {
    ...mapGetters([
      "profileData",
      "userData"
    ])
  },
  created () {
    if (this.profileData.type) this.account = this.profileData
  },
  methods: {
    async updateAccount () {
      this.loading = true
      this.account.username = this.userData.username
      await updateProfile(this.account)

      this.$Toast.success("Successfully updated profile")
      this.$router.push("/author?id=" + this.userData.username)
    }
  }
}
</script>

<style scoped>
.input-area {
  margin: 1.5rem 0rem;
}
.section-title {
  margin-top: 3rem;
}
</style>
