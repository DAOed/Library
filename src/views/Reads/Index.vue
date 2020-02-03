<template>
  <div class="container">
    <div class="reads">
      <div class="reads-inside">
        <div class="dual-grid">
          <div class="dual-grid-one">
            <page-aside />
          </div>
          <div class="dual-grid-two">
            <div>
              <page-title :title="title" />
            </div>

            <!--
            <div>
              <page-search />
            </div>
          -->

            <div>
              <page-loader v-if="!indexData.length" />
              <page-items
                v-else
                :index-data="indexData"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pageAside from "@components/aside"
// import pageSearch from "@components/search"
import pageItems from "@components/items"
import pageTitle from "@components/title"
import pageLoader from "@components/loader"

import { getCategoryIndex } from "@lib/utils"
import { capitalize } from "@lib/helpers"
import { PRERENDER } from "@constants"

export default {
  name: "Reads",
  components: {
    pageAside,
    pageItems,
    // pageSearch,
    pageTitle,
    pageLoader
  },
  data: () => ({
    title: "",
    indexData: []
  }),
  async mounted () {
    if (!PRERENDER) {
      let username = this.$route.query.author
      let category = this.$route.query.category

      if (!username || !category) {
        this.$router.push("/")
      } else {
        this.title = capitalize(category) + " reads"

        let meta = { username, category }
        let index = await getCategoryIndex(meta)
        this.indexData = index
      }
    }
  }
}
</script>

<style scoped>
.reads {
  min-height: 60vh;
}
.reads-inside {
  width: 100%;
}
.mesh-icon {
  width: 30rem;
  height: 30rem;
}
</style>
