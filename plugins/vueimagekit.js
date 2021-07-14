import Vue from 'vue'
const {ImageKit} = require('imagekitio-vue')

Vue.use(ImageKit, {
  urlEndpoint: process.env.imageKit_endpoint,
  publicKey: process.env.public_api,
  authenticationEndpoint: 'https://branandtate.com/api/imageKit'
})
