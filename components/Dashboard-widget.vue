<template>
  <div class="p-4">
    <div
      v-if="type == 'table'"
      class="ring-1 ring-gray-200 rounded overflow-hidden"
    >
      <table class="w-full">
        <thead>
          <tr class="bg-blue-200">
            <th class="px-2 py-1">test</th>
            <th class="px-2 py-1">test</th>
            <th class="px-2 py-1">test</th>
            <th class="px-2 py-1">test</th>
          </tr>
        </thead>
        <tr>
          <td class="px-2 py-1">a</td>
          <td class="px-2 py-1">a</td>
          <td class="px-2 py-1">a</td>
          <td class="px-2 py-1">a</td>
        </tr>
        <tr>
          <td class="px-2 py-1">a</td>
          <td class="px-2 py-1">a</td>
          <td class="px-2 py-1">a</td>
          <td class="px-2 py-1">a</td>
        </tr>
        <tr>
          <td class="px-2 py-1">a</td>
          <td class="px-2 py-1">a</td>
          <td class="px-2 py-1">a</td>
          <td class="px-2 py-1">a</td>
        </tr>
        <tr>
          <td class="px-2 py-1">a</td>
          <td class="px-2 py-1">a</td>
          <td class="px-2 py-1">a</td>
          <td class="px-2 py-1">a</td>
        </tr>
        <tr>
          <td class="px-2 py-1">a</td>
          <td class="px-2 py-1">a</td>
          <td class="px-2 py-1">a</td>
          <td class="px-2 py-1">a</td>
        </tr>
        <tr>
          <td class="px-2 py-1">a</td>
          <td class="px-2 py-1">a</td>
          <td class="px-2 py-1">a</td>
          <td class="px-2 py-1">a</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  props: ["widgetId", "type"],
};
</script>
<style scoped>
tr:nth-child(even) {
  background-color: #f1f1f1;
}
</style>