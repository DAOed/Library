<template>
  <div class="medium-container">
    <div class="author">
      <div class="author-inside">
        <app-loader v-if="loading" />
        <div v-else>
          <div>
            <profile-section
              :author-data="authorData"
              :user-data="userData"
              @activeView="activeView"
            />
          </div>

          <div style="border: 1px solid #fafafa; margin: 1rem 0rem;" />

          <div v-if="active === 'About'">
            <about-section :author-data="authorData" />
          </div>

          <div v-else-if="active === 'Collection'">
            <app-loader v-if="categoriesLoading" />
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
import { PRERENDER } from "@constants"

export default {
  name: "Author",
  components: {
    ProfileSection,
    AboutSection,
    CollectionSection,
    AppLoader
  },
  data: () => ({
    loading: true,
    active: "About",
    authorData: {},
    categories: [],
    categoriesLoading: true
  }),
  computed: {
    ...mapGetters([
      "profileData",
      "userData"
    ]),
    username () {
      return this.$route.query ? this.$route.query.id : null
    }
  },
  async mounted () {
    if (!PRERENDER) {
      let username = this.username
      let authorData

      if (!username) {
        this.$router.push("/")
      } else {
        if (this.profileData.username === username) {
          authorData = this.profileData
        } else {
          authorData = await getPublicFile({ username, path: "library/profile" })
          authorData = authorData ? JSON.parse(authorData) : null
        }

        if (authorData) {
          this.authorData = authorData
          // now load stats
          let docStats = await getDocStats({ username })
          this.categories = docStats.categories || []
          this.categoriesLoading = false

          this.loading = false
        } else {
          this.$Toast.warning("Sorry, nothing found for user")
          this.$router.push("/")
        }
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
