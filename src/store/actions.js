import { getUserBasic, saveFile } from "@lib/blockstack"

import ZeitUI from "@zeit-ui/vue"

export default {
  async userData ({ commit }, payload) {
    let newData = await getUserBasic(payload.username)
    commit("userData", { ...payload, ...newData })
  },
  profileData ({ commit }, payload) {
    commit("profileData", payload)
  },
  docStats ({ commit }, payload) {
    commit("docStats", payload)
  },
  editItem ({ commit }, payload) {
    commit("editItem", payload)
  },
  search ({ commit }, payload) {
    commit("search", payload)
  },
  async theme ({ commit, state }, payload = {}) {
    const { mode, auto } = payload
    if (auto) {
      if (mode === "dark") {
        ZeitUI.theme.enableDark()
      } else {
        ZeitUI.theme.enableLight()
      }
      commit("theme", mode)
    } else {
      let theme
      if (state.theme === "light") {
        ZeitUI.theme.enableDark()
        theme = "dark"
      } else {
        ZeitUI.theme.enableLight()
        theme = "light"
      }
      commit("theme", theme)

      if (state.settings.saveTheme) {
        await saveFile("settings", { ...state.settings, theme })
      }
    }
  },
  settings ({ commit, state }, payload) {
    let auto = payload.auto
    delete payload.auto

    if (!auto) saveFile("settings", { ...state.settings, ...payload })
    commit("settings", payload)
  }
}
