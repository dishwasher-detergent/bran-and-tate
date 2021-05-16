<template>
<div class="p-4 flex flex-col md:flex-row space-y-6 md:space-x-6 md:space-y-0">
    <div
      class="p-4 ring-1 ring-gray-300 rounded-xl overflow-hidden bg-white w-full"
    >
        <form @submit.stop.prevent="upload" class="space-y-6">
            <div>
                <p class="text-lg">Image</p>
                <div class="bg-gray-50 rounded-xl ring-1 ring-gray-300 p-2">
                    <label for="product_image">
                        <input type="file" accept="image/*" @change="uploadImage($event)" id="product_image" required>
                    </label>
                </div>
            </div>
            <label for="product_name">
                <p class="text-lg">Name</p>
                <input v-model="title" type="text" id="product_name" required>
            </label>
            <label for="product_description">
                <p class="text-lg">Description</p>
                <textarea v-model="description" type="text" id="product_description" required></textarea>
            </label>
            <label for="product_price">
                <p class="text-lg">Price</p>
                <input v-model="price" type="tel" id="product_price" required>
            </label>
            <div>
                <p class="text-lg">Size</p>
                <div class="flex flex-row items-center space-x-2 bg-gray-50 rounded-xl ring-1 ring-gray-300 p-2">
                    <label for="product_size_w" class="w-full">
                        <p class="text-sm">Width</p>
                        <input v-model="size.w" type="text" id="product_size_w" required>
                    </label>
                    <span class="px-2 text-xl font-bold">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </span>
                    <label for="product_size_l" class="w-full">
                        <p>Height</p>
                        <input v-model="size.h" type="text" id="product_size_l" required>
                    </label>
                </div>
            </div>
            <label for="product_colors">
                <p class="text-lg">Colors</p>
                <div class="bg-gray-50 rounded-xl ring-1 ring-gray-300 p-2">
                    <label :for="'product_color_' + color" v-for="color in color_list" :key="color.id">
                        <input v-model="colors" type="checkbox" name="color" :value="color" :id="'product_color_' + color" checked>
                        {{color}}
                    </label>
                </div>
            </label>
            <div>
                <p class="text-lg">Type</p>
                <div class="bg-gray-50 rounded-xl ring-1 ring-gray-300 p-2">
                    <label :for="'product_type_' + type" v-for="type in type_list" :key="type.id">
                        <input v-model="types" type="checkbox" name="type" :value="type" :id="'product_type_' + type" checked>
                        {{type}}
                    </label>
                </div>
            </div>
            <button class="w-full px-4 py-2 rounded-xl bg-blue-500 text-white">Add Product</button>
        </form>
    </div>
    <div class="w-full md:w-96">
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
    data(){
        return{
            title: 'Default',
            description:'This is the default description.',
            size:{"w":2,"h":2},
            colors:[],
            color_list:['red','green','blue'],
            types:[],
            type_list:['Wall','Porch','Seasonal'],
            price:'10',
            image:'',
            image_raw: ''
        }
    },
    methods: {
        uploadImage(input) {
            if(input){
                this.image = URL.createObjectURL(input.target.files[0])
                this.image_raw = input.target.files[0]
            }
        },
        async upload(){
            let data = await this.upload_product()
            if(data != '')
                await this.upload_image(data)
        },
        async upload_product(){
            const { data, error } = await this.$supabase
            .from('products')
            .insert([
                { 
                    title: this.title, 
                    description: this.description, 
                    size: this.size,
                    colors: this.colors,
                    price: this.price,
                    type: this.types
                },
            ])
            if(error){
                console.error(error)
                return
            } else {
                // console.log(data)
                return data
            }
        },
        async upload_image(product_data){
            try {
                const { data, error } = await this.$supabase
                .storage
                .from('product-images')
                .upload(product_data[0].id + '.png', this.image_raw)
            if (error) {
                throw error
            }
            } catch (error) {
                console.log('Error downloading image: ', error.message)
            }
        }
    }
}
</script>
<style scoped>
input[type="text"],input[type="tel"],textarea{
    @apply ring-1;
    @apply ring-gray-300;
    @apply p-2;
    @apply rounded-xl;
    @apply w-full
}

p {
    @apply pb-2;
    @apply pl-2
}

label {
    @apply block;
}
</style>