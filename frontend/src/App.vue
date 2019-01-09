<template>
  <div id="app" class="w-screen h-screen bg-black">
    <div class="container flex flex-col items-center mx-auto">
      <div class="md:mt-20">
        <svg class="app-logo w-64 text-yellow-dark" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve"><g><path d="M281.4,27.4c-119.6,0-217.9,92.4-227.6,209.5c-15.7,8.6-26.4,25.3-26.4,44.5v50.8H12.2c-5.6,0-10.2,4.5-10.2,10.2v30.5   c0,5.6,4.5,10.2,10.2,10.2h15.1v63.5c0,7,5.7,12.7,12.7,12.7c7,0,12.7-5.7,12.7-12.7V383h50.9v63.5c0,7,5.7,12.7,12.7,12.7   c7,0,12.7-5.7,12.7-12.7V383h15.2c5.6,0,10.2-4.5,10.2-10.2v-30.5c0-5.6-4.5-10.2-10.2-10.2H129v-48.1c0-18.7-9.5-36.3-24.5-45.9   c9-89.7,84.9-160,176.9-160c98,0,177.8,79.8,177.8,177.8c0,98-79.8,177.8-177.8,177.8c-14,0-25.4,11.4-25.4,25.4   c0,14,11.4,25.4,25.4,25.4C407.4,484.6,510,382,510,256S407.4,27.4,281.4,27.4z"/><path d="M347.8,256h-18.6c-7.7,0-12.6-8.2-8.9-15l61.5-97c3.7-6.8-1.2-15-8.9-15l-135.4,0c-5,0-9.2,3.6-10,8.5l-22.1,135   c-1,6.2,3.8,11.8,10,11.8h28.3c6.5,0,11.4,6.1,9.9,12.4L230.9,396c-2.3,10.4,10.9,16.9,17.7,8.7l106.8-131.8   C361.2,266.4,356.6,256,347.8,256z"/></g></svg>
      </div>
      <h1 class="md:my-6 mt-4 mb-6 text-grey-light">
        {{ (response && !error) ? 'Click the LNK!' : 'Shorten your URLs with LNK' }}
      </h1>
      
      <template v-if="!response">
        <input type="text" class="bg-grey-darkest text-white p-2 text-xl" v-model="url" placeholder="example.com">
        <div class="pt-6">
          <button id="create-button" :disabled="valid" 
            class="rounded text-2xl bg-yellow-dark text-black font-black uppercase px-2 py-1"
            :class="{ 'opacity-25 cursor-not-allowed': valid }"
            @click="create"
          >
            Create
          </button>
        </div>
      </template>

      <template v-else>
        <div class="flex">
          <a v-if="!error" target="_blank" :href="responseText"
            class="response text-2xl text-yellow-dark"
            v-text="responseText" 
          />
          <div class="relative">
            <svg class="-mt-2 copy-icon cursor-pointer hover:bg-grey-darkest ml-2 p-2 rounded-lg text-white w-12"
              @click="copyLink" 
              xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="15 17 70 70" enable-background="new 0 0 100 100" xml:space="preserve"><path d="M70,30h-5v-5c0-1.7-1.3-3-3-3H30c-1.7,0-3,1.3-3,3v42c0,1.7,1.3,3,3,3h5v5c0,1.7,1.3,3,3,3h32c1.7,0,3-1.3,3-3V33  C73,31.3,71.7,30,70,30z M30,68c-0.6,0-1-0.4-1-1V25c0-0.6,0.4-1,1-1h32c0.6,0,1,0.4,1,1v5H38c-1.7,0-3,1.3-3,3v35H30z M71,75  c0,0.6-0.4,1-1,1H38c-0.6,0-1-0.4-1-1V33c0-0.6,0.4-1,1-1h32c0.6,0,1,0.4,1,1V75z"/></svg>
            <div v-if="copied" class="absolute copy-text text-white">
              Copied!
            </div>
          </div>
        </div>
        <h3 class="pt-20 text-lg opacity-50 hover:opacity-100 text-grey-darker cursor-pointer"
          @click="response = null"
        >
          create another link
        </h3>
      </template>
    </div>
  </div>
</template>

<script>
import feathers from './feathers.js'

export default {
  name: 'app',
  data: () => ({
    url: '',
    response: null,
    copied: false
  }),
  computed: {
    valid() {
      var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
      var regex = new RegExp(expression)
      return !this.url.match(regex) ? true : false
    },
    error() {
      return this.response && this.response.error
    },
    responseText() {
      const hostname 
        = window.location.href === "http://localhost:8080/"
        ? "http://localhost:3030/"
        : window.location.href
      return `${hostname}L/${this.response.LNK}`
    }
  },
  methods: {
    create() {
      feathers.service('links')
        .create({ url: this.url })
        .then(d => {
          this.response = d
          console.log('success', d)
        })
        .catch(d => {
          this.response = {
            error: true,
            message: 'Error occurred, check the console'
          }
          console.log('error', d)
        })
    },
    copyLink() {
      this.$copyText(this.responseText)
      this.copied = true
      setTimeout(() => {
        this.copied = false
      }, 1500)
    }
  }
}
</script>

<style>
#create-button {
  transition: opacity 300ms;
}
.copy-icon, .app-logo {
  fill: currentColor;
}
.copy-text {
    top: 5px;
    right: -60px;
}
</style>
