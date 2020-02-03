<template>
  <div class="">
    <div class="medium-container">
      <page-title title="New document">
        <template v-slot:extra>
          <zi-button
            v-if="!loading"
            auto
            type="abort"
            @click="reset"
          >
            Reset
          </zi-button>
        </template>
      </page-title>

      <div>
        <div
          class="input-area"
          style="display: flex; align-items: center;"
        >
          <zi-input
            v-model="file.name"
            placeholder="Document name"
            clearable
            :disabled="!file.name || loading"
            style="margin-right: 0.7rem; width: 80%"
          />
          <zi-button
            auto
            style="width: 20%"
            :disabled="loading"
            @click="selectFile"
          >
            Select
          </zi-button>
        </div>

        <div v-if="file.name">
          <div class="input-area">
            <div
              class="zi-input-group-empty"
              style="width: 100% !important;"
            >
              <textarea
                v-model="file.description"
                :disabled="loading"
                rows="10"
                :maxlength="maxDescriptionLength"
                class="zi-input"
                style="min-width: 100% !important; min-height: 10rem; margin: 0 !important;"
                placeholder="Enter document description, markdown supported"
              />
            </div>
          </div>

          <div
            class="input-area"
            style="display: flex; align-items: center;"
          >
            <zi-select
              v-model="file.type"
              :disabled="loading"
              style="margin-right: 0.35rem; width: 50%"
            >
              <zi-option
                v-for="(item, index) in docTypes"
                :key="index"
                :value="item"
              />
            </zi-select>
            <zi-select
              v-model="file.category"
              :disabled="loading"
              style="margin-left: 0.35rem; width: 50%"
            >
              <zi-option
                v-for="(item, index) in docCategories"
                :key="index"
                :value="item"
              />
            </zi-select>
          </div>

          <div
            class="input-area"
            style="display: flex; align-items: center;"
          >
            <zi-input
              v-model="file.tags"
              :disabled="loading"
              placeholder="5 tags max separated by commas"
              clearable
              style="margin-right: 0.35rem; width: 60%"
            />
            <zi-select
              v-model="file.mode"
              :disabled="loading"
              style="margin-left: 0.35rem; width: 40%"
            >
              <zi-option
                v-for="(item, index) in docModes"
                :key="index"
                :value="item"
              />
            </zi-select>
          </div>

          <div
            class="input-area"
            style="display: flex; align-items: center;"
          >
            <div
              style="width: 80%"
            />
            <zi-button
              auto
              :loading="loading"
              style="width: 20%"
              @click="publishFile"
            >
              Publish
            </zi-button>
          </div>
        </div>
      </div>

      <div class="s-70">
        Tips:
        <i>
          Supported document types include: {{ supportedExt.join(', ') }}.

          Also note that maximum supported document size is {{ getBytes(supportedFileSize) }}.

          <router-link to="/faqs"> Learn more</router-link>.
        </i>
      </div>
    </div>
    <input
      ref="input"
      type="file"
      style="display:none"
      @change="handleFileUpload()"
    >
  </div>
</template>

<script>

import { maxFileSize, supportedFileExt, docCategories, docTypes, docModes, maxDescriptionLength } from "@constants"

import { formatBytes, validFileType, validFileSize, newFile, readLocalFile } from "@lib/utils"

import PageTitle from "@components/title"

export default {
  components: {
    PageTitle
  },
  data: () => ({
    progress: 0,
    loading: false,
    docCategories,
    docTypes,
    docModes,
    file: {
      name: "",
      description: "",
      tags: "",
      type: docTypes[0],
      mode: docModes[0],
      category: docCategories[0]
    },
    fileContent: null,
    maxDescriptionLength,
    fileExt: ""
  }),
  computed: {
    supportedExt () {
      return supportedFileExt
    },
    supportedFileSize () {
      return maxFileSize
    }
  },
  methods: {
    getBytes (bytes) {
      return formatBytes(bytes)
    },
    selectFile () {
      const input = this.$refs.input
      input.click()
    },
    async handleFileUpload () {
      const file = this.$refs.input.files[0]

      if (!file) return

      const validSize = validFileSize(file)
      if (!validSize) {
        this.$Toast.warning(`File size must not exceed ${formatBytes(file.size)}`)
        return false
      }

      const validType = validFileType(file)
      if (!validType) {
        this.$Toast.show({
          type: "warning",
          action: "More info",
          text: "Sorry, file type not supported",
          handler: () => this.$router.push("/faqs")
        })
        return false
      }

      const fileContent = await readLocalFile(file)

      this.file.size = file.size
      this.fileContent = fileContent
      this.file.modified = new Date()

      // this one last so fields are shown only after FILE CONTENT is read
      this.file.name = file.name.split(".").slice(0, -1).join(".")

      let ext = file.name.split(".").pop()
      this.fileExt = ext
    },
    async publishFile () {
      this.loading = true

      const username = this.$store.getters.userData.username
      const name = this.file.name + "." + this.fileExt
      const fileData = { ...this.file, username, name }

      const uri = await newFile(fileData, this.fileContent)
      this.$router.push("/item?uri=" + uri)
    },
    reset () {
      this.file.name = ""
    }
  }
}
</script>

<style scoped>
.input-area {
  margin: 1.5rem 0rem;
}
</style>
