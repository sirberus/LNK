<template>
  <div id="app" class="w-screen h-screen bg-black">
    <div class="container flex flex-col items-center mx-auto">
      <div class="md:mt-20">
        <img alt="Vue logo" src="./assets/logo.png">
      </div>
      <h1 class="md:my-6 my-4 text-grey-light">
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
        <a v-if="!error" target="_blank" :href="responseText"
          class="response text-2xl text-yellow-dark"
          v-text="responseText" 
        />
        <h3 class="pt-6 text-lg opacity-50 hover:opacity-100 text-grey-darker cursor-pointer"
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
    response: null
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
    }
  }
}
</script>

<style>
#create-button {
  transition: opacity 300ms;
}
</style>
