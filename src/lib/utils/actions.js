import { zoneFileLookupURL } from "@constants"
import { saveFile, getFile } from "@lib/blockstack"
import { rawGetFile, filer } from "@lib/helpers"

import store from "@store"

export const loadProfile = async () => {
  let profileData

  try {
    profileData = await getFile(filer("profile"), { decrypt: false })
  } catch (err) {
    console.log(err)
  }

  if (profileData) {
    store.dispatch("profileData", JSON.parse(profileData))
  } else {
    let userData = store.getters.userData
    let profile = userData.profile || {}
    let name = profile.name || userData.username
    let username = userData.username
    let bio = profile.description || "Author has not written about themselves yet."

    await updateProfile({ name, bio, username })
  }
}

export const updateProfile = async (profile) => {
  profile.modified = new Date()
  await saveFile(filer("profile"), profile, { encrypt: false })

  store.dispatch("profileData", profile)
}

export const getPublicFile = async (meta) => {
  if (!meta.username || !meta.path) throw new Error("Invalid params object, must include username and path")

  const options = { username: meta.username, verify: false, decrypt: false, zoneFileLookupURL }
  let data

  try {
    data = await rawGetFile(filer(meta.path), options)
  } catch (err) {
    console.log(err)
  }
  return data
}

export const getCategoryIndex = async (meta) => {
  let noPrefix = meta.noPrefix
  delete meta.noPrefix

  if (!meta.username || !meta.category) throw new Error("Invalid params object, must include username and category")

  const options = { username: meta.username, verify: false, decrypt: false, zoneFileLookupURL }
  const path = `index/${meta.category}`

  const categoryIndex = await rawGetFile(noPrefix ? path : filer(path), options)

  return categoryIndex ? JSON.parse(categoryIndex) : []
}

export const updateCategoryIndex = async (meta, data) => {
  let noPrefix = meta.noPrefix
  delete meta.noPrefix

  if (!meta.category) throw new Error("Invalid params object, must include category")
  if (!data) throw new Error("Missing data")

  const path = `index/${meta.category}`

  await saveFile(noPrefix ? path : filer(path), data, { encrypt: false })
}

export const getFileMeta = async (meta) => {
  // 1) load category's index
  let index = await getCategoryIndex(meta)

  // 2) filter for meta in index with key
  return index.filter((i) => i.key === meta.key)[0]
}

export const updateFileMeta = async (meta, data) => {
  let noPrefix = meta.noPrefix
  delete meta.noPrefix

  if (!meta.category) throw new Error("Invalid params object, must include category")
  if (!data) throw new Error("Missing data")

  const path = `meta/${meta.category}`

  await saveFile(noPrefix ? path : filer(path), data, { encrypt: false })
}

export const getDocStats = async (meta) => {
  let noPrefix = meta.noPrefix
  delete meta.noPrefix

  if (!meta.username) throw new Error("Invalid params object, must include category")

  const path = "stats"
  const options = { username: meta.username, verify: false, decrypt: false, zoneFileLookupURL }

  let docStats = await rawGetFile(noPrefix ? path : filer(path), options)
  docStats = JSON.parse(docStats || "{}")

  return docStats
}

export const loadDocStats = async (noPrefix) => {
  const path = "stats"

  let docStats = await getFile(noPrefix ? path : filer(path), { decrypt: false })
  docStats = JSON.parse(docStats || "{}")

  store.dispatch("docStats", docStats)
}

export const updateDocStats = async (data) => {
  let noPrefix = data.noPrefix
  delete data.noPrefix

  const path = "stats"

  await saveFile(noPrefix ? path : filer(path), data, { encrypt: false })
}
