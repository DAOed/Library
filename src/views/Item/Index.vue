<template>
  <div class="container">
    <div class="item">
      <div class="item-inside">
        <app-loader v-if="loading" />
        <div
          v-else
          class="dual-grid"
        >
          <div class="dual-grid-two">
            <content-section
              :author-data="authorData"
              :item-data="itemData"
              :can-edit="canEdit"
            />
          </div>
          <div
            class="dual-grid-one"
            style="margin-left: 2rem; margin-right: 0"
          >
            <aside-section
              :author-data="authorData"
              :item-data="itemData"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AsideSection from "./Aside"
import ContentSection from "./Content"

import appLoader from "@components/loader"

import { getPublicFile, getFileMeta } from "@lib/utils"
import { PRERENDER } from "@constants"

import { mapGetters } from "vuex"

export default {
  name: "Item",
  components: {
    AsideSection,
    ContentSection,
    appLoader
  },
  data: () => ({
    itemData: {},
    loading: true,
    authorData: {}
  }),
  computed: {
    ...mapGetters([
      "profileData"
    ]),
    canEdit () {
      return this.profileData.username === this.authorData.username
    }
  },
  async mounted () {
    if (!PRERENDER) {
      let urlData = this.$route.query ? this.$route.query.uri : null

      if (!urlData) {
        this.$Toast.warning("Sorry, invalid permalink")
        this.$router.push("/")
      } else {
        try {
          urlData = window.atob(urlData)
          if (!urlData) this.$router.push("/")

          const parts = urlData.split("/")
          const username = parts[0]
          const category = parts[1]
          const key = parts[2]

          // first load item meta data
          const itemData = await getFileMeta({ username, category, key })
          this.itemData = itemData
          document.title = itemData.name + " - DAOed Library"
          // console.log("itemData", itemData)

          // now load author data
          let authorData
          if (this.profileData.username === username) {
            authorData = this.profileData
          } else {
            authorData = await getPublicFile({ username, path: "library/profile" })
            authorData = JSON.parse(authorData || "{}")
          }
          this.authorData = authorData
          // console.log("authorData", authorData)

          this.loading = false
        } catch (err) {
          console.log(err)
          this.$Toast.warning("Sorry, could not decode item permalink")
          this.$router.push("/")
        }
      }
    }
  }
}
</script>

<style scoped>
.item {
  min-height: 60vh;
}
.item-inside {
  width: 100%;
}
</style>
