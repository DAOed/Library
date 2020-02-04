<template>
  <div>
    <div
      v-for="(account, index) in accounts"
      :key="index"
      style="margin-bottom: 1rem"
    >
      <zi-card hoverable>
        <div class="justified">
          <div style="display: flex; align-items: center; padding: 0.5rem 0rem">
            <div
              class="header-avatar-image"
              style="margin-right: 0.6rem"
            >
              <div :style="account.style">
                {{ account.content }}
              </div>
            </div>
            <router-link :to="`/author?id=${account.username}`">
              <span>{{ account.username }}</span>
            </router-link>
          </div>

          <div>
            <zi-button
              auto
              style="margin-right: 0.5rem"
              @click="updateRelation(account.username, tab === 'Following' ? 'Unfollow' : 'Unmute')"
            >
              {{ tab === "Following" ? "Unfollow" : "Unmute" }}
            </zi-button>

            <zi-button
              auto
              @click="openCollection(account.username)"
            >
              Collection
            </zi-button>
          </div>
        </div>
      </zi-card>
    </div>
  </div>
</template>

<script>
import { updateRelations } from "@lib/utils"
import { initialsAvatar } from "@lib/helpers"

export default {
  props: {
    authorData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    userData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    followingList: {
      type: Array,
      default: () => {
        return []
      }
    },
    mutedList: {
      type: Array,
      default: () => {
        return []
      }
    },
    tab: {
      type: String,
      default: "About"
    }
  },
  computed: {
    accounts () {
      let data = this.tab === "Following" ? this.followingList : this.mutedList

      return data.map((username) => {
        const { content, style } = this.makeAvatar(username)

        return { username, content, style }
      })
    }
  },
  methods: {
    openCollection (account) {
      this.$router.push(`/author?id=${account.username}&tab=Collection`)
    },
    makeAvatar (username) {
      return initialsAvatar(username)
    },
    async updateRelation (username, type) {
      const isUnfollow = type === "Unfollow"
      let newPeopleList = []

      if (isUnfollow) {
        newPeopleList = this.followingList.filter((f) => f !== username)
      } else {
        newPeopleList = this.mutedList.filter((f) => f !== username)
      }

      const updateRelationType = isUnfollow ? "following" : "muted"
      const updateEventName = isUnfollow ? "setFollowingList" : "setMutedList"

      this.$emit(updateEventName, newPeopleList)
      await updateRelations(newPeopleList, updateRelationType)
    }
  }
}
</script>

<style scoped>
</style>
