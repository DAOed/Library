
import store from "@store"

import { PRERENDER } from "@constants"

export default (to, from, next) => {
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && (store.state.userData.username || localStorage.getItem("blockstack-session").indexOf('{"version') !== 0 ||
              PRERENDER)) next()
  else if (requiresAuth && !store.state.userData.username) next("/login")
  else next()
}
