<script setup>
import { marked } from 'marked'

const route = useRoute()
const slug = route.params.slug

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

const { data: offreRaw, pending, error } = await useAsyncData(`offre-${slug}`, async () => {
  await new Promise(resolve => setTimeout(resolve, INITIAL_DELAY_MS))

  let res
  let attempt = 0

  while (attempt <= MAX_RETRIES) {
    try {
      res = await withTimeout($fetch(`/api/offres/${slug}`), REQUEST_TIMEOUT_MS)
      break
    } catch (err) {
      attempt++
      if (attempt > MAX_RETRIES) throw err
      const delay = Math.min(attempt * RETRY_BASE_DELAY_MS, 6000)
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }

  return res
}, { lazy: true, server: false })

const offre = computed(() => {
  if (!offreRaw.value) return null
  const d = offreRaw.value
  return {
    id: d.id,
    titre: d.titre || d.attributes?.titre,
    slug: d.slug || d.attributes?.slug,
    localisation: d.localisation || d.attributes?.localisation,
    departement: d.departement || d.attributes?.departement,
    type_emploi: d.type_emploi || d.attributes?.type_emploi,
    statut: d.statut || d.attributes?.statut || 'ouvert',
    contenu: d.contenu || d.attributes?.contenu,
  }
})

const renderMd = (text) => {
  if (!text) return ''
  return marked.parse(text)
}

useHead(computed(() => ({
  title: offre.value ? `${offre.value.titre} – LIC Carrières` : 'Offre – LIC Carrières',
  meta: [
    { name: 'description', content: offre.value ? `Postulez pour le poste ${offre.value.titre} chez LO IT CONSULTING.` : '' }
  ]
})))

// ── Application form ──────────────────────────────────────────────
const form = ref({
  nom: '',
  email: '',
  telephone: '',
  linkedin: '',
  introduction: '',
})
const cvFile = ref(null)
const cvInput = ref(null)

const formState = ref('idle') // idle | submitting | success | error
const formError = ref('')

const onCvChange = (e) => {
  cvFile.value = e.target.files?.[0] || null
}

const handleSubmit = async () => {
  if (!offre.value) return
  formState.value = 'submitting'
  formError.value = ''

  try {
    const fd = new FormData()
    fd.append('nom', form.value.nom)
    fd.append('email', form.value.email)
    fd.append('telephone', form.value.telephone)
    fd.append('linkedin', form.value.linkedin)
    fd.append('introduction', form.value.introduction)
    fd.append('offre_titre', offre.value.titre)

    if (cvFile.value) {
      fd.append('cv', cvFile.value, cvFile.value.name)
    }

    await $fetch('/api/candidature', { method: 'POST', body: fd })
    formState.value = 'success'
  } catch (err) {
    formState.value = 'error'
    formError.value = err?.data?.statusMessage || err?.message || 'Une erreur est survenue. Veuillez réessayer.'
  }
}

const resetForm = () => {
  form.value = { nom: '', email: '', telephone: '', linkedin: '', introduction: '' }
  cvFile.value = null
  if (cvInput.value) cvInput.value.value = ''
  formState.value = 'idle'
  formError.value = ''
}
</script>

<template>
  <div class="bg-white min-h-screen">

    <!-- Loading State -->
    <div v-if="pending && !offre" class="max-w-7xl mx-auto px-6 lg:px-8 py-20">
      <div class="animate-pulse space-y-6">
        <div class="h-4 bg-gray-200 rounded w-1/4"></div>
        <div class="h-10 bg-gray-200 rounded w-2/3"></div>
        <div class="h-4 bg-gray-200 rounded w-1/3"></div>
        <div class="grid lg:grid-cols-3 gap-10 mt-12">
          <div class="lg:col-span-2 space-y-4">
            <div class="h-4 bg-gray-200 rounded"></div>
            <div class="h-4 bg-gray-200 rounded w-5/6"></div>
            <div class="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
          <div class="h-96 bg-gray-200 rounded-2xl"></div>
        </div>
      </div>
    </div>

    <!-- Error / 404 State -->
    <div v-else-if="error" class="max-w-7xl mx-auto px-6 lg:px-8 py-20 text-center">
      <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h1 class="text-2xl font-black text-gray-900 mb-2">
        {{ error.statusCode === 404 ? 'Offre introuvable' : 'Impossible de charger l\'offre' }}
      </h1>
      <p class="text-gray-500 mb-8">{{ error.statusCode === 404 ? 'Cette offre n\'existe pas ou a été supprimée.' : error.message }}</p>
      <NuxtLink to="/offres" class="inline-flex items-center gap-2 px-6 py-3 bg-lic-dark text-white font-bold rounded-xl hover:bg-black transition-all">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Retour aux offres
      </NuxtLink>
    </div>

    <!-- Offer Content -->
    <template v-else-if="offre">

      <!-- Hero section -->
      <section class="pt-16 pb-10 border-b border-gray-100">
        <div class="max-w-7xl mx-auto px-6 lg:px-8">
          <!-- Breadcrumb -->
          <nav class="flex items-center gap-2 text-sm text-gray-400 mb-8">
            <NuxtLink to="/offres" class="hover:text-lic-blue transition">Carrières</NuxtLink>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
            <span class="text-gray-600 truncate max-w-xs">{{ offre.titre }}</span>
          </nav>

          <div class="flex flex-wrap items-start gap-4 mb-4">
            <!-- Status badge -->
            <span
              class="inline-flex items-center gap-1.5 text-sm font-bold px-3 py-1.5 rounded-full"
              :class="offre.statut === 'ouvert' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'"
            >
              <span class="w-2 h-2 rounded-full" :class="offre.statut === 'ouvert' ? 'bg-green-500' : 'bg-gray-400'"></span>
              {{ offre.statut === 'ouvert' ? 'Poste ouvert' : 'Poste fermé' }}
            </span>
            <span v-if="offre.departement" class="text-sm font-bold uppercase tracking-wide text-gray-400 pt-1">{{ offre.departement }}</span>
          </div>

          <h1 class="text-3xl md:text-4xl font-black text-lic-dark mb-5 leading-tight">{{ offre.titre }}</h1>

          <div class="flex flex-wrap gap-4 text-sm text-gray-600">
            <span v-if="offre.localisation" class="flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {{ offre.localisation }}
            </span>
            <span v-if="offre.type_emploi" class="flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {{ offre.type_emploi }}
            </span>
          </div>
        </div>
      </section>

      <!-- Main 2-col layout -->
      <section class="py-12">
        <div class="max-w-7xl mx-auto px-6 lg:px-8">
          <div class="grid lg:grid-cols-3 gap-10 items-start">

            <!-- LEFT: Offer Details -->
            <div class="lg:col-span-2">
              <div v-if="offre.contenu" class="prose-content" v-html="renderMd(offre.contenu)"></div>
            </div>

            <!-- RIGHT: Sticky Form + Info -->
            <div class="lg:col-span-1">
              <div class="sticky top-24 space-y-6">

                <!-- Application Form Card -->
                <div class="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

                  <!-- Closed state -->
                  <div v-if="offre.statut === 'ferme'" class="p-8 text-center">
                    <div class="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <h3 class="font-black text-gray-700 text-lg mb-2">Ce poste n'est plus disponible</h3>
                    <p class="text-sm text-gray-500 mb-6">Les candidatures pour ce poste sont clôturées.</p>
                    <NuxtLink to="/offres" class="text-lic-blue font-bold text-sm hover:underline">Voir les autres offres →</NuxtLink>
                  </div>

                  <!-- Success state -->
                  <div v-else-if="formState === 'success'" class="p-8 text-center">
                    <div class="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 class="font-black text-gray-900 text-xl mb-2">Candidature envoyée !</h3>
                    <p class="text-gray-600 text-sm leading-relaxed mb-6">Nous avons bien reçu votre candidature. Nous reviendrons vers vous dans les meilleurs délais.</p>
                    <button @click="resetForm" class="text-sm text-gray-400 hover:text-gray-700 transition underline">Envoyer une autre candidature</button>
                  </div>

                  <!-- Form (open + idle/error/submitting) -->
                  <template v-else>
                    <div class="bg-lic-dark px-6 py-5">
                      <h2 class="text-white font-black text-lg">Formulaire de candidature</h2>
                    </div>

                    <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
                      <!-- Error banner -->
                      <div v-if="formState === 'error'" class="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
                        {{ formError }}
                      </div>

                      <div>
                        <label class="block text-sm font-bold text-lic-dark mb-1">Votre nom <span class="text-red-500">*</span></label>
                        <input
                          v-model="form.nom"
                          type="text"
                          required
                          placeholder="Prénom Nom"
                          class="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-lic-blue focus:ring-2 focus:ring-lic-blue/20 transition text-sm text-lic-dark"
                        />
                      </div>

                      <div>
                        <label class="block text-sm font-bold text-lic-dark mb-1">Votre e-mail <span class="text-red-500">*</span></label>
                        <input
                          v-model="form.email"
                          type="email"
                          required
                          placeholder="vous@exemple.com"
                          class="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-lic-blue focus:ring-2 focus:ring-lic-blue/20 transition text-sm text-lic-dark"
                        />
                      </div>

                      <div>
                        <label class="block text-sm font-bold text-lic-dark mb-1">Votre numéro de téléphone</label>
                        <input
                          v-model="form.telephone"
                          type="tel"
                          placeholder="+221 XX XXX XX XX"
                          class="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-lic-blue focus:ring-2 focus:ring-lic-blue/20 transition text-sm text-lic-dark"
                        />
                      </div>

                      <div>
                        <label class="block text-sm font-bold text-lic-dark mb-1">Profil LinkedIn</label>
                        <input
                          v-model="form.linkedin"
                          type="url"
                          placeholder="https://linkedin.com/in/votre-profil"
                          class="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-lic-blue focus:ring-2 focus:ring-lic-blue/20 transition text-sm text-lic-dark"
                        />
                      </div>

                      <div>
                        <label class="block text-sm font-bold text-lic-dark mb-1">Curriculum vitae</label>
                        <div class="relative">
                          <input
                            ref="cvInput"
                            type="file"
                            accept=".pdf,.doc,.docx"
                            @change="onCvChange"
                            class="block w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-lic-blue/10 file:text-lic-blue hover:file:bg-lic-blue/20 cursor-pointer border border-gray-200 rounded-lg bg-gray-50 focus:outline-none"
                          />
                        </div>
                        <p class="text-xs text-gray-400 mt-1">PDF, DOC — max 5 Mo. Fournissez un CV ou un profil LinkedIn.</p>
                      </div>

                      <div>
                        <label class="block text-sm font-bold text-lic-dark mb-1">Brève introduction</label>
                        <textarea
                          v-model="form.introduction"
                          rows="4"
                          placeholder="Introduction optionnelle ou questions sur le poste…"
                          class="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-lic-blue focus:ring-2 focus:ring-lic-blue/20 transition text-sm text-lic-dark resize-none"
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        :disabled="formState === 'submitting'"
                        class="w-full py-3 px-6 rounded-xl font-black text-white transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                        style="background-color: #D84315;"
                      >
                        <svg v-if="formState === 'submitting'" class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                        </svg>
                        {{ formState === 'submitting' ? 'Envoi en cours…' : 'Envoyer ma candidature' }}
                      </button>
                    </form>
                  </template>
                </div>

                <!-- Job info card -->
                <div class="bg-gray-50 rounded-2xl border border-gray-100 p-6 space-y-4 text-sm">
                  <div v-if="offre.titre">
                    <p class="text-xs font-bold text-gray-400 uppercase tracking-wide mb-0.5">Poste</p>
                    <p class="font-bold text-lic-dark">{{ offre.titre }}</p>
                  </div>
                  <div v-if="offre.localisation">
                    <p class="text-xs font-bold text-gray-400 uppercase tracking-wide mb-0.5">Lieu de travail</p>
                    <p class="text-gray-700">{{ offre.localisation }}</p>
                  </div>
                  <div v-if="offre.departement">
                    <p class="text-xs font-bold text-gray-400 uppercase tracking-wide mb-0.5">Département</p>
                    <p class="text-gray-700">{{ offre.departement }}</p>
                  </div>
                  <div v-if="offre.type_emploi">
                    <p class="text-xs font-bold text-gray-400 uppercase tracking-wide mb-0.5">Type d'emploi</p>
                    <p class="text-gray-700">{{ offre.type_emploi }}</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

    </template>

  </div>
</template>

<style scoped>
.section-title {
  @apply text-xl font-black text-lic-dark mb-4 pb-3 border-b border-gray-100;
}

.prose-section {
  @apply bg-white;
}

.prose-content :deep(p) {
  @apply text-gray-700 leading-relaxed mb-3 text-sm;
}

.prose-content :deep(ul) {
  @apply list-disc pl-5 space-y-1.5 mb-3;
}

.prose-content :deep(ol) {
  @apply list-decimal pl-5 space-y-1.5 mb-3;
}

.prose-content :deep(li) {
  @apply text-gray-700 text-sm leading-relaxed;
}

.prose-content :deep(h1),
.prose-content :deep(h2) {
  @apply text-xl font-black text-lic-dark mb-4 mt-10 pb-3 border-b border-gray-100;
}

.prose-content :deep(h3) {
  @apply font-black text-lic-dark mb-2 mt-6;
}

.prose-content :deep(strong) {
  @apply font-bold text-lic-dark;
}
</style>
