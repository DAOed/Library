<template>
  <div>
    <div class="justified">
      <page-title :title="itemData.name">
        <template v-slot:extra>
          <div>
            <zi-popover
              align="right"
              @command="commandHandler"
            >
              <zi-button
                size="small"
                auto
                title="New file"
                class="action-button"
              >
                <share-2-icon
                  size="1.2x"
                />
                <span style="margin-left: 0.2rem">Share</span>
              </zi-button>
              <template v-slot:dropdown>
                <zi-popover-item command="facebook">
                  Facebook
                </zi-popover-item>
                <zi-popover-item command="twitter">
                  Twitter
                </zi-popover-item>
                <zi-popover-item command="linkedin">
                  LinkedIn
                </zi-popover-item>
                <zi-popover-item command="reddit">
                  Reddit
                </zi-popover-item>
                <zi-popover-item command="hackernews">
                  Hacker News
                </zi-popover-item>
                <zi-popover-item command="telegram">
                  Telegram
                </zi-popover-item>
                <!--
                <zi-popover-item command="skype">
                  Skype
                </zi-popover-item>
                <zi-popover-item command="weibo">
                  Weibo
                </zi-popover-item>
                <zi-popover-item command="vk">
                  VK
                </zi-popover-item>
                <zi-popover-item line />
                <zi-popover-item command="email">
                  Email
                </zi-popover-item>
                <zi-popover-item
                  command="steem"
                  disabled
                >
                  Steem
                </zi-popover-item>
              -->
              </template>
            </zi-popover>
          </div>
        </template>
      </page-title>
    </div>

    <div>
      <div v-if="itemData.description">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="getHTML(itemData.description)" />
      </div>
      <div v-else>
        Sorry, document does not have include any description.
      </div>
    </div>

    <div
      v-if="authorData.donation"
      style="margin: 2rem 0rem"
    >
      <zi-description title="Support author">
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
import pageTitle from "@components/title"

import { Share2Icon } from "vue-feather-icons"

import { mdRenderer } from "@lib/helpers"

export default {
  components: {
    pageTitle,
    Share2Icon
  },
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
  methods: {
    getHTML (md) {
      return mdRenderer.render(md)
    },
    commandHandler (command) {
      let shareLink
      let url = window.location.href
      let title = this.itemData.name + " - DAOed Library"

      // https://github.com/bradvin/social-share-urls

      switch (command) {
      case "facebook":
        shareLink = `https://www.facebook.com/sharer.php?u=${url}`
        break
      case "twitter":
        shareLink = `https://twitter.com/intent/tweet?url=${url}&text=${title}&via=daoed_com&hashtags=blockstack,bitcoin,blockchain,daoed`
        break
      case "linkedin":
        shareLink = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`
        break
      case "reddit":
        shareLink = `https://reddit.com/submit?url=${url}&title=${title}`
        break
      case "telegram":
        shareLink = `https://t.me/share/url?url=${url}&text=${title}`
        break
      case "hackernews":
        shareLink = `https://news.ycombinator.com/submitlink?u=${url}&t=${title}`
        break
      default:
    // code block
      }
      window.open(shareLink)
    }
  }
}
</script>

<style scoped>
</style>
