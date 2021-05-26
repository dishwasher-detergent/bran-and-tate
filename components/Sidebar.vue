<template>
<div class="rounded-lg shadow bg-base-200 drawer drawer-mobile h-full">
  <input id="my-drawer-2" type="checkbox" class="drawer-toggle"> 
  <div class="drawer-content">
    <nav class="border-b border-gray-300 w-full h-16 bg-white flex justify-between items-center px-4 lg:hidden">
      <h1>Bran & Tate</h1>
      <label for="my-drawer-2" class="btn btn-square btn-md drawer-button lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </label> 
    </nav>
    <slot></slot>
  </div> 
  <div class="drawer-side border-r border-gray-300">
    <label for="my-drawer-2" class="drawer-overlay"></label> 
    <ul class="menu p-4 w-80 bg-base-100 text-base-content">
      <Sidebar-item stage="orders">Orders</Sidebar-item>
      <Sidebar-item stage="add_or_edit">Add Product</Sidebar-item>
      <Sidebar-item stage="add_user">Add User</Sidebar-item>
      <Sidebar-item stage="banner">Banners</Sidebar-item>
    </ul>
  </div>
</div>
</template>