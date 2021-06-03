<template>
  <div class="p-6">
    <WidgetAdd v-if="slug == 'Product'" />
    <WidgetUser v-if="slug == 'User'" />
    <WidgetBanner v-if="slug == 'Banner'" />
    <WidgetOrders v-if="slug == 'Orders'" />
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  async asyncData({ params }) {
    const slug = params.slug
    return { slug }
  },
}
</script>