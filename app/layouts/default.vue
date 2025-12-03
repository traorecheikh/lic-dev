<script setup>
import { ref } from 'vue'
import licLogo from '~/assets/LIC.png'

const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-white" style="font-family: 'Montserrat', sans-serif;">
    <!-- Header/Navigation -->
    <header class="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="flex justify-between items-center h-20">
          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center gap-2 hover:opacity-70 transition" @click="closeMobileMenu">
            <img :src="licLogo" width="150" height="48" alt="LIC Logo" class="h-12 w-auto" />
          </NuxtLink>

          <!-- Desktop Navigation Menu -->
          <nav class="hidden md:flex items-center gap-8">
            <NuxtLink to="/" class="text-gray-700 hover:text-gray-900 font-medium transition text-sm">
              Accueil
            </NuxtLink>
            <NuxtLink to="/about" class="text-gray-700 hover:text-gray-900 font-medium transition text-sm">
              À Propos
            </NuxtLink>
            <NuxtLink to="/services" class="text-gray-700 hover:text-gray-900 font-medium transition text-sm">
              Services
            </NuxtLink>
            <NuxtLink to="/equipe" class="text-gray-700 hover:text-gray-900 font-medium transition text-sm">
              Équipe
            </NuxtLink>
            <NuxtLink to="/portfolio" class="text-gray-700 hover:text-gray-900 font-medium transition text-sm">
              Nos Réalisations
            </NuxtLink>
            <NuxtLink to="/formation-gratuite" class="text-gray-700 hover:text-gray-900 font-medium transition text-sm">
              Formation Gratuite
            </NuxtLink>
          </nav>

          <div class="flex items-center gap-3">
             <!-- Demo Button (Primary) -->
            <NuxtLink to="/contact?subject=Demander une demo#contact-form" class="hidden sm:block text-white font-bold text-sm px-5 py-2.5 rounded-lg transition hover:opacity-90" style="background-color: #D84315;">
              Demander une Démo
            </NuxtLink>

            <!-- Contact Button (Secondary - Outlined) -->
            <NuxtLink to="/contact#contact-form" class="hidden sm:block text-lic-blue font-bold text-sm px-5 py-2.5 rounded-lg border-2 border-lic-blue transition hover:bg-lic-blue hover:text-white">
              Nous Contacter
            </NuxtLink>

            <!-- Mobile Menu Button -->
            <button @click="toggleMobileMenu" aria-label="Ouvrir le menu" class="md:hidden p-2 text-gray-600 hover:text-gray-900 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Menu Overlay -->
      <div v-if="mobileMenuOpen" class="md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-200 shadow-lg py-4 px-6 flex flex-col gap-4 z-40">
        <NuxtLink to="/" class="text-gray-700 hover:text-orange-500 font-medium py-2 border-b border-gray-100" @click="closeMobileMenu">
          Accueil
        </NuxtLink>
        <NuxtLink to="/about" class="text-gray-700 hover:text-orange-500 font-medium py-2 border-b border-gray-100" @click="closeMobileMenu">
          À Propos
        </NuxtLink>
        <NuxtLink to="/services" class="text-gray-700 hover:text-orange-500 font-medium py-2 border-b border-gray-100" @click="closeMobileMenu">
          Services
        </NuxtLink>
        <NuxtLink to="/equipe" class="text-gray-700 hover:text-orange-500 font-medium py-2 border-b border-gray-100" @click="closeMobileMenu">
          Équipe
        </NuxtLink>
        <NuxtLink to="/portfolio" class="text-gray-700 hover:text-orange-500 font-medium py-2 border-b border-gray-100" @click="closeMobileMenu">
          Nos Réalisations
        </NuxtLink>
        <NuxtLink to="/formation-gratuite" class="text-gray-700 hover:text-orange-500 font-medium py-2 border-b border-gray-100" @click="closeMobileMenu">
          Formation Gratuite
        </NuxtLink>
        <div class="flex flex-col gap-3 mt-4">
          <NuxtLink to="/contact?subject=Demander une demo#contact-form" class="text-center text-white font-bold text-sm px-6 py-3 rounded-lg transition hover:opacity-90" style="background-color: #D84315;" @click="closeMobileMenu">
            Demander une Démo
          </NuxtLink>
          <NuxtLink to="/contact#contact-form" class="text-center text-lic-blue font-bold text-sm px-6 py-3 rounded-lg border-2 border-lic-blue transition hover:bg-lic-blue hover:text-white" @click="closeMobileMenu">
            Nous Contacter
          </NuxtLink>
        </div>
      </div>
    </header> <!-- Re-added closing header tag -->

    <!-- Main Content -->
    <main class="flex-grow" @click="closeMobileMenu">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 text-gray-300 py-20" style="border-top: 4px solid #FF5722;">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <!-- Main Footer Content -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          <!-- Column 1: Company Info -->
          <div class="lg:col-span-2">
            <div class="flex items-center gap-3 mb-6">
              <img :src="licLogo" width="125" height="40" alt="LIC Logo" class="h-10 w-auto" />
            </div>
            <p class="text-gray-300 text-sm leading-relaxed mb-6">
              L'expertise IT au service de l'Afrique Digitale. Transformation digitale, Formation, Développement, Cloud & DevOps.
            </p>
            <div class="flex gap-4">
              <a href="#" class="w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-600 text-white flex items-center justify-center transition text-sm font-bold">f</a>
              <a href="#" class="w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-600 text-white flex items-center justify-center transition text-sm font-bold">in</a>
              <a href="#" class="w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-600 text-white flex items-center justify-center transition text-sm font-bold">@</a>
            </div>
          </div>

          <!-- Column 2: Services -->
          <div>
            <h4 class="text-white font-black text-sm mb-6 tracking-widest">SERVICES</h4>
            <ul class="space-y-3 text-sm">
              <li><a href="#" class="text-gray-300 hover:text-lic-orange-dark transition">Formation IT</a></li>
              <li><a href="#" class="text-gray-300 hover:text-lic-orange-dark transition">Développement</a></li>
              <li><a href="#" class="text-gray-300 hover:text-lic-orange-dark transition">Cloud & DevOps</a></li>
              <li><a href="#" class="text-gray-300 hover:text-lic-orange-dark transition">Conseil Tech</a></li>
            </ul>
          </div>

          <!-- Column 3: Links -->
          <div>
            <h4 class="text-white font-black text-sm mb-6 tracking-widest">NAVIGATION</h4>
            <ul class="space-y-3 text-sm">
              <li><NuxtLink to="/" class="text-gray-300 hover:text-lic-orange-dark transition">Accueil</NuxtLink></li>
              <li><NuxtLink to="/about" class="text-gray-300 hover:text-lic-orange-dark transition">À Propos</NuxtLink></li>
              <li><NuxtLink to="/services" class="text-gray-300 hover:text-lic-orange-dark transition">Services</NuxtLink></li>
              <li><NuxtLink to="/equipe" class="text-gray-300 hover:text-lic-orange-dark transition">Équipe</NuxtLink></li>
              <li><NuxtLink to="/portfolio" class="text-gray-300 hover:text-lic-orange-dark transition">Portfolio</NuxtLink></li>
            </ul>
          </div>

          <!-- Column 4: Contact -->
          <div>
            <h4 class="text-white font-black text-sm mb-6 tracking-widest">CONTACT</h4>
            <div class="space-y-4 text-sm">
              <div>
                <p class="text-orange-500 font-bold text-xs mb-1">TÉLÉPHONE</p>
                <p class="text-white">+221 77 230 60 78</p>
              </div>
              <div>
                <p class="text-orange-500 font-bold text-xs mb-1">EMAIL</p>
                <p class="text-white">contact@loitconsulting.com</p>
              </div>
              <div>
                <p class="text-orange-500 font-bold text-xs mb-1">ADRESSE</p>
                <p class="text-gray-300 text-xs">CICES FOIRE VILLA 111<br/>Dakar, Sénégal</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Divider & Bottom Footer -->
        <div style="border-top: 1px solid #374151;" class="pt-8">
          <div class="flex flex-col md:flex-row justify-between items-center gap-6">
            <p class="text-gray-500 text-xs">
              © 2025 LO IT CONSULTING. Tous droits réservés.
            </p>
            <div class="flex gap-6 text-xs">
              <a href="#" class="text-gray-400 hover:text-lic-orange-dark transition">Politique de Confidentialité</a>
              <a href="#" class="text-gray-400 hover:text-lic-orange-dark transition">Conditions d'Utilisation</a>
              <a href="#" class="text-gray-400 hover:text-lic-orange-dark transition">Mentions Légales</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
