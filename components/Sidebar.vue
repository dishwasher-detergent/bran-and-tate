<template>
  <div class="relative">
    <transition name="slide">
      <div
        v-if="sidebarToggle"
        class="h-screen pb-14 w-60 bg-white border-r-2 border-gray-300 relative"
      >
        <!-- NOTE Logo Area -->
        <Logo image="" alt="" />
        <Sidebar-group>
          <Sidebar-title>Single Product</Sidebar-title>
          <Sidebar-item stage="add_or_edit">Add or Edit</Sidebar-item>
          <Sidebar-item stage="product_statistics">Product Statistics</Sidebar-item>

          <Sidebar-divider />
          <Sidebar-title>Database</Sidebar-title>
          <Sidebar-item stage="update_database">Update Database</Sidebar-item>

          <Sidebar-divider />
          <Sidebar-title>Users</Sidebar-title>
          <Sidebar-item stage="user_management">User Management</Sidebar-item>
        </Sidebar-group>
        <div
          class="w-full h-14 flex items-center justify-center absolute bottom-0 border-t-2 border-gray-200 bg-gray-100"
        >
          <button class="px-4 py-1 rounded bg-babyBlue text-white">
            Logout
          </button>
        </div>
        <button
          @click="sidebarToggle = !sidebarToggle"
          class="w-6 h-6 p-1 absolute bottom-0 -right-3 mb-11 flex items-center justify-center rounded-full ring-2 ring-blue-300 bg-blue-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
        </button>
      </div>
    </transition>
    <transition name="slide">
      <div
        v-if="!sidebarToggle"
        class="h-screen w-6 bg-gray-50 border-r-2 border-gray-300 relative"
      >
        <div
          class="flex items-center justify-center w-full h-24 mb-5 bg-gray-100 border-b-2 border-gray-200"
        ></div>
        <div
          class="w-full h-14 flex items-center justify-center absolute bottom-0 border-t-2 border-gray-200 bg-gray-100"
        ></div>
        <button
          @click="sidebarToggle = !sidebarToggle"
          class="w-6 h-6 p-1 absolute bottom-0 -right-3 mb-11 flex items-center justify-center rounded-full ring-2 ring-blue-300 bg-blue-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 5l7 7-7 7M5 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sidebarToggle: true,
    };
  },
};
</script>
<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.15s;
}
.slide-enter,
.slide-leave-active {
  transform: translateX(-99%);
}
</style>