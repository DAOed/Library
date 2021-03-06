<template>
  <div class="medium-container">
    <div class="author">
      <div class="author-inside">
        <app-loader v-if="loading" />
        <div v-else>
          <div
            v-if="userNotFound"
            style="margin: 2rem"
          >
            <zi-note
              label="404"
              type="secondary"
            >
              <div style="margin: 2rem 0rem">
                <div class="s-140">
                  Sorry, user has not yet created their profile.
                </div>
                <div
                  class="justified"
                  style="margin: 2rem 0rem"
                >
                  <div class="s-80">
                    Please check back later or
                  </div>

                  <zi-button
                    auto
                    @click="goSearch"
                  >
                    <span> Try search </span>
                  </zi-button>
                </div>
              </div>
            </zi-note>
          </div>

          <div v-else>
            <div>
              <profile-section
                :author-data="authorData"
                :user-data="userData"
                :tab="tab"
                :following-list="followingList"
                :muted-list="mutedList"
                @activeView="activeView"
                @setFollowingList="setFollowingList"
                @setMutedList="setMutedList"
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

            <div v-else-if="active === 'Following' || active === 'Muted'">
              <app-loader v-if="peopleLoading" />
              <people-section
                v-else
                :author-data="authorData"
                :user-data="userData"
                :tab="active"
                :author="username"
                :following-list="followingList"
                :muted-list="mutedList"
                @setFollowingList="setFollowingList"
                @setMutedList="setMutedList"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { getPublicFile, getDocStats, loadRelations } from "@lib/utils"

import ProfileSection from "./Profile"
import AboutSection from "./About"
import PeopleSection from "./People"

import AppLoader from "@components/loader"
import CollectionSection from "@components/collection"

import { mapGetters } from "vuex"
import { PRERENDER } from "@constants"

export default {
  name: "Author",
  components: {
    ProfileSection,
    AboutSection,
    PeopleSection,
    CollectionSection,
    AppLoader
  },
  data: () => ({
    loading: true,
    active: "About",
    authorData: {},
    categories: [],
    categoriesLoading: true,
    peopleLoading: false,
    tab: "About",
    userNotFound: false,
    followingList: [],
    mutedList: []
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

          const tab = this.$route.query ? this.$route.query.tab : null
          if (tab) {
            this.tab = tab
            this.active = tab
          }

          this.loading = false

          this.followingList = await loadRelations(this.authorData.username, "following") || []
          this.mutedList = await loadRelations(this.authorData.username, "muted") || []

          this.peopleLoading = false
        } else {
          this.loading = false
          this.userNotFound = true
        }
      }
    }
  },
  methods: {
    activeView (view) {
      this.active = view
    },
    goSearch () {
      this.$router.push("/search")
    },
    setFollowingList (d) {
      if (this.userData.username === this.authorData.username) this.followingList = d
    },
    setMutedList (d) {
      if (this.userData.username === this.authorData.username) this.mutedList = d
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
