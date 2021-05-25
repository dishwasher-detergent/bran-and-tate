<template>
  <ik-upload 
    :tags="['tag1','tag2']"
    :responseFields="['tags']"
    :onError="onError"
    :onSuccess="onSuccess"
    customCoordinates="10,10,100,100"
  />
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    onError(err) {
      console.log("Error");
      console.log(err);
    },
    onSuccess(res) {
      console.log("Success");
      console.log(res);
    }
  }
};
</script>