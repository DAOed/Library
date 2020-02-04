<template>
  <div>
    <div
      v-for="(account, index) in accounts"
      :key="index"
      style="margin-bottom: 1rem"
    >
      <zi-card hoverable>
        <div class="justified">
          <div style="display: flex; padding: 0.5rem 0rem">
            <div style="display: flex; align-items: center; margin-right: 1rem">
              <div
                v-if="account.avatar.content"
                class="header-avatar-image"
              >
                <div :style="account.avatar.style">
                  {{ account.avatar.content }}
                </div>
              </div>
              <img
                v-else
                :src="account.avatar"
                class="header-avatar-image"
                @error="imgUrlAlt"
              >
            </div>

            <div>
              <div>
                <router-link :to="`/author?id=${account.username}`">
                  <span>{{ account.name }}</span>
                  <span
                    v-if="account.name !== account.username"
                    class="s-80"
                  > ({{ account.username }}) </span>
                </router-link>
              </div>
              <div class="s-80">
                {{ account.bio }}
              </div>
            </div>
          </div>

          <zi-button
            auto
            @click="openCollection(account)"
          >
            Collection
          </zi-button>
        </div>
      </zi-card>
    </div>
  </div>
</template>

<script>
import { placeholderImg } from "@constants"

export default {
  props: {
    accounts: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    openCollection (account) {
      this.$router.push(`/author?id=${account.username}&tab=Collection`)
    },
    imgUrlAlt (event) {
      event.target.src = placeholderImg
    }
  }
}
</script>

<style scoped>
</style>
