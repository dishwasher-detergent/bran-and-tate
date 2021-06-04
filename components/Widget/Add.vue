<template>
  <div class="space-y-6 md:space-y-0 space-x-0 md:space-x-6 flex flex-col md:flex-row w-full">
    <WidgetContainer class="flex-1">
      <form @submit.stop.prevent="upload" class="space-y-6">
        <div v-if="error" class="alert alert-error">
          <div class="flex-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="w-6 h-6 mx-2 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
              ></path>
            </svg>
            <label>{{ error }}</label>
          </div>
        </div>
        <div v-if="success" class="alert alert-success">
          <div class="flex-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="w-6 h-6 mx-2 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
              ></path>
            </svg>
            <label>Product uploaded successfully!</label>
          </div>
        </div>
        <div>
          <p class="text-lg">Image</p>
          <div class="bg-gray-50 rounded-2xl ring-1 ring-gray-300 p-2">
            <label for="product_image">
              <ik-upload
                :onError="onError"
                :onSuccess="onSuccess"
              />
            </label>
          </div>
        </div>
        <label for="product_name">
          <p class="text-lg">Name</p>
          <input v-model="title" type="text" id="product_name" required />
        </label>
        <label for="product_description">
          <p class="text-lg">Description</p>
          <textarea
            v-model="description"
            type="text"
            id="product_description"
            class="textarea h-24 textarea textarea-bordered w-full"
            required
          ></textarea>
        </label>
        <label for="product_price">
          <p class="text-lg">Price</p>
          <input v-model="price" type="tel" id="product_price" required />
        </label>
        <div>
          <p class="text-lg">Size</p>
          <div
            class="flex flex-col md:flex-row items-center space-x-2 bg-gray-50 rounded-2xl ring-1 ring-gray-300 p-2"
          >
            <label for="product_size_w" class="w-full">
              <p>Width</p>
              <input v-model="size.w" type="text" id="product_size_w" required />
            </label>
            <span class="px-2 pt-2 md:pt-0 text-xl font-bold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
            <label for="product_size_l" class="w-full">
              <p>Height</p>
              <input v-model="size.h" type="text" id="product_size_l" required />
            </label>
          </div>
        </div>
        <div
          tabindex="0"
          class="collapse w-full md:w-96 rounded-box border border-base-300 collapse-arrow"
        >
          <input type="checkbox" />
          <div class="collapse-title text-lg">Colors</div>
          <div class="collapse-content">
            <div class="form-control">
              <label
                class="cursor-pointer label"
                :for="'product_color_' + color"
                v-for="color in color_list"
                :key="color.id"
              >
                <span class="label-text">{{ color }}</span>
                <div>
                  <input
                    v-model="colors"
                    type="checkbox"
                    name="color"
                    :value="color"
                    :id="'product_color_' + color"
                    checked="checked"
                    class="checkbox checkbox-primary"
                  />
                  <span class="checkbox-mark"></span>
                </div>
              </label>
            </div>
          </div>
        </div>
        <div
          tabindex="2"
          class="collapse w-full md:w-96 rounded-box border border-base-300 collapse-arrow"
        >
          <input type="checkbox" />
          <div class="collapse-title text-lg">Type</div>
          <div class="collapse-content">
            <div class="form-control">
              <label
                class="cursor-pointer label"
                :for="'product_type_' + type"
                v-for="type in type_list"
                :key="type.id"
              >
                <span class="label-text">{{ type }}</span>
                <div>
                  <input
                    v-model="types"
                    type="checkbox"
                    name="types"
                    :value="type"
                    :id="'product_type_' + type"
                    checked="checked"
                    class="checkbox checkbox-primary"
                  />
                  <span class="checkbox-mark"></span>
                </div>
              </label>
            </div>
          </div>
        </div>
        <button
          aria-label="Add to cart"
          :class="
            'btn ' + (success ? 'btn-success' : 'btn-primary') + ' ' + (loading ? 'loading' : '')
          "
        >
          {{ success ? 'Added!' : 'Upload Product' }}
        </button>
      </form>
    </WidgetContainer>
    <div class="w-full md:w-96 flex-none">
      <h1 class="text-2xl font-bold mb-4">Preview</h1>
      <ProductItem
        :title="title"
        :description="description"
        :size="size"
        :colors="colors"
        :price="price"
        :id="0"
        :image_editing="image"
        :editing="true"
      />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: 'Default',
      description: 'This is the default description.',
      size: { w: 2, h: 2 },
      colors: [],
      color_list: ['red', 'green', 'blue'],
      types: [],
      type_list: ['Wall', 'Porch', 'Seasonal'],
      price: '10',
      image: '',
      error: null,
      loading: false,
      success: false,
    }
  },
  methods: {
    async upload() {
      this.loading = true
      let product_data = await this.upload_product()
      let image_data = ''
      if (product_data != '') image_data = await this.upload_image(product_data)
      else this.error = 'There was an error uploading your product'
      if (image_data == '') this.error = 'There was an error uploading your image.'
      this.loading = false
      this.success = true
      setTimeout(() => {
        this.success = false
      }, 5000)
    },
    async upload_product() {
      try {
        const { data, error } = await this.$supabase.from('products').insert([
          {
            title: this.title,
            description: this.description,
            size: this.size,
            colors: this.colors,
            price: this.price,
            type: this.types,
            image: this.image_path,
          },
        ])
        if (!error) return data
        throw error
      } catch (error) {
        return
      }
    },
    onError(err) {
      console.log('Error')
      console.log(err)
    },
    onSuccess(res) {
      this.image_path = res.filePath
      this.image = res.filePath
    },
  },
}
</script>
<style scoped>
input[type='text'],
input[type='tel'] {
  @apply input;
  @apply input-bordered;
  @apply w-full;
}

p {
  @apply pb-2;
  @apply pl-2;
}
</style>