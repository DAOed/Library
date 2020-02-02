<template>
  <div class="container">
    <div class="landing">
      <div class="landing-inside">
        <h1>DAOed Library</h1>
        <div class="w-700 s-150">
          Decentralized collection of documents
        </div>
        <div class="features-div">
          <span class="feature-item">
            <check-circle-icon
              size="1.5x"
            />
            <span class="feature-item-message">
              Free to publish; free to access.
            </span>
          </span>
        </div>
      </div>
      <div>
        <div class="try-area">
          <div>
            <zi-description title="Quick start">
              <div class="justified">
                <span> Check out our collection: </span>
                <router-link to="/author?id=daoedcom.id.blockstack">
                  <zi-tag> daoedcom.id.blockstack </zi-tag>
                </router-link>
              </div>
            </zi-description>
          </div>
          <div style="margin: 1rem 0rem">
            <span class="s-150 w-500">OR</span>
          </div>
          <div
            class="input-area"
            style="display: flex; align-items: center;"
          >
            <zi-input
              v-model="author"
              placeholder="Enter full Blockstack username"
              clearable
              style="margin-right: 0.7rem; width: 70%"
            />
            <zi-button
              auto
              style="width: 30%"
              class="action-button"
              @click="goAuthor"
            >
              <span style="margin-right: 0.4rem">See collection</span>

              <arrow-right-icon
                size="1.5x"
              />
            </zi-button>
          </div>
        </div>
        <span class="s-60 tc-gray">*No account or login needed to explore or download files</span>
      </div>
    </div>
  </div>
</template>

<script>
import { CheckCircleIcon, ArrowRightIcon } from "vue-feather-icons"

import { mapGetters } from "vuex"

export default {
  name: "Landing",
  components: {
    CheckCircleIcon,
    ArrowRightIcon
  },
  data: () => ({
    author: ""
  }),
  computed: {
    ...mapGetters([
      "userData"
    ])
  },
  created () {
    if (this.userData.username) this.$router.push("/collection")
  },
  methods: {
    goAuthor () {
      if (this.author) { this.$router.push(`/author?id=${this.author}`) }
    }
  }
}
</script>

<style scoped>
.landing {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
}
.landing-inside {
  width: 100%;
}
.features-div {
  margin: 1rem 0rem;
}
.feature-item {
  display: inline-flex;
  align-items: center;
  margin-right: 0.5rem;
}
.feature-item-message {
  margin: 0rem 0.3rem;
}
.try-area {
  width: 30rem;
}
@media only screen and (max-width: 800px) {
  .landing {
    flex-wrap: wrap;
  }
}
</style>
