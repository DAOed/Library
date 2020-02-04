<template>
  <div class="header">
    <div class="container">
      <div class="justified">
        <router-link to="/">
          <img
            :src="'/img/daoed-library-wordmark.png'"
            class="wordmark"
          >
        </router-link>
        <div class="menu-actions">
          <zi-popover
            :hoverable="true"
            @command="app"
          >
            <zi-button
              size="small"
              type="abort"
              auto
              title="More dapps"
            >
              <span>
                <grid-icon
                  class="icon-class"
                  size="1.5x"
                />
              </span>
            </zi-button>
            <template v-slot:dropdown>
              <zi-popover-item command="search">
                DAOed Search
              </zi-popover-item>
              <zi-popover-item command="drive">
                DAOed Drive
              </zi-popover-item>
              <zi-popover-item line />
              <zi-popover-item command="more">
                More DApps
              </zi-popover-item>
            </template>
          </zi-popover>

          <zi-button
            type="abort"
            auto
            :title="theme === 'light' ? 'Day mode' : 'Night mode '"
            @click="toggle"
          >
            <moon-icon
              v-if="theme === 'light'"
              class="icon-class"
              size="1.5x"
            />
            <sun-icon
              v-else
              class="icon-class"
              size="1.5x"
            />
          </zi-button>

          <zi-button
            type="abort"
            auto
            title="Search"
            @click="commandHandler('search')"
          >
            <search-icon
              class="icon-class"
              size="1.5x"
            />
          </zi-button>

          <zi-button
            v-if="!userData.username"
            type="abort"
            auto
            :loading="loading ? true : false"
            @click="signIn"
          >
            Log in
          </zi-button>

          <span
            v-else
            style="display: flex; align-items: center;"
          >

            <zi-button
              type="abort"
              auto
              @click="goRoute('collection')"
            >
              My collection
            </zi-button>

            <zi-button
              type="abort"
              auto
              @click="goRoute('upload')"
            >
              Upload
            </zi-button>

            <zi-popover
              align="right"
              @command="commandHandler"
            >
              <div>
                <img
                  v-if="avatar"
                  :src="avatar"
                  class="header-avatar-image"
                  @error="imgUrlAlt"
                >
                <div
                  v-else
                  class="header-avatar-image"
                >
                  <div :style="iA.style">
                    {{ iA.content }}
                  </div>
                </div>
              </div>
              <template v-slot:dropdown>
                <zi-popover-item title>{{ name }}</zi-popover-item>
                <zi-popover-item line />
                <zi-popover-item command="reads"> Reads </zi-popover-item>
                <zi-popover-item command="feed"> Feed </zi-popover-item>
                <zi-popover-item command="profile"> Profile </zi-popover-item>
                <zi-popover-item line />
                <zi-popover-item command="account"> Account </zi-popover-item>
                <zi-popover-item command="settings"> Settings </zi-popover-item>
                <zi-popover-item command="logout"> Logout </zi-popover-item>
              </template>
            </zi-popover>

          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { userSession } from "@lib/blockstack"
import { initialsAvatar } from "@lib/helpers"
import { mapGetters } from "vuex"
import { SunIcon, MoonIcon, GridIcon, SearchIcon } from "vue-feather-icons"

export default {
  components: {
    SunIcon,
    MoonIcon,
    GridIcon,
    SearchIcon
  },
  data: () => {
    return {
      isSignedIn: false,
      loading: false
    }
  },
  computed: {
    ...mapGetters([
      "userData",
      "theme"
    ]),
    avatar () {
      if (!this.userData.profile || !this.userData.profile.image) return ""

      let image = (this.userData.profile.image || []).find((img) => img.name === "avatar") || {}
      return image.contentUrl
    },
    iA () {
      if (this.avatar) return {}

      let name = this.userData.profile.name || this.userData.username
      return initialsAvatar(name)
    },
    name () {
      let name = (this.userData.profile || {}).name
      if (!name) return "@" + (this.userData.username || "").split(".")[0]

      return name.length < 20 ? name : name.substr(0, 20) + "..."
    }
  },
  methods: {
    app (name) {
      let url = ""

      switch (name) {
      case "search":
        url = "https://daoed.com"
        break
      case "drive":
        url = "https://drive.daoed.com"
        break
      case "more":
        url = "https://about.daoed.com"
        break
      default:
      }

      window.open(url)
    },
    toggle () {
      this.$store.dispatch("theme")
    },
    signIn () {
      this.loading = true
      userSession.redirectToSignIn()
    },
    signOut () {
      userSession.signUserOut(window.location.origin)
    },
    imgUrlAlt (event) {
      event.target.src = this.placeholder
    },
    commandHandler (command) {
      switch (command) {
      case "logout":
        this.signOut()
        break
      case "profile":
        if (this.$route.path.substr(1) !== "author") this.$router.push("/author?id=" + this.userData.username)
        break
      default:
        if (this.$route.path.substr(1) !== command) this.$router.push("/" + command)
      }
    },
    goRoute (route) {
      if (this.$route.path.substr(1) !== route) this.$router.push("/" + route)
    }
  }
}
</script>

<style scoped>
.header {
  margin: 1rem 0rem;
}
.wordmark {
  height: 30px;
}
.menu-actions {
  display: flex;
  align-items: center;
}
.icon-class {
  display: flex;
  align-items: center;
}
</style>

<style>
.header-avatar-image {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid #f1f1f1;
}
</style>
