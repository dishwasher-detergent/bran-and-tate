<template>
  <div class="w-full h-screen p-5">
    <div class="pb-4 md:p-4 flex flex-col md:flex-row space-y-6 md:space-x-6 md:space-y-0">
      <WidgetAdd v-if='layout == "add_or_edit"'/>
      <WidgetUser v-if='layout == "add_user"'/>
      <WidgetBanner v-if='layout == "banner"'/>
      <WidgetOrders v-if='layout == "orders"'/>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      layout: 'add_or_edit',
    };
  },
  watch: {
    '$store.state.dashboard': function() {
      this.layout = this.$store.state.dashboard
    },
  }
};
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.15s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>