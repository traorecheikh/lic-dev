<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: 'Prêt à Transformer votre Entreprise?'
  },
  description: {
    type: String,
    default: 'Contactez-nous pour discuter de vos défis technologiques et explorer les solutions adaptées.'
  },
  buttonText: {
    type: String,
    default: 'Démarrer une Consultation'
  },
  buttonLink: {
    type: String,
    default: '/contact'
  }
})
</script>

<template>
  <section class="py-20 bg-lic-dark">
    <div class="max-w-4xl mx-auto px-6 lg:px-8 text-center">
      <h2 class="text-4xl font-black text-white mb-4">
        {{ title }}
      </h2>
      <p class="text-lg text-gray-300 mb-10">
        {{ description }}
      </p>
      <NuxtLink :to="buttonLink" class="inline-block bg-lic-orange hover:bg-orange-600 text-white px-10 py-4 font-bold transition duration-300">
        {{ buttonText }}
      </NuxtLink>
    </div>
  </section>
</template>
