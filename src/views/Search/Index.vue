<template>
  <div class="container">
    <div class="search">
      <div class="search-inside">
        <div class="dual-grid">
          <div class="dual-grid-one">
            <page-aside />
          </div>
          <div class="dual-grid-two">
            <div>
              <page-title :title="title" />
            </div>

            <div>
              <search-component
                :loading="loading"
                @search="search"
              />
            </div>

            <div>
              <page-loader v-if="loading" />

              <users-section
                v-else
                :accounts="accounts"
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
import UsersSection from "@components/users"
import SearchComponent from "@components/search"
import pageLoader from "@components/loader"

import { searchAccount } from "@lib/blockstack"
import { schemeAccounts } from "@lib/utils"

export default {
  name: "Collection",
  components: {
    pageAside,
    pageTitle,
    UsersSection,
    SearchComponent,
    pageLoader
  },
  data: () => ({
    title: "Search",
    accounts: [],
    loading: false
  }),
  methods: {
    async search (query) {
      if (query) {
        this.loading = true
        this.$store.dispatch("search", query)

        let data = await searchAccount(query)
        data = data.results || []

        this.accounts = schemeAccounts(data)
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.search {
  min-height: 60vh;
}
.search-inside {
  width: 100%;
}
.mesh-icon {
  width: 30rem;
  height: 30rem;
}
</style>
