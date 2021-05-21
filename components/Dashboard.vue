<template>
  <div class="w-full h-screen p-5 overflow-y-auto">
    <div>
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