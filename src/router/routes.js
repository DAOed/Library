
import Landing from "@views/Landing/Index.vue"

export default [
  {
    path: "/",
    name: "Landing",
    component: Landing,
    meta: {
      title: "Your secure, free, open and decentralized digital library - DAOed Library",
      metaTags: [
        {
          name: "description",
          content: "Free, open source and decentralized collection of documents. No account or login is required to explore or download documents."
        },
        {
          property: "og:description",
          content: "Free, open source and decentralized collection of documents. No account or login is required to explore or download documents."
        }
      ]
    }
  },
  {
    path: "/reads",
    name: "Reads",
    component: () => import(/* webpackChunkName: "reads" */ "../views/Reads/Index.vue"),
    meta: {
      title: "Reads - DAOed Library",
      metaTags: [
        {
          name: "description",
          content: "Discover documents, papers, reports and more reads by categories on the decentralized DAOed library."
        },
        {
          property: "og:description",
          content: "Discover documents, papers, reports and more reads by categories on the decentralized DAOed library."
        }
      ]
    }
  },
  {
    path: "/collection",
    name: "Collection",
    component: () => import(/* webpackChunkName: "collection" */ "../views/Collection/Index.vue"),
    meta: {
      title: "Collection - DAOed Library",
      metaTags: [
        {
          name: "description",
          content: "View your documents on the decentralized DAOEd library by categories. Publish as many documents as you want for free."
        },
        {
          property: "og:description",
          content: "View your documents on the decentralized DAOEd library by categories. Publish as many documents as you want for free."
        }
      ]
    }
  },
  {
    path: "/item",
    name: "Item",
    component: () => import(/* webpackChunkName: "item" */ "../views/Item/Index.vue"),
    meta: {
      title: "Item - DAOed Library",
      metaTags: [
        {
          name: "description",
          content: "Read summary, manage and freely download document on the DAOed library. Learn more about the author."
        },
        {
          property: "og:description",
          content: "Read summary, manage and freely download document on the DAOed library. Learn more about the author."
        }
      ]
    }
  },
  {
    path: "/upload",
    name: "Upload",
    component: () => import(/* webpackChunkName: "upload" */ "../views/Upload/Index.vue"),
    meta: {
      title: "Upload - DAOed Library",
      metaTags: [
        {
          name: "description",
          content: "Publish new documents to the decentralized DAOed library for free."
        },
        {
          property: "og:description",
          content: "Publish new documents to the decentralized DAOed library for free."
        }
      ],
      requiresAuth: true
    }
  },
  {
    path: "/edit",
    name: "Edit",
    component: () => import(/* webpackChunkName: "edit" */ "../views/Edit/Index.vue"),
    meta: {
      title: "Edit - DAOed Library",
      metaTags: [
        {
          name: "description",
          content: "Edit the details of your document or erase it from the decentralized DAOed library."
        },
        {
          property: "og:description",
          content: "Edit the details of your document or erase it from the decentralized DAOed library."
        }
      ],
      requiresAuth: true
    }
  },
  {
    path: "/account",
    name: "Account",
    component: () => import(/* webpackChunkName: "account" */ "../views/Account/Index.vue"),
    meta: {
      title: "Account - DAOed Library",
      metaTags: [
        {
          name: "description",
          content: "Update your account and profile details. You decide how the world sees you."
        },
        {
          property: "og:description",
          content: "Update your account and profile details. You decide how the world sees you."
        }
      ],
      requiresAuth: true
    }
  },
  {
    path: "/author",
    name: "Author",
    component: () => import(/* webpackChunkName: "author" */ "../views/Author/Index.vue"),
    meta: {
      title: "Author - DAOed Library",
      metaTags: [
        {
          name: "description",
          content: "Discover more about the document author on DAOed library. Read their bio, follow them and reward them."
        },
        {
          property: "og:description",
          content: "Discover more about the document author on DAOed library. Read their bio, follow them and reward them."
        }
      ]
    }
  },
  {
    path: "/settings",
    name: "Settings",
    component: () => import(/* webpackChunkName: "settings" */ "../views/Settings/Index.vue"),
    meta: {
      title: "Settings - DAOed Library",
      metaTags: [
        {
          name: "description",
          content: "Update your account setting on DAOed Library."
        },
        {
          property: "og:description",
          content: "Update your account setting on DAOed Library."
        }
      ],
      requiresAuth: true
    }
  },
  {
    path: "/about",
    name: "About",
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
    meta: {
      title: "About - DAOed Library",
      metaTags: [
        {
          name: "description",
          content: "Learn more about the decentralized and free DAOed Library."
        },
        {
          property: "og:description",
          content: "Learn more about the decentralized and free DAOed Library."
        }
      ]
    }
  },
  {
    path: "/faqs",
    name: "FAQs",
    component: () => import(/* webpackChunkName: "faqs" */ "../views/FAQs.vue"),
    meta: {
      title: "FAQs - DAOed Library",
      metaTags: [
        {
          name: "description",
          content: "Frequently Asked Questions about the decentralized DAOed Library."
        },
        {
          property: "og:description",
          content: "Frequently Asked Questions about the decentralized DAOed Library."
        }
      ]
    }
  },
  {
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "login" */ "../views/Login.vue"),
    meta: {
      title: "Login - DAOed Library",
      metaTags: [
        {
          name: "description",
          content: "Securely login to your decentralized DAOed Library."
        },
        {
          property: "og:description",
          content: "Securely login to your decentralized DAOed Library."
        }
      ]
    }
  }
]
