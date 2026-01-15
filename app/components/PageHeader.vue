<script setup lang="ts">
defineProps({
  tagline: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <section class="bg-white pt-16 pb-12 border-b border-gray-100">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <span v-if="tagline" class="text-lic-orange font-bold tracking-widest uppercase text-sm mb-4 block">
        {{ tagline }}
      </span>
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-black text-lic-dark mb-6 leading-tight max-w-4xl">
        <slot name="title"></slot>
      </h1>
      <p v-if="description" class="text-lg md:text-xl text-gray-500 max-w-3xl leading-relaxed">
        {{ description }}
      </p>
    </div>
  </section>
</template>
