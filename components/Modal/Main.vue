<script>
  export default {
    name: 'Modal',
	props: [
		'colors',
	],
	data(){
		return{
			count: 1
		}
	},
    methods: {
      close() {
        this.$emit('close');
      },
	  incCnt(){
		  this.count++
	  },
	  dcrsCnt(){
		  if(this.count == 1) return;
		  this.count--
	  }
    },
  };
</script>

<template>
  <transition name="slide">
    <div class="top-0 bottom-0 left-0 right-0 fixed flex items-end justify-center z-50">
      <div class="relative overflow-hidden w-full h-3/5 flex flex-col rounded shadow-t bg-gray-50 border-t border-gray-300"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <!-- <header
          class="relative border-b flex justify-between p-4 font-bold text-xl border-gray-200 "
          id="modalTitle"
        >
          <slot name="header">
            
          </slot>
          <button
            type="button"
            class="h-full flex items-center justify-center"
            @click="close"
            aria-label="Close modal"
          >
			<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
			</svg>
          </button>
        </header> -->

        <section
          class="w-full h-full pb-20 flex flex-col md:flex-row"
          id="modalDescription"
        >
		<div class="w-full h-48 md:w-2/5 md:h-full bg-gray-300">
          <slot name="img"></slot>
		</div>
		<div class="w-full h-full p-5 space-y-5">
			<h1 class="font-bold text-5xl">
				<slot name="header"></slot>
			</h1>
			<div class="inline-block">
				<ProductColorContainer>
					<ProductColor v-for="color in colors" :key="color.id" 
						:color="color"
					/>
				</ProductColorContainer>
			</div>
			<div class="w-40 h-10 bg-gray-100 ring-1 ring-gray-200 rounded flex flex-row">
				<button class="w-3/5 h-full bg-gray-200" @click="dcrsCnt()">-</button>
				<p class="w-full flex items-center justify-center bold text-xl">{{count}}</p>
				<button class="w-3/5 h-full bg-gray-200" @click="incCnt()">+</button>
			</div>
			<div>
				<p class="font-bold text-2xl">Description</p>
				<slot name="description" class="text-xl"></slot>
			</div>
			<div>
				<p class="font-bold text-2xl">Demensions</p>
				<slot name="size"></slot>
			</div>
		</div>
        </section>

        <footer class="w-full h-20 absolute bottom-0">
          <button
            type="button"
            class="w-full h-full bg-blue-500 text-white font-bold"
            @click="close"
            aria-label="Close modal"
          >
            Add to Cart
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>
<style scoped>

	.shadow-t {
		box-shadow: 0 -1px 3px 0 rgba(0, 0, 0, 0.1), 0 -1px 2px 0 rgba(0, 0, 0, 0.06);
	}

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

	.slide-leave-active,
	.slide-enter-active {
	transition: .25s;
	}
	.slide-enter {
	transform: translate(0,100%);
	opacity: 1;
	}
	.slide-leave-to {
	transform: translate(0,100%);
	opacity: 0;
	}
</style>