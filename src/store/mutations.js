
export default {
  userData (state, payload) {
    state.userData = payload
  },
  profileData (state, payload) {
    state.profileData = payload
  },
  docStats (state, payload) {
    state.docStats = payload
  },
  editItem (state, payload) {
    state.editItem = payload
  },
  search (state, payload) {
    state.search = payload
  },

  theme (state, payload) {
    state.theme = payload
  },
  settings (state, payload) {
    state.settings = payload
  }
}
