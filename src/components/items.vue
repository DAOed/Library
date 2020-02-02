<template>
  <div class="">
    <div class="two-grid-container">
      <zi-card
        v-for="(item, index) in indexData"
        :key="index"
        hoverable
      >
        <div class="justified">
          <div />
          <div>
            <span
              v-if="item.starred"
              title="Starred"
              style="margin-right: 0.4rem"
            >
              <star-icon
                size="0.8x"
                fill="#666"
              />
            </span>

            <zi-tag>{{ ext(item.name) }}</zi-tag>
          </div>
        </div>
        <div>
          <div>
            <p title="File">
              <router-link
                style="color:inherit;"
                :to="getURI(item)"
              >
                {{ name(item.name) }}
              </router-link>
            </p>
            <div class="justified">
              <div class="s-80">
                <user-icon size="0.8x" />
                <router-link
                  style="color:inherit;"
                  :to="'/author?id=' + item.username"
                >
                  {{ item.username.split('.')[0] }}
                </router-link>
              </div>
              <div class="s-80">
                <hash-icon size="0.8x" />
                <a
                  style="color:inherit;"
                  :href="`reads?author=${item.username}&category=${item.category}`"
                >
                  {{ item.category }}
                </a>
              </div>
            </div>
          </div>

          <span
            class="s-60 tc-gray"
            :title="new Date(item.modified).toUTCString()"
          >
            <timeago
              :datetime="item.modified"
              :auto-update="60"
            />,
            {{ getBytes(item.size) }}
          </span>
        </div>
      </zi-card>
    </div>
  </div>
</template>

<script>
import { StarIcon, UserIcon, HashIcon } from "vue-feather-icons"
import { fileName, fileExt, formatBytes } from "@lib/utils"

import { removeBaseFileName } from "@lib/helpers"

export default {
  components: {
    StarIcon,
    UserIcon,
    HashIcon
  },
  props: {
    indexData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    getNewItem (newArr, oldArr) {
      for (var i = 0; i < newArr.length; i++) {
        let exists = oldArr.find((item) => item === newArr[i])
        if (!exists) return newArr[i]
      }
    },
    name (name) {
      return fileName(name)
    },
    ext (name) {
      return fileExt(name)
    },
    getBytes (bytes) {
      return formatBytes(bytes)
    },
    removeBaseFileName (path) {
      return removeBaseFileName(path)
    },
    getURI (item) {
      return "/item?uri=" + window.btoa(`${item.username}/${item.category}/${item.key}`)
    }
  }
}
</script>

<style scoped>
.grid-type-container {
  margin-bottom: 5rem;
}
</style>
