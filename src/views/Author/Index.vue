<template>
  <div class="medium-container">
    <div class="author">
      <div class="author-inside">
        <app-loader v-if="loading" />
        <div v-else>
          <div>
            <profile-section
              :author-data="authorData"
              @activeView="activeView"
            />
          </div>

          <div style="border: 1px solid #fafafa; margin: 1rem 0rem;" />

          <div v-if="active === 'About'">
            <about-section :author-data="authorData" />
          </div>

          <div v-else-if="active === 'Collection'">
            <app-loader v-if="Object.keys(categories).length === 0" />
            <collection-section
              v-else
              :collection="categories"
              :author="username"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { getPublicFile, getDocStats } from "@lib/utils"

import ProfileSection from "./Profile"
import AboutSection from "./About"

import AppLoader from "@components/loader"
import CollectionSection from "@components/collection"
import { mapGetters } from "vuex"

export default {
  name: "Author",
  components: {
    ProfileSection,
    AboutSection,
    CollectionSection,
    AppLoader
  },
  data: () => ({
    loading: false,
    active: "About",
    authorData: {},
    categories: []
  }),
  computed: {
    ...mapGetters([
      "profileData"
    ]),
    username () {
      return this.$route.query ? this.$route.query.id : null
    }
  },
  async mounted () {
    this.loading = true
    let username = this.username

    if (!username) {
      this.$router.push("/")
    } else {
      let authorData
      if (this.profileData.username === username) {
        authorData = this.profileData
      } else {
        authorData = await getPublicFile({ username, path: "library/profile" })
        authorData = authorData ? JSON.parse(authorData) : null
      }

      this.loading = false

      if (authorData) {
        this.authorData = authorData
        // now load stats
        let docStats = await getDocStats({ username })
        this.categories = docStats.categories || []
      } else {
        this.$Toast.warning("Sorry, nothing found for user")
        this.$router.push("/")
      }
    }
  },
  methods: {
    activeView (view) {
      this.active = view
    }
  }
}
</script>

<style scoped>
.author {
  min-height: 60vh;
}
.author-inside {
  width: 100%;
}
</style>
