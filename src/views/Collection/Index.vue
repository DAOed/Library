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

            <div>
              <collection-section
                :collection="categories"
                :author="userData.username"
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
import pageTitle from "@components/title"
import CollectionSection from "@components/collection"

import { mapGetters } from "vuex"

export default {
  name: "Collection",
  components: {
    pageAside,
    pageTitle,
    CollectionSection
  },
  data: () => ({
    title: "Collection"
  }),
  computed: {
    ...mapGetters([
      "docStats",
      "userData"
    ]),
    categories () {
      return this.docStats.categories
    }
  },
  async mounted () {
    console.log(this.docStats, this.categories)
  },
  methods: {
    openCategory (item) {
      this.$router.push(`/reads?author=${this.userData.username}&category=${item.name.toLowerCase()}`)
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
