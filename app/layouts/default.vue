<script setup>
import licLogo from '~/assets/LIC.png'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-white" style="font-family: 'Montserrat', sans-serif;">
    <!-- Header/Navigation -->
    <header class="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="flex justify-between items-center h-20">
          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center gap-2 hover:opacity-70 transition">
            <img :src="licLogo" alt="LIC Logo" class="h-12" />
          </NuxtLink>

          <!-- Navigation Menu -->
          <nav class="hidden md:flex items-center gap-12">
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
              Portfolio
            </NuxtLink>
          </nav>

          <!-- CTA Button -->
          <NuxtLink to="/contact" class="text-white font-bold text-sm px-6 py-2.5 transition hover:opacity-90" style="background-color: #FF5722;">
            Devis
          </NuxtLink>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-grow">
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
              <img :src="licLogo" alt="LIC Logo" class="h-10" />
            </div>
            <p class="text-gray-400 text-sm leading-relaxed mb-6">
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
              <li><a href="#" class="text-gray-400 hover:text-orange-500 transition">Formation IT</a></li>
              <li><a href="#" class="text-gray-400 hover:text-orange-500 transition">Développement</a></li>
              <li><a href="#" class="text-gray-400 hover:text-orange-500 transition">Cloud & DevOps</a></li>
              <li><a href="#" class="text-gray-400 hover:text-orange-500 transition">Conseil Tech</a></li>
            </ul>
          </div>

          <!-- Column 3: Links -->
          <div>
            <h4 class="text-white font-black text-sm mb-6 tracking-widest">NAVIGATION</h4>
            <ul class="space-y-3 text-sm">
              <li><NuxtLink to="/" class="text-gray-400 hover:text-orange-500 transition">Accueil</NuxtLink></li>
              <li><NuxtLink to="/about" class="text-gray-400 hover:text-orange-500 transition">À Propos</NuxtLink></li>
              <li><NuxtLink to="/services" class="text-gray-400 hover:text-orange-500 transition">Services</NuxtLink></li>
              <li><NuxtLink to="/equipe" class="text-gray-400 hover:text-orange-500 transition">Équipe</NuxtLink></li>
              <li><NuxtLink to="/portfolio" class="text-gray-400 hover:text-orange-500 transition">Portfolio</NuxtLink></li>
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
                <p class="text-gray-400 text-xs">CICES FOIRE VILLA 111<br/>Dakar, Sénégal</p>
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
              <a href="#" class="text-gray-500 hover:text-orange-500 transition">Politique de Confidentialité</a>
              <a href="#" class="text-gray-500 hover:text-orange-500 transition">Conditions d'Utilisation</a>
              <a href="#" class="text-gray-500 hover:text-orange-500 transition">Mentions Légales</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
