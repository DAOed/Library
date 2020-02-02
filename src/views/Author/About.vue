<template>
  <div>
    <div
      class="justified"
      style="margin-bottom: 1rem"
    >
      <div />

      <div>
        <zi-button
          v-if="authorData.url"
          title="Website"
          size="small"
          auto
          class="action-button"
          @click="goExt(authorData.url)"
        >
          <globe-icon size="1.5x" />
        </zi-button>
        <zi-button
          v-if="authorData.git"
          title="Git URL"
          size="small"
          auto
          class="action-button"
          @click="goExt(authorData.git)"
        >
          <git-branch-icon size="1.5x" />
        </zi-button>
        <zi-button
          v-if="authorData.facebook"
          title="Facebook"
          size="small"
          auto
          class="action-button"
          @click="goExt('http://fb.me/' + authorData.facebook)"
        >
          <facebook-icon size="1.5x" />
        </zi-button>
        <zi-button
          v-if="authorData.twitter"
          title="Twitter"
          size="small"
          auto
          class="action-button"
          @click="goExt('http://twttr.com/' + authorData.twitter)"
        >
          <twitter-icon size="1.5x" />
        </zi-button>
        <zi-button
          v-if="authorData.linkedin"
          title="LinkedIn"
          size="small"
          auto
          class="action-button"
          @click="goExt(authorData.linkedin)"
        >
          <linkedin-icon size="1.5x" />
        </zi-button>
        <zi-button
          v-if="authorData.youtube"
          title="Youtube"
          size="small"
          auto
          class="action-button"
          @click="goExt(authorData.youtube)"
        >
          <youtube-icon size="1.5x" />
        </zi-button>
      </div>
    </div>

    <div v-if="authorData.bio">
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-html="getHTML(authorData.bio)" />
    </div>

    <div style="margin: 2rem 0rem">
      <zi-description title="Blockchain accounts">
        <ul>
          <li v-if="authorData.bitcoin">
            <span>Bitcoin: {{ authorData.bitcoin }}</span>
          </li>
          <li v-if="authorData.stack">
            <span>Stack: {{ authorData.stack }}</span>
          </li>
          <li v-if="authorData.eth">
            <span>Eth: {{ authorData.eth }}</span>
          </li>
          <li v-if="authorData.steem">
            <span>Steem: {{ authorData.steem }}</span>
          </li>
        </ul>
      </zi-description>
    </div>
  </div>
</template>

<script>

import { YoutubeIcon, TwitterIcon, FacebookIcon, LinkedinIcon, GlobeIcon, GitBranchIcon } from "vue-feather-icons"

import { mdRenderer } from "@lib/helpers"

export default {
  components: {
    YoutubeIcon,
    TwitterIcon,
    FacebookIcon,
    LinkedinIcon,
    GlobeIcon,
    GitBranchIcon
  },
  props: {
    authorData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  methods: {
    goExt (url) {
      window.open(url)
    },
    getHTML (md) {
      return mdRenderer.render(md)
    }
  }
}
</script>

<style scoped>
</style>
