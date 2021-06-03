import Vue from 'vue'
const {ImageKit} = require('imagekitio-vue')
const hostUrl = process.env.NUXT_WEBSITE;

Vue.use(ImageKit, {
  urlEndpoint: "https://ik.imagekit.io/branandtate/",
  publicKey: "public_3C3ZlEJz6tKgVa6Glcpb7YSQXe8=",
  authenticationEndpoint: `${hostUrl}/api/imageKit`
})