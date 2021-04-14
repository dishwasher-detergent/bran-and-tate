<template>
  <div class="w-full h-screen p-5 overflow-y-auto">
    <div class="w-full py-2">
      <p class="font-bold text-md">
        {{title}}
      </p>
    </div>
    <client-only>
      <grid-layout
        class="w-full h-full"
        :layout.sync="layout"
        :preventCollision="true"
        :col-num="this.column"
        :row-height="30"
        :is-draggable="draggable"
        :is-resizable="resizable"
        :vertical-compact="true"
        :use-css-transforms="true"
      >
        <grid-item
          v-for="item in layout"
          class="flex flex-col bg-white rounded ring-2 ring-gray-200 shadow overflow-hidden"
          :key="item.i"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
        >
          <div
            class="w-full flex justify-between p-2 pl-5 font-bold shadow"
          >
          <h1>{{item.name}}</h1>
          </div>
          <div class="w-full h-full overflow-auto">
            <Dashboard-widget :widgetId="item.i" :type="item.type" />
          </div>
        </grid-item>
      </grid-layout>
    </client-only>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",

      layout: [],
      column: 12,
      draggable: false,
      resizable: false,
      responsive: true,

      content: [],

      windowHeight: window.innerHeight,
    };
  },
  watch: {
    '$store.state.dashboard': function() {
      this.layout = []
      this.layout = this.content[this.$store.state.dashboard].layout
      this.title = this.content[this.$store.state.dashboard].title
      this.index = this.layout.length
    },
  },
  async fetch(){
    this.content = await this.$content('dashboard.layout').fetch()
    this.title = this.content[this.$store.state.dashboard].title
    this.layout = this.content[this.$store.state.dashboard].layout
    this.index = this.layout.length
  },
  created() {
    window.addEventListener("resize", this.myEventHandler);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.myEventHandler);
  },
  methods: {
    myEventHandler(e) {
      if(window.innerWidth <= 996)
        this.column = 1
      else
        this.column = 12
    },
    addItem: function () {
      // Add a new item. It must have a unique key!
      this.layout.push({
        x: (this.layout.length * 2) % (this.colNum || 12),
        y: this.layout.length + (this.colNum || 12), // puts it at the bottom
        w: 2,
        h: 2,
        i: this.index,
      });
      // Increment the counter to ensure key is always unique.
      this.index++;
    },
    removeItem: function (val) {
      const index = this.layout.map((item) => item.i).indexOf(val);
      this.layout.splice(index, 1);
    },
  },
};
</script>
<style>
.vue-grid-item.vue-grid-placeholder {
  background: transparent !important;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.15s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>