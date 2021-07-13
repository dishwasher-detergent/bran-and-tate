import Vue from 'vue'
const {ImageKit} = require('imagekitio-vue')

Vue.use(ImageKit, {
  urlEndpoint: "https://ik.imagekit.io/branandtate/",
  publicKey: process.env.NUXT_IMAGEKIT_PUBLIC,
  authenticationEndpoint: 'https://branandtate.com/api/imageKit'
})
