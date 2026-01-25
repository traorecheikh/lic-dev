<script setup lang="ts">
useSeoMeta({
  title: 'LO IT CONSULTING - Expertise IT en Afrique',
  ogTitle: 'LO IT CONSULTING - Expertise IT en Afrique',
  description: 'LO IT CONSULTING transforme les défis technologiques en opportunités. Formation, développement, cloud et conseil IT au Sénégal et en Afrique.',
  ogDescription: 'LO IT CONSULTING transforme les défis technologiques en opportunités. Formation, développement, cloud et conseil IT au Sénégal et en Afrique.',
  ogImage: '/LIC.png',
  twitterCard: 'summary_large_image',
})

useSchemaOrg([
  defineOrganization({
    name: 'LO IT CONSULTING',
    logo: '/LIC.png',
  })
])
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>