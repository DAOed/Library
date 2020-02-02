<template>
  <div>
    <div
      v-for="(item, index) in categories"
      :key="index"
      style="margin-bottom: 1rem"
    >
      <zi-card hoverable>
        <div class="justified">
          <p> {{ `${item.name} (${item.value})` }} </p>

          <zi-button
            auto
            @click="openCategory(item)"
          >
            Explore
          </zi-button>
        </div>
      </zi-card>
    </div>
  </div>
</template>

<script>
import { capitalize } from "@lib/helpers"

export default {
  props: {
    author: {
      type: String,
      default: ""
    },
    collection: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  computed: {
    categories () {
      let categories = this.collection
      let keys = Object.keys(categories || {})

      return keys.map((name) => ({ name: capitalize(name), value: categories[name] }))
    }
  },
  methods: {
    openCategory (item) {
      this.$router.push(`/reads?author=${this.author}&category=${item.name.toLowerCase()}`)
    }
  }
}
</script>

<style scoped>
</style>
