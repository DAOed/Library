<template>
  <div>
    <zi-files
      :files="files"
      @file-click="clickHandler"
    />
    <div class="aside-meta s-70 tc-gray">
      <span style="border-top: 2px #fafafa solid; padding-top: 0.5rem;" />
    </div>

    <zi-dialog
      v-model="modalVisible"
      title="Open account"
      done="Open account"
      :before-done="goAccount"
    >
      <p> Can't find a username by searching? Directly open it. </p>
      <zi-input
        v-model="username"
        size="small"
        style="width: 100%"
        placeholder="Enter full blockstack username"
      />
    </zi-dialog>
  </div>
</template>

<script>
// import { docCategories, docTypes } from "@constants"

export default {
  name: "Aside",
  data: () => ({
    modalVisible: false,
    username: ""
  }),
  computed: {

    files () {
      return [
      /*
        {
          type: "directory",
          name: "Reads",
          files: [
            {
              type: "file",
              name: "Latest"
            },
            {
              type: "file",
              name: "Feed"
            },
            {
              type: "file",
              name: "Random"
            }
          ]
        },
        {
          type: "directory",
          name: "Types",
          files: docTypes.map((type) => ({ type: "file", name: type }))
        },
        {
          type: "directory",
          name: "Categories",
          files: docCategories.map((category) => ({ type: "file", name: category }))
        },
        {
          type: "directory",
          name: "Folder",
          files: [
            {
              type: "file",
              name: "My saves"
            },
            {
              type: "file",
              name: "My uploads"
            }
          ]
        },
        */
        {
          type: "file",
          name: "Account"
        },
        {
          type: "file",
          name: "Settings"
        },
        {
          type: "file",
          name: "Search"
        },
        {
          type: "file",
          name: "Go to"
        }
      ]
    }
  },
  methods: {
    clickHandler (e) {
      let path

      switch (e.name) {
      case "Settings":
        path = "/settings"
        break
      case "Account":
        path = "/account"
        break
      case "Search":
        path = "/search"
        break
      case "Go to":
        this.modalVisible = true
        break
      default:
      // code block
      }

      if (path && this.$route.path !== path) this.$router.push(path)
    },
    goAccount () {
      this.modalVisible = false

      if (this.username && this.$router.path !== "/author") {
        this.$router.push(`/author?id=${this.username}`)
      }
    }
  }
}
</script>
