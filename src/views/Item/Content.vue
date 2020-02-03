<template>
  <div>
    <div class="justified">
      <page-title :title="itemData.name">
        <template v-slot:extra>
          <div>
            <zi-button
              size="small"
              auto
              title="scan QR code"
              class="action-button"
              @click="qrVisible = true"
            >
              <img
                :src="'/img/qr.svg'"
                style="width: 1rem; height: 1rem;"
              >

              <span style="margin-left: 0.2rem">QR</span>
            </zi-button>

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
                <zi-popover-item line />
                <zi-popover-item command="copy">
                  Copy permalink
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

    <zi-dialog
      v-model="qrVisible"
      done="ok!"
    >
      <img
        :src="qr"
        style="width: 100%; height: 15rem;"
      >
    </zi-dialog>

    <input
      id="permalink"
      type="hidden"
      :value="permalink"
    >

    <v-styler>{{ updateClass }}</v-styler>
  </div>
</template>

<script>
import QRCode from "qrcode"
import { Share2Icon } from "vue-feather-icons"

import pageTitle from "@components/title"

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
  data: () => ({
    qrVisible: false,
    qr: "",
    updateClass: `
      .zi-dialog-footer {
        display: none !important;
      }
      .zi-dialog-wrapper {
        transform: translateY(0px) !important;
      }
    `
  }),
  computed: {
    permalink () {
      return window.location.href
    }
  },
  async mounted () {
    await this.makeQRCOde()
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
      case "copy":
        this.copyPermlink()
        break
      default:
    // code block
      }
      if (shareLink) window.open(shareLink)
    },
    copyPermlink () {
      let permalinkEl = document.querySelector("#permalink")
      permalinkEl.setAttribute("type", "text")
      permalinkEl.select()

      try {
        const permalink = document.execCommand("copy")

        if (permalink) {
          this.$Toast.success("Successfully copied permalink to clipboard")
        } else {
          this.$Toast.warning("Sorry, failed to copy to clipboard")
        }
      } catch (err) {
        console.log(err)
        this.$Toast.warning("Sorry, failed to copy to clipboard")
      }

      /* unselect the range */
      permalinkEl.setAttribute("type", "hidden")
      window.getSelection().removeAllRanges()
    },
    async makeQRCOde () {
      let url = window.location.href

      try {
        let qr = await QRCode.toDataURL(url)
        this.qr = qr
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>

<style scoped>
</style>
