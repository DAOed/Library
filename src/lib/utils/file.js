import { maxRawFiles, maxFilesPerCategory } from "@constants"
import { saveFile, getFile, deleteFile } from "@lib/blockstack"
import { listFiles, getFileUrl } from "blockstack"

import { getCategoryIndex, makeFileNameUnique, updateCategoryIndex, updateDocStats } from "@lib/utils"

import store from "@store"

export const listRawFiles = async () => {
  const files = []
  await listFiles(name => {
    files.push(name)
    return !(files.length >= maxRawFiles)
  })
  return files
}

export const listRawFilesUrl = async () => {
  const files = {}
  await listFiles(async (name) => {
    let fileUrl = await getFileUrl(name)
    files[name] = fileUrl

    return !(files.length > maxRawFiles)
  })

  return files
}

export const newFile = async (file, fileContent) => {
  // 1) update category index
  const categoryIndex = await getCategoryIndex(file)

  // verify if new item could be added
  let canAddItems = categoryIndex.length + 1 <= maxFilesPerCategory
  if (!canAddItems) throw new Error("Maximum number of item in a folder should not be more than 100.")

  // console.log("pre make unique > ", file)
  file = makeFileNameUnique(categoryIndex, [file])
  // console.log("post make unique > ", file)

  const key = file.name.replace(/[\W_]+/g, "_")
  file.key = key
  file.path = `file/${file.category}/${key}`

  const updatedCategoryIndex = [...categoryIndex, file]
  await updateCategoryIndex(file, updatedCategoryIndex)

  // 2) save file content
  await saveFile(file.path, fileContent, { encrypt: false })

  // 3) update stats
  let docStats = store.getters.docStats
  if (!docStats.types) docStats.types = {}
  if (!docStats.categories) docStats.categories = {}

  let targetTypeData = docStats.types[file.type]
  let targetCategoryData = docStats.categories[file.category]

  const newDocStats = {
    types: {
      ...docStats.types,
      [file.type]: targetTypeData ? targetTypeData++ : 1
    },
    categories: {
      ...docStats.category,
      [file.category]: targetCategoryData ? targetCategoryData++ : 1
    }
  }

  await updateDocStats(newDocStats)
  store.dispatch("docStats", newDocStats)

  // 4) return uri
  const uri = btoa(`${file.username}/${file.category}/${key}`)
  return uri
}

export const updateFileMeta = async (file) => {
  // 1) update category index
  let categoryIndex = await getCategoryIndex(file)

  // 2) update file's meta in the index
  const fileMetaIndex = categoryIndex.findIndex((i) => i.key === file.key)
  categoryIndex[fileMetaIndex] = file

  // 3) store updated index of meta's
  await updateCategoryIndex(file, categoryIndex)

  // 4) return uri
  const uri = btoa(`${file.username}/${file.category}/${file.key}`)
  return uri
}

export const eraseFile = async (file) => {
  // 1) update category index
  const categoryIndex = await getCategoryIndex(file)

  file.path = `file/${file.category}/${file.key}`

  const updatedCategoryIndex = categoryIndex.filter((i) => i.key !== file.key)
  await updateCategoryIndex(file, updatedCategoryIndex)

  // 2) save file content
  await deleteFile(file.path)

  // 3) update stats
  let docStats = store.getters.docStats
  if (!docStats.types) docStats.types = {}
  if (!docStats.categories) docStats.categories = {}

  let targetTypeData = docStats.types[file.type]
  let targetCategoryData = docStats.categories[file.category]

  const newDocStats = {
    types: {
      ...docStats.types,
      [file.type]: targetTypeData ? targetTypeData-- : 0
    },
    categories: {
      ...docStats.category,
      [file.category]: targetCategoryData ? targetCategoryData-- : 0
    }
  }

  await updateDocStats(newDocStats)
  store.dispatch("docStats", newDocStats)
}

export const erasePath = async (path) => {
  // override with dummy content
  await saveFile(path, "{}", { encrypt: false, noPrefix: true })

  // delist / delete
  await deleteFile(path, { noPrefix: true })
}

export const loadFileContent = (path, params) => getFile(path, params)
