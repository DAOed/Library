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
        <zi-popover align="right">
          <zi-button
            title="Actions"
            size="small"
            auto
            class="action-button"
          >
            <chevron-down-icon size="1.5x" />
          </zi-button>
          <template v-slot:dropdown>
            <zi-popover-item disabled>
              Follow author
            </zi-popover-item>
            <zi-popover-item disabled>
              Mute author
            </zi-popover-item>
          </template>
        </zi-popover>
      </div>
    </div>
  </div>
</template>

<script>

import { initialsAvatar } from "@lib/helpers"

import { ChevronDownIcon } from "vue-feather-icons"

export default {
  components: {
    ChevronDownIcon
  },
  props: {
    authorData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    avatar () {
      let avatar = initialsAvatar(this.authorData.name || this.authorData.username)
      avatar.style.width = "5.5rem"
      avatar.style.height = "5.5rem"
      return avatar
    },
    labels () {
      // return ["About", "Reading list", "Favorite reads", "Collection", "Recommends", "Following"]
      return ["About", "Collection"]
    }
  },
  methods: {
    selectHandler (label) {
      this.$emit("activeView", label)
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
