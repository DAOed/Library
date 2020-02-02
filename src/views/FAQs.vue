<template>
  <div class="small-container">
    <div class="faqs">
      <title-view
        title="Frequently Asked Questions"
        style="border-bottom: 0px"
      />

      <zi-collapse
        v-model="value"
        accordion
      >
        <zi-collapse-item
          v-for="(issue, index) in issues"
          :key="index"
          :title="issue.title"
        >
          <!-- eslint-disable vue/no-v-html -->
          <p v-html="issue.description" />
        </zi-collapse-item>
      </zi-collapse>
    </div>
  </div>
</template>

<script>
import TitleView from "@components/title"

export default {
  components: {
    TitleView
  },
  data: () => ({
    value: "",
    issues: [
      {
        title: "What is the decentralized Internet?",
        description: `
          The terms <b>Decentralized Internet</b> is used to describe the concept of an Internet where users are custodians of their data and activities.
          <br/>
          <b>Daoed</b> is built on <a href="https://blockstacks.org" target="_blank">Block Stack</a>, a Decentralized Internet platform.
        `
      },
      {
        title: "What can I do with DAOed Library?",
        description: `
          You can upload files and share their <b>uri</b> links. Anyone with the links can freely view and download your files. You can also create a profile to tell the world more about yourself.
        `
      },
      {
        title: "Are there any limitations",
        description: `
          Currently, we only support file uploads of files less than 1MB. This restriction is to better user experience
        `
      },
      {
        title: "Which document formats are supported?",
        description: `
        We support the following document file types:
        
        .DOC and DOCX
        .HTML and .HTM
        .ODT
        .PDF
        .XLS and XLSX
        .ODS
        .PPT and .PPTX
        .TXT

          Learn more about these extensions <a href="https://blog.filestack.com/thoughts-and-knowledge/document-file-extensions-list/" target="_blank">in this blog post</a>
        `
      }
    ]
  }),

  watch: {
    value () {
    }
  }
}
</script>

<style>
.faqs {
  width: 100%;
  height: 100%;
}
</style>
