<script setup>
import { ref, onMounted } from 'vue'
import { useRollingNumbers } from '~/composables/useRollingNumbers'

// Import partner logos using standard Nuxt aliases
import orangeLogo from '~/assets/partners/orange.svg'
import waveLogo from '~/assets/partners/wave.png'
import ecobankLogo from '~/assets/partners/ecobank.png'
import freeLogo from '~/assets/partners/free.png'
import sgLogo from '~/assets/partners/sg.png'
import cbaoLogo from '~/assets/partners/cbao.png'
import auchanLogo from '~/assets/partners/auchan.png'
import canalLogo from '~/assets/partners/canal.png'

const heroImg = 'https://images.unsplash.com/photo-1573164574572-cb89e39749b4?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

const { animateOnIntersection } = useRollingNumbers()

const projects = ref(0)
const satisfaction = ref(0)
const years = ref(0)

const partners = [
  { name: 'Sonatel Orange', url: orangeLogo },
  { name: 'Wave', url: waveLogo },
  { name: 'Ecobank', url: ecobankLogo },
  { name: 'Free', url: freeLogo },
  { name: 'Société Générale', url: sgLogo },
  { name: 'CBAO', url: cbaoLogo },
  { name: 'Auchan', url: auchanLogo },
  { name: 'Canal+', url: canalLogo },
]

const scrollContainer = ref(null)

const scrollLeft = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({ left: -400, behavior: 'smooth' })
  }
}

const scrollRight = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({ left: 400, behavior: 'smooth' })
  }
}

onMounted(() => {
  animateOnIntersection('.stat-number', [200, 98, 15], 3)
})
</script>

