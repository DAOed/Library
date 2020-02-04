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
              <search-component @search="search" />
            </div>

            <div>
              <users-section
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

import { searchAccount } from "@lib/blockstack"
import { schemeAccounts } from "@lib/utils"

export default {
  name: "Collection",
  components: {
    pageAside,
    pageTitle,
    UsersSection,
    SearchComponent
  },
  data: () => ({
    title: "Search",
    accounts: []
  }),
  methods: {
    async search (e) {
      let data = await searchAccount(e)
      data = data.results || []

      this.accounts = schemeAccounts(data)
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
