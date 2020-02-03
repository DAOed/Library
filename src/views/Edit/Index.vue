<template>
  <div class="">
    <div class="medium-container">
      <page-title title="Edit document" />

      <div>
        <div
          class="input-area"
          style="display: flex; align-items: center;"
        >
          <zi-input
            v-model="file.name"
            :disabled="loading"
            clearable
            style="margin-right: 0.35rem; width: 80%"
          />
          <zi-input
            v-model="fileExt"
            disabled
            style="margin-left: 0.35rem; width: auto"
          />
        </div>

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
            />
          </div>
        </div>

        <div
          class="input-area"
          style="display: flex; align-items: center;"
        >
          <zi-select
            v-model="file.type"
            disabled
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
            disabled
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
          class="input-area justified"
        >
          <zi-button
            auto
            :disabled="loading"
            style="width: 20%"
            type="warning"
            ghost
            @click="confirmDeleteVisible = true"
          >
            Delete
          </zi-button>
          <zi-button
            auto
            :loading="loading"
            style="width: 20%"
            @click="updateFile"
          >
            Update
          </zi-button>
        </div>
      </div>
    </div>

    <zi-dialog
      v-model="confirmDeleteVisible"
      done="Yes, delete"
      :before-done="deleteFile"
    >
      <p><b>Are you sure you want to delete this file?</b></p>
      <p>Here is what will happen:</p>

      <ul>
        <li>Neither you nor anyone will be able to view or download file</li>
        <li>This file's shared links will no longer work</li>
      </ul>
    </zi-dialog>
  </div>
</template>

<script>

import { docCategories, docTypes, docModes, maxDescriptionLength } from "@constants"

import { mapGetters } from "vuex"

import { updateFileMeta } from "@lib/utils"

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
    maxDescriptionLength,
    confirmDeleteVisible: false,
    fileExt: ""
  }),
  computed: {
    ...mapGetters([
      "editItem"
    ]),
    authorData () {
      return this.editItem.authorData
    },
    itemData () {
      return this.editItem.itemData
    }
  },
  mounted () {
    /*
    if (this.editItem.itemData) {
      this.$router.push("/")
    } else

    */
    if (this.authorData.username !== this.itemData.username) {
      this.$router.push("/")
    } else {
      let name = this.itemData.name
      let ext = name.split(".").pop()
      name = name.split(".").slice(0, -1).join(".")

      this.file = { ...this.itemData, name }
      this.fileExt = ext
    }
  },
  beforeDestroy () {
    this.$store.dispatch("editItem", {})
  },
  methods: {
    async updateFile () {
      this.loading = true
      let name = this.file.name + "." + this.fileExt

      const fileData = { ...this.file, name }

      const uri = await updateFileMeta(fileData)
      this.$router.push("/item?uri=" + uri)
    },
    async deleteFile () {

    }

  }
}
</script>

<style scoped>
.input-area {
  margin: 1.5rem 0rem;
}
</style>