<template>
  <div class="bg-white">
    <!-- Full Screen Hero -->
    <section class="relative h-screen flex flex-col justify-center items-center overflow-hidden bg-lic-dark">
        <!-- Background Image -->
        <div class="absolute inset-0 z-0">
             <img :src="heroImg" width="1600" height="900" alt="Innovation Digitale" class="w-full h-full object-cover opacity-40" loading="eager" decoding="async" fetchpriority="high" />
             <div class="absolute inset-0 bg-gradient-to-b from-lic-dark/90 via-lic-dark/40 to-transparent opacity-90"></div>
        </div>

        <!-- Content -->
        <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center flex flex-col justify-center h-full pt-16">
            <h1 class="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight leading-tight" style="will-change: transform; contain: layout style paint;">
                L'expertise IT au service de <br class="hidden md:block" />
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-lic-orange to-lic-blue inline-block">l'Afrique Digitale</span>
            </h1>
            <p class="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-2xl mx-auto">
                LO IT CONSULTING transforme les défis technologiques en opportunités de croissance. Formation, développement, cloud, et conseil pour propulser votre entreprise vers l'avenir.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <NuxtLink to="/services" class="bg-lic-blue hover:bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-lic-blue/50">
                    Découvrir les Services
                </NuxtLink>
                <NuxtLink to="/portfolio" class="bg-transparent border-2 border-white text-white hover:bg-white hover:text-lic-dark px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:-translate-y-1">
                    Nos Réalisations
                </NuxtLink>
            </div>
        </div>
        
        <!-- Scroll Indicator -->
        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-white/50">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
        </div>
    </section>

    <!-- Stats Section -->
    <section class="bg-lic-dark text-white py-20 relative z-20 border-t border-white/10">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div class="p-6 rounded-2xl hover:bg-white/5 transition duration-300">
            <p class="text-6xl font-black text-lic-orange mb-4"><span class="stat-number">0</span>+</p>
            <p class="text-xl text-gray-300 font-medium uppercase tracking-wider">Projets Réalisés</p>
          </div>
          <div class="p-6 rounded-2xl hover:bg-white/5 transition duration-300">
            <p class="text-6xl font-black text-lic-orange mb-4"><span class="stat-number">0</span>%</p>
            <p class="text-xl text-gray-300 font-medium uppercase tracking-wider">Clients Satisfaits</p>
          </div>
          <div class="p-6 rounded-2xl hover:bg-white/5 transition duration-300">
            <p class="text-6xl font-black text-lic-orange mb-4"><span class="stat-number">0</span>+</p>
            <p class="text-xl text-gray-300 font-medium uppercase tracking-wider">Années d'Expertise</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Preview - Modern Visual Cards -->
    <section class="py-20 bg-gradient-to-b from-white to-gray-50">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <span class="text-lic-orange-dark font-bold tracking-widest uppercase text-sm mb-4 block">Nos Services</span>
          <h2 class="text-4xl md:text-5xl font-black text-lic-dark mb-4 tracking-tight">
            Nos Domaines d'Expertise
          </h2>
          <p class="text-lg text-gray-600">
            Solutions complètes pour accompagner votre transformation digitale
          </p>
        </div>

        <!-- Services Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          <!-- Service 1: Développement Sur Mesure -->
          <div class="group relative overflow-hidden rounded-3xl min-h-[32rem] shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
            <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" width="1000" height="600" alt="Développement" class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div class="absolute inset-0 bg-gradient-to-t from-lic-dark via-lic-dark/60 to-transparent opacity-95 transition duration-300"></div>
            <div class="relative z-10 h-full flex flex-col justify-between p-8 text-white">
              <div class="mt-auto">
                <h3 class="text-4xl font-black mb-4 leading-tight">Développement Sur Mesure</h3>
                <p class="text-gray-100 leading-relaxed mb-6">Solutions technologiques robustes et scalables, adaptées à vos besoins spécifiques. De la conception à la livraison.</p>
                <div class="space-y-3 text-sm text-gray-200 mb-8">
                  <p class="flex items-center"><span class="text-lic-orange mr-3 font-bold text-lg">•</span> Frontend: React, Vue.js, TypeScript</p>
                  <p class="flex items-center"><span class="text-lic-orange mr-3 font-bold text-lg">•</span> Backend: Node.js, Python, Java</p>
                  <p class="flex items-center"><span class="text-lic-orange mr-3 font-bold text-lg">•</span> Mobile & APIs: iOS, Android</p>
                </div>
                <NuxtLink to="/services" class="inline-block bg-lic-blue hover:bg-blue-600 text-white font-bold px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105">
                  Discuter de Votre Projet →
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- Service 2: Cloud & DevOps -->
          <div class="group relative overflow-hidden rounded-3xl min-h-[32rem] shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
            <img src="https://images.unsplash.com/photo-1551721434-8b94ddff0e6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" width="1000" height="600" alt="Cloud & DevOps" class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div class="absolute inset-0 bg-gradient-to-t from-lic-dark via-lic-dark/60 to-transparent opacity-95 transition duration-300"></div>
            <div class="relative z-10 h-full flex flex-col justify-between p-8 text-white">
              <div class="mt-auto">
                <h3 class="text-4xl font-black mb-4 leading-tight">Cloud & DevOps</h3>
                <p class="text-gray-100 leading-relaxed mb-6">Infrastructure moderne et sécurisée. De la migration à la gestion continue, nous assurons la scalabilité.</p>
                <div class="space-y-3 text-sm text-gray-200 mb-8">
                  <p class="flex items-center"><span class="text-lic-orange mr-3 font-bold text-lg">•</span> Cloud Platforms: AWS, Azure, GCP</p>
                  <p class="flex items-center"><span class="text-lic-orange mr-3 font-bold text-lg">•</span> Containerization: Docker, K8s</p>
                  <p class="flex items-center"><span class="text-lic-orange mr-3 font-bold text-lg">•</span> CI/CD & Monitoring: GitHub Actions</p>
                </div>
                <NuxtLink to="/services" class="inline-block bg-lic-orange-dark hover:bg-orange-800 text-white font-bold px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105">
                  Planifier votre Migration →
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- Service 3: Conseil Technologique -->
          <div class="group relative overflow-hidden rounded-3xl min-h-[32rem] shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
            <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" width="1000" height="600" alt="Conseil Tech" class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div class="absolute inset-0 bg-gradient-to-t from-lic-dark via-lic-dark/60 to-transparent opacity-95 transition duration-300"></div>
            <div class="relative z-10 h-full flex flex-col justify-between p-8 text-white">
              <div class="mt-auto">
                <h3 class="text-4xl font-black mb-4 leading-tight">Conseil Technologique</h3>
                <p class="text-gray-100 leading-relaxed mb-6">Guidance stratégique pour naviguer votre transformation digitale. Alignez la technologie avec vos objectifs métier.</p>
                <div class="space-y-3 text-sm text-gray-200 mb-8">
                  <p class="flex items-center"><span class="text-lic-orange mr-3 font-bold text-lg">•</span> Audit Technologique complet</p>
                  <p class="flex items-center"><span class="text-lic-orange mr-3 font-bold text-lg">•</span> Stratégie IT & Digital Transformation</p>
                  <p class="flex items-center"><span class="text-lic-orange mr-3 font-bold text-lg">•</span> Sécurité & Compliance Réglementaire</p>
                </div>
                <NuxtLink to="/services" class="inline-block bg-lic-blue hover:bg-blue-600 text-white font-bold px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105">
                  Demander une Consultation →
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- Service 4: Formation IT -->
          <div class="group relative overflow-hidden rounded-3xl min-h-[32rem] shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" width="1000" height="600" alt="Formation IT" class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div class="absolute inset-0 bg-gradient-to-t from-lic-dark via-lic-dark/60 to-transparent opacity-95 transition duration-300"></div>
            <div class="relative z-10 h-full flex flex-col justify-between p-8 text-white">
              <div class="mt-auto">
                <h3 class="text-4xl font-black mb-4 leading-tight">Formation IT</h3>
                <p class="text-gray-100 leading-relaxed mb-6">Développez les compétences de votre équipe avec nos programmes de formation reconnus, conçus par des experts de l'industrie.</p>
                <div class="space-y-3 text-sm text-gray-200 mb-8">
                  <p class="flex items-center"><span class="text-lic-orange mr-3 font-bold text-lg">•</span> Web Development, React, Vue.js</p>
                  <p class="flex items-center"><span class="text-lic-orange mr-3 font-bold text-lg">•</span> Mobile Apps: React Native, Flutter</p>
                  <p class="flex items-center"><span class="text-lic-orange mr-3 font-bold text-lg">•</span> DevOps & Cloud, Certifications</p>
                </div>
                <NuxtLink to="/services" class="inline-block bg-lic-orange-dark hover:bg-orange-800 text-white font-bold px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105">
                  Demander une Formation →
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-16 text-center">
          <NuxtLink to="/services" class="inline-flex items-center bg-lic-dark text-white hover:bg-lic-blue font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
            Voir Tous les Services <span class="ml-3 text-xl">→</span>
          </NuxtLink>
        </div>
      </div>
    </section>



    <!-- Why Us Redesigned -->
    <section class="py-32 bg-gray-50 relative overflow-hidden">
      <!-- Decorative elements -->
      <div class="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-lic-blue/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-lic-orange/10 rounded-full blur-3xl"></div>

      <div class="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div class="text-center max-w-3xl mx-auto mb-20">
          <span class="text-lic-orange-dark font-bold tracking-widest uppercase text-sm mb-4 block">Pourquoi Nous ?</span>
          <h2 class="text-4xl md:text-5xl font-black text-lic-dark mb-6 tracking-tight leading-tight">
            Nous ne fournissons pas seulement du code, nous livrons de la <span class="text-lic-blue">valeur.</span>
          </h2>
          <p class="text-xl text-gray-600">
             L'excellence technique alliée à une compréhension stratégique de vos enjeux business.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div class="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 relative overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-lic-blue/20 to-transparent rounded-bl-full -mr-10 -mt-10 transition-all group-hover:scale-110 duration-500"></div>
            <div class="relative z-10">
                <div class="w-14 h-14 bg-lic-blue text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:rotate-6 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                </div>
                <h3 class="text-2xl font-bold text-lic-dark mb-4">Vitesse & Agilité</h3>
                <p class="text-gray-600 leading-relaxed">
                Nous utilisons des méthodologies agiles pour livrer des produits fonctionnels rapidement, réduisant votre time-to-market de 40%.
                </p>
            </div>
          </div>

          <!-- Feature 2 -->
          <div class="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 relative overflow-hidden">
             <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-lic-orange/20 to-transparent rounded-bl-full -mr-10 -mt-10 transition-all group-hover:scale-110 duration-500"></div>
             <div class="relative z-10">
                <div class="w-14 h-14 bg-lic-orange text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:rotate-6 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                </div>
                <h3 class="text-2xl font-bold text-lic-dark mb-4">Qualité Mondiale</h3>
                <p class="text-gray-600 leading-relaxed">
                Nos standards de développement rivalisent avec la Silicon Valley. Code propre, tests rigoureux et architecture scalable.
                </p>
            </div>
          </div>

          <!-- Feature 3 -->
          <div class="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 relative overflow-hidden">
             <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-lic-dark/20 to-transparent rounded-bl-full -mr-10 -mt-10 transition-all group-hover:scale-110 duration-500"></div>
             <div class="relative z-10">
                <div class="w-14 h-14 bg-lic-dark text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:rotate-6 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                </div>
                <h3 class="text-2xl font-bold text-lic-dark mb-4">Partenaire Local</h3>
                <p class="text-gray-600 leading-relaxed">
                Une compréhension profonde du marché africain combinée à une expertise technique pour des solutions qui marchent vraiment ici.
                </p>
             </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Projects Preview -->
    <section class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 class="text-3xl font-black text-lic-dark mb-2">Réalisations Récentes</h2>
            <p class="text-gray-600">Un aperçu de notre savoir-faire.</p>
          </div>
          <NuxtLink to="/portfolio" class="hidden md:inline-flex items-center font-bold text-lic-blue hover:text-lic-orange transition-colors">
            Voir tout le portfolio <span class="ml-2">→</span>
          </NuxtLink>
        </div>

        <div class="relative">
            <!-- Scroll Buttons -->
            <button @click="scrollLeft" aria-label="Défiler vers la gauche" class="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-10 bg-white p-3 rounded-full shadow-lg text-lic-dark hover:text-lic-orange transition hidden md:block">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button @click="scrollRight" aria-label="Défiler vers la droite" class="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10 bg-white p-3 rounded-full shadow-lg text-lic-dark hover:text-lic-orange transition hidden md:block">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
            </button>

            <div ref="scrollContainer" class="flex overflow-x-auto gap-8 pb-8 snap-x snap-mandatory hide-scrollbar">
              <!-- Project 1 -->
              <div class="min-w-[85vw] md:min-w-[400px] snap-center group relative overflow-hidden rounded-2xl aspect-video cursor-pointer">
                <img src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Projet 1" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span class="text-lic-orange-dark text-xs font-bold tracking-wider uppercase mb-2">FinTech</span>
                  <h3 class="text-white text-xl font-bold">Plateforme de Paiement</h3>
                </div>
              </div>
              <!-- Project 2 -->
              <div class="min-w-[85vw] md:min-w-[400px] snap-center group relative overflow-hidden rounded-2xl aspect-video cursor-pointer">
                <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Projet 2" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span class="text-lic-orange-dark text-xs font-bold tracking-wider uppercase mb-2">E-Santé</span>
                  <h3 class="text-white text-xl font-bold">Gestion Hospitalière</h3>
                </div>
              </div>
              <!-- Project 3 -->
              <div class="min-w-[85vw] md:min-w-[400px] snap-center group relative overflow-hidden rounded-2xl aspect-video cursor-pointer">
                 <img src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Projet 3" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span class="text-lic-orange-dark text-xs font-bold tracking-wider uppercase mb-2">Éducation</span>
                  <h3 class="text-white text-xl font-bold">LMS Universitaire</h3>
                </div>
              </div>
              <!-- Project 4 (Extra for scrolling demo) -->
              <div class="min-w-[85vw] md:min-w-[400px] snap-center group relative overflow-hidden rounded-2xl aspect-video cursor-pointer">
                 <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Projet 4" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span class="text-lic-orange-dark text-xs font-bold tracking-wider uppercase mb-2">Analytics</span>
                  <h3 class="text-white text-xl font-bold">Dashboard Business</h3>
                </div>
              </div>
            </div>
        </div>
        
        <div class="mt-8 text-center md:hidden">
           <NuxtLink to="/portfolio" class="inline-flex items-center font-bold text-lic-blue hover:text-lic-orange transition-colors">
            Voir tout le portfolio <span class="ml-2">→</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Partners / Trust Section -->
    <section class="py-16 bg-white border-t border-gray-100 overflow-hidden">
        <div class="max-w-7xl mx-auto px-6 lg:px-8 mb-12 text-center">
             <p class="text-gray-600 font-bold uppercase tracking-widest text-sm">ILS NOUS FONT CONFIANCE</p>
        </div>
        
        <div class="relative flex overflow-x-hidden group">
            <div class="py-4 animate-marquee whitespace-nowrap flex items-center gap-32 px-16 min-w-full w-max">
                <img v-for="(logo, index) in partners" :key="index" :src="logo.url" width="150" height="96" :alt="logo.name" class="h-24 w-auto flex-shrink-0 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 transform hover:scale-110" />
                 <!-- Duplicate for seamless loop -->
                <img v-for="(logo, index) in partners" :key="'dup1-' + index" :src="logo.url" width="150" height="96" :alt="logo.name" class="h-24 w-auto flex-shrink-0 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 transform hover:scale-110" />
            </div>
             <!-- Fade effect sides -->
            <div class="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
            <div class="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>
        </div>
    </section>
  </div>
</template>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.animate-marquee {
  animation: marquee 40s linear infinite;
}
@keyframes marquee {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
}
</style>