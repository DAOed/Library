<template>
  <div>
    <div style="display: flex; align-items: center;">
      <span :style="avatar.style">{{ avatar.content }}</span>
      <router-link
        :to="'/author?id=' + authorData.username"
        style="margin-left: 0.8rem; color: inherit;"
        class="s-120"
      >
        @{{ authorData.username.split('.')[0] }}
      </router-link>
    </div>

    <div
      style="margin-top: 0.5rem"
      class="s-90"
    >
      <div v-if="authorData.bio">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="getHTML(authorData.bio)" />
      </div>
    </div>

    <div style="border: 1px #fafafa solid; margin: 1rem 0rem;" />

    <div>
      <zi-popover @command="commandHandler">
        <zi-button
          size="small"
          style="max-width: 100%"
        >
          Save file
        </zi-button>
        <template v-slot:dropdown>
          <zi-popover-item command="download">
            Download file
          </zi-popover-item>
          <zi-popover-item disabled>
            Save as bookmark
          </zi-popover-item>
          <zi-popover-item disabled>
            Recommend read
          </zi-popover-item>
        </template>
      </zi-popover>
    </div>

    <a
      id="download"
      ref="download"
      style="display: none"
    />
  </div>
</template>

<script>
import { initialsAvatar, mdRenderer } from "@lib/helpers"

import { getPublicFile } from "@lib/utils"

export default {
  props: {
    authorData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    itemData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    avatar () {
      let avatar = initialsAvatar(this.authorData.username)
      avatar.style.width = "4.5rem"
      avatar.style.height = "4.5rem"
      return avatar
    }
  },
  methods: {
    getHTML (md) {
      return mdRenderer.render(md)
    },
    commandHandler (command) {
      switch (command) {
      case "download":
        this.downloadItem()
        break
      default:
    // code block
      }
    },
    async downloadItem () {
      this.progress += 5

      const data = this.itemData

      const download = this.$refs.download
      download.download = data.name

      this.progress += 20

      let file = await getPublicFile(data)

      this.progress += 60
      download.href = file

      download.click()

      this.progress = 0

      download.href = null
    },
    shareItem () {
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
