<template>
  <div>
    <div style="display: flex; align-items: center;">
      <span :style="avatar.style">{{ avatar.content }}</span>
      <div style="margin-left: 0.8rem;">
        <span
          style="margin-right: 0.5rem"
          class="s-120"
        >{{ authorData.name || authorData.username }}</span>
        <zi-tag> {{ authorData.type }} </zi-tag>
        <span
          :title="following ? 'Following author' : muted ? 'Muted author' : ''"
          style="margin-left: 0.5rem"
        >
          <bell-icon
            v-if="following"
            size="1.2x"
          />
          <bell-off-icon
            v-if="muted"
            size="1.2x"
          />
        </span>
      </div>
    </div>

    <div style="margin: 2rem 0rem 1rem; display: flex; justify-content: space-between; flex-wrap: wrap;">
      <zi-switcher @label-selected="selectHandler">
        <zi-switcher-item
          v-for="label in labels"
          :key="label"
          :label="label"
        />
      </zi-switcher>

      <div>
        <zi-popover
          align="right"
          @command="commandHandler"
        >
          <zi-button
            title="Actions"
            size="small"
            auto
            class="action-button"
          >
            <chevron-down-icon size="1.5x" />
          </zi-button>
          <template v-slot:dropdown>
            <zi-popover-item
              :disabled="!canRelation || muted"
              command="follow"
            >
              {{ following ? "Unfollow" : "Follow" }} author
            </zi-popover-item>
            <zi-popover-item
              :disabled="!canRelation || following"
              command="mute"
            >
              {{ muted ? "Unmuted" : "Mute" }} author
            </zi-popover-item>
          </template>
        </zi-popover>
      </div>
    </div>
  </div>
</template>

<script>

import { initialsAvatar } from "@lib/helpers"

import { isRelation, updateRelations } from "@lib/utils"

import { ChevronDownIcon, BellIcon, BellOffIcon } from "vue-feather-icons"

import { maxRelations } from "@constants"

export default {
  components: {
    ChevronDownIcon,
    BellIcon,
    BellOffIcon
  },
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
    }
  },
  data: () => ({
    following: false,
    muted: false,
    followingList: [],
    mutedList: []
  }),
  computed: {
    avatar () {
      let avatar = initialsAvatar(this.authorData.name || this.authorData.username || "??")
      avatar.style.width = "5.5rem"
      avatar.style.height = "5.5rem"
      return avatar
    },
    labels () {
      // return ["About", "Reading list", "Favorite reads", "Collection", "Recommends", "Following"]
      return ["About", "Collection"]
    },
    canRelation () {
      return this.userData.username && (this.userData.username !== this.authorData.username)
    }
  },
  async mounted () {
    if (this.canRelation) {
      let followingList = await isRelation(this.userData.username, this.authorData.username, "following", true)
      this.followingList = followingList || []

      let mutedList = await isRelation(this.userData.username, this.authorData.username, "muted", true)
      this.mutedList = mutedList || []

      this.following = followingList && followingList.length
      this.muted = mutedList && mutedList.length
    }
  },
  methods: {
    selectHandler (label) {
      this.$emit("activeView", label)
    },
    commandHandler (action) {
      switch (action) {
      case "follow":
        this.followAction()
        break
      case "mute":
        this.muteAction()
        break
      default:
      }
    },
    async followAction () {
      let newFollowingList = []
      let isFollowing = this.following
      let maxRelationsExceeded = this.followingList.length >= maxRelations

      if (isFollowing) {
        newFollowingList = this.followingList.filter((f) => f !== this.userData.username)
      } else {
        newFollowingList = [...this.followingList, this.userData.username]
      }

      if (maxRelationsExceeded) {
        this.$Toast.warning("Sorry, maximum relations exceeded.")
      } else {
        await updateRelations(newFollowingList, "following")
        this.followingList = newFollowingList
        this.following = !this.following
      }
    },
    async muteAction () {
      let newMutedList = []
      let isMuted = this.muted
      let maxRelationsExceeded = this.mutedList.length >= maxRelations

      if (isMuted) {
        newMutedList = this.mutedList.filter((f) => f !== this.userData.username)
      } else {
        newMutedList = [...this.mutedList, this.userData.username]
      }

      if (maxRelationsExceeded) {
        this.$Toast.warning("Sorry, maximum relations exceeded.")
      } else {
        await updateRelations(newMutedList, "muted")
        this.mutedList = newMutedList
        this.muted = !this.muted
      }
    }
  }
}
</script>

<style scoped>
.author-img {
  width: 4rem;
  height: 4rem;
}
</style>
