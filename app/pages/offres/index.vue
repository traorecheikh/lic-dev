<script setup>
const INITIAL_DELAY_MS = 200
const REQUEST_TIMEOUT_MS = 10000
const MAX_RETRIES = 2
const RETRY_BASE_DELAY_MS = 2000

const withTimeout = async (promise, timeoutMs) => {
  let timeoutId
  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error('Strapi request timeout')), timeoutMs)
  })
  try {
    return await Promise.race([promise, timeoutPromise])
  } finally {
    clearTimeout(timeoutId)
  }
}

const { data: offresData, pending, error, refresh } = await useAsyncData('offres-list', async () => {
  await new Promise(resolve => setTimeout(resolve, INITIAL_DELAY_MS))

  let res
  let attempt = 0

  while (attempt <= MAX_RETRIES) {
    try {
      res = await withTimeout($fetch('/api/offres'), REQUEST_TIMEOUT_MS)
      break
    } catch (err) {
      attempt++
      if (attempt > MAX_RETRIES) {
        const statusCode = err?.statusCode || err?.response?.status
        if (statusCode === 401 || statusCode === 403) {
          throw new Error('Accès refusé par Strapi (403). Activez la permission Public find sur offres.')
        }
        throw new Error('Le serveur met plus de temps que prévu à répondre. Veuillez rafraîchir la page.')
      }
      const delay = Math.min(attempt * RETRY_BASE_DELAY_MS, 6000)
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }

  if (!res || !Array.isArray(res.data)) return []

  return res.data.map((item) => ({
    id: item.id,
    titre: item.titre || item.attributes?.titre,
    slug: item.slug || item.attributes?.slug,
    localisation: item.localisation || item.attributes?.localisation,
    departement: item.departement || item.attributes?.departement,
    type_emploi: item.type_emploi || item.attributes?.type_emploi,
    statut: item.statut || item.attributes?.statut || 'ouvert',
  }))
}, { lazy: true, server: false })

const offres = computed(() => offresData.value || [])

useHead({
  title: 'Carrières - LIC',
  meta: [
    { name: 'description', content: 'Rejoignez LO IT CONSULTING. Découvrez nos offres d\'emploi et postulez en ligne.' }
  ]
})
</script>

<template>
  <div class="bg-white min-h-screen">

    <!-- Header -->
    <section class="pt-20 pb-12 bg-white">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="max-w-3xl">
          <span class="text-lic-orange font-bold tracking-widest uppercase text-sm mb-2 block">Rejoignez-nous</span>
          <h1 class="text-4xl md:text-5xl font-black text-lic-dark mb-6 tracking-tight">
            Nos Offres d'Emploi
          </h1>
          <p class="text-xl text-gray-600 leading-relaxed">
            Construisez la prochaine génération de solutions IT en Afrique avec une équipe passionnée et ambitieuse.
          </p>
        </div>
      </div>
    </section>

    <!-- Offers Grid -->
    <section class="pb-24 bg-white">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">

        <!-- Loading Skeleton -->
        <div v-if="pending && (!offresData || offresData.length === 0)" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="n in 6" :key="n" class="bg-white rounded-xl border border-gray-200 p-6 animate-pulse flex flex-col gap-4">
            <div class="flex justify-between items-start">
              <div class="h-5 bg-gray-200 rounded w-1/3"></div>
              <div class="h-6 bg-gray-200 rounded-full w-20"></div>
            </div>
            <div class="h-7 bg-gray-200 rounded w-3/4"></div>
            <div class="h-4 bg-gray-200 rounded w-1/2"></div>
            <div class="mt-auto pt-4 border-t border-gray-100 flex gap-2">
              <div class="h-6 bg-gray-200 rounded-full w-24"></div>
              <div class="h-6 bg-gray-200 rounded-full w-20"></div>
            </div>
          </div>
        </div>

        <!-- Error State -->
        <div v-else-if="error && (!offresData || offresData.length === 0)" class="text-center py-16 bg-gray-50 rounded-xl border border-gray-100">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">Impossible de charger les offres</h3>
          <p class="text-gray-600 mb-6 max-w-md mx-auto">{{ error.message || 'Une erreur est survenue.' }}</p>
          <button @click="refresh" class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-lic-dark hover:bg-black transition-all shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Réessayer
          </button>
        </div>

        <!-- Offers List -->
        <div v-else-if="offres.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NuxtLink
            v-for="offre in offres"
            :key="offre.id"
            :to="`/offres/${offre.slug}`"
            class="group bg-white rounded-xl border transition-all duration-300 flex flex-col p-6"
            :class="offre.statut === 'ouvert'
              ? 'border-gray-200 hover:border-lic-blue/50 hover:shadow-lg'
              : 'border-gray-100 opacity-70 hover:opacity-80'"
          >
            <!-- Header row -->
            <div class="flex items-start justify-between mb-4 gap-3">
              <span
                v-if="offre.departement"
                class="text-xs font-bold uppercase tracking-wide text-gray-500"
              >{{ offre.departement }}</span>
              <span
                class="shrink-0 inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full"
                :class="offre.statut === 'ouvert'
                  ? 'bg-green-50 text-green-700'
                  : 'bg-gray-100 text-gray-500'"
              >
                <span
                  class="w-1.5 h-1.5 rounded-full"
                  :class="offre.statut === 'ouvert' ? 'bg-green-500' : 'bg-gray-400'"
                ></span>
                {{ offre.statut === 'ouvert' ? 'Ouvert' : 'Fermé' }}
              </span>
            </div>

            <!-- Title -->
            <h2 class="text-lg font-black text-lic-dark leading-snug mb-3 group-hover:text-lic-blue transition-colors">
              {{ offre.titre }}
            </h2>

            <!-- Location -->
            <div v-if="offre.localisation" class="flex items-center gap-1.5 text-sm text-gray-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {{ offre.localisation }}
            </div>

            <!-- Footer badges + arrow -->
            <div class="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
              <div class="flex flex-wrap gap-2">
                <span v-if="offre.type_emploi" class="text-xs font-medium bg-lic-blue/10 text-lic-blue px-2.5 py-1 rounded-full">
                  {{ offre.type_emploi }}
                </span>
              </div>
              <span class="text-sm font-bold text-lic-blue flex items-center gap-1 group-hover:gap-2 transition-all">
                Voir
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          </NuxtLink>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-20 bg-gray-50 rounded-xl border border-gray-100">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-lic-blue/10 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-lic-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">Aucune offre pour le moment</h3>
          <p class="text-gray-600 max-w-md mx-auto">
            Revenez bientôt — de nouvelles opportunités seront publiées prochainement.
          </p>
          <NuxtLink to="/contact#contact-form" class="inline-flex items-center mt-6 px-6 py-3 bg-lic-dark text-white font-bold rounded-xl hover:bg-black transition-all">
            Candidature spontanée
          </NuxtLink>
        </div>

      </div>
    </section>

    <!-- CTA spontaneous application -->
    <section class="py-20 bg-gray-50 border-t border-gray-200">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="bg-white rounded-3xl p-8 md:p-16 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-10">
          <div class="max-w-lg">
            <h2 class="text-3xl font-black text-lic-dark mb-4">Vous ne trouvez pas votre bonheur ?</h2>
            <p class="text-gray-600 text-lg leading-relaxed">
              Envoyez-nous une candidature spontanée. Nous sommes toujours à la recherche de talents passionnés par la tech.
            </p>
          </div>
          <NuxtLink
            to="/contact#contact-form"
            class="shrink-0 inline-flex items-center px-8 py-4 font-bold rounded-xl text-white transition-all shadow-lg hover:shadow-xl hover:opacity-90"
            style="background-color: #D84315;"
          >
            Candidature spontanée
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>

  </div>
</template>
