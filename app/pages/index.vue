<script setup>
const heroImg = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80'
</script>

<template>
  <div class="bg-white">
    <!-- Hero Section -->
    <section class="min-h-screen flex items-center bg-white">
      <div class="max-w-7xl mx-auto px-6 lg:px-8 py-20 w-full flex flex-col lg:flex-row items-center">
        <div class="max-w-2xl lg:w-1/2">
          <h1 class="text-5xl md:text-7xl font-black text-lic-dark mb-6 leading-tight tracking-tight">
            L'expertise IT au service de l'Afrique Digitale
          </h1>
          <p class="text-lg text-gray-600 mb-10 leading-relaxed max-w-xl">
            LO IT CONSULTING transforme les défis technologiques en opportunités de croissance. Formation, développement, cloud, et conseil pour propulser votre entreprise vers l'avenir.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <NuxtLink to="/services" class="bg-lic-blue hover:bg-blue-700 text-white px-8 py-4 font-bold text-center transition duration-300">
              Découvrir les Services
            </NuxtLink>
            <NuxtLink to="/portfolio" class="border-2 border-lic-dark text-lic-dark hover:bg-lic-light px-8 py-4 font-bold text-center transition duration-300">
              Nos Réalisations
            </NuxtLink>
          </div>
        </div>
        <!-- Right side: visual element -->
        <div class="hidden lg:block flex-1 lg:w-1/2 ml-0 lg:ml-12 mt-12 lg:mt-0">
          <div class="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition duration-700">
             <div class="absolute inset-0 bg-gradient-to-tr from-lic-blue/30 to-transparent z-10"></div>
             <img :src="heroImg" alt="Innovation Digitale" class="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="bg-lic-dark text-white py-16">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <p class="text-5xl font-black text-lic-orange mb-2">200+</p>
            <p class="text-gray-300 font-medium">Projets Réalisés</p>
          </div>
          <div>
            <p class="text-5xl font-black text-lic-orange mb-2">98%</p>
            <p class="text-gray-300 font-medium">Clients Satisfaits</p>
          </div>
          <div>
            <p class="text-5xl font-black text-lic-orange mb-2">15+</p>
            <p class="text-gray-300 font-medium">Années d'Expertise</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Preview -->
    <section class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="max-w-2xl mb-16">
          <h2 class="text-4xl md:text-5xl font-black text-lic-dark mb-4 tracking-tight">
            Nos Domaines d'Expertise
          </h2>
          <p class="text-lg text-gray-600">
            Solutions complètes pour accompagner votre transformation digitale
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Service 1 -->
          <div class="border-l-4 border-lic-orange p-8 hover:bg-lic-light transition duration-300">
            <h3 class="text-xl font-bold text-lic-dark mb-3">Formation IT</h3>
            <p class="text-gray-600 text-sm leading-relaxed mb-6">
              Développez les compétences de votre équipe avec nos programmes de formation reconnus.
            </p>
            <ul class="text-sm text-gray-700 space-y-2">
              <li>• Web Development</li>
              <li>• Mobile Apps</li>
              <li>• DevOps & Cloud</li>
            </ul>
          </div>

          <!-- Service 2 -->
          <div class="border-l-4 border-lic-orange p-8 hover:bg-lic-light transition duration-300">
            <h3 class="text-xl font-bold text-lic-dark mb-3">Développement</h3>
            <p class="text-gray-600 text-sm leading-relaxed mb-6">
              Solutions technologiques sur mesure adaptées à vos besoins spécifiques.
            </p>
            <ul class="text-sm text-gray-700 space-y-2">
              <li>• Frontend & Backend</li>
              <li>• Applications Mobiles</li>
              <li>• APIs & Intégrations</li>
            </ul>
          </div>

          <!-- Service 3 -->
          <div class="border-l-4 border-lic-orange p-8 hover:bg-lic-light transition duration-300">
            <h3 class="text-xl font-bold text-lic-dark mb-3">Cloud & DevOps</h3>
            <p class="text-gray-600 text-sm leading-relaxed mb-6">
              Infrastructure moderne, sécurisée et scalable pour votre croissance.
            </p>
            <ul class="text-sm text-gray-700 space-y-2">
              <li>• AWS & Azure</li>
              <li>• Containerization</li>
              <li>• CI/CD Pipelines</li>
            </ul>
          </div>

          <!-- Service 4 -->
          <div class="border-l-4 border-lic-orange p-8 hover:bg-lic-light transition duration-300">
            <h3 class="text-xl font-bold text-lic-dark mb-3">Conseil Tech</h3>
            <p class="text-gray-600 text-sm leading-relaxed mb-6">
              Guidance stratégique pour naviguer votre transformation digitale.
            </p>
            <ul class="text-sm text-gray-700 space-y-2">
              <li>• Audit Technologique</li>
              <li>• Stratégie IT</li>
              <li>• Sécurité & Compliance</li>
            </ul>
          </div>
        </div>

        <div class="mt-12 text-center">
          <NuxtLink to="/services" class="text-lic-blue hover:text-lic-orange font-bold transition">
            Voir Tous les Services →
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Why Us Redesigned -->
    <section class="py-24 bg-gray-50 relative overflow-hidden">
      <!-- Decorative blobs -->
      <div class="absolute top-0 left-0 w-64 h-64 bg-lic-blue/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-lic-orange/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

      <div class="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div class="text-center max-w-3xl mx-auto mb-20">
          <h2 class="text-4xl md:text-5xl font-black text-lic-dark mb-6 tracking-tight">
            Pourquoi les Leaders nous Choisissent
          </h2>
          <p class="text-xl text-gray-600">
            Nous ne fournissons pas seulement du code, nous livrons de la valeur commerciale tangible.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
          <!-- Feature 1 -->
          <div class="group bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div class="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-lic-blue transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-lic-blue group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-lic-dark mb-4">Vitesse & Agilité</h3>
            <p class="text-gray-600 leading-relaxed">
              Nous utilisons des méthodologies agiles pour livrer des produits fonctionnels rapidement, réduisant votre time-to-market de 40%.
            </p>
          </div>

          <!-- Feature 2 -->
          <div class="group bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
             <div class="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-lic-orange transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-lic-orange group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-lic-dark mb-4">Qualité Mondiale</h3>
            <p class="text-gray-600 leading-relaxed">
              Nos standards de développement rivalisent avec la Silicon Valley. Code propre, tests rigoureux et architecture scalable.
            </p>
          </div>

          <!-- Feature 3 -->
          <div class="group bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
             <div class="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-lic-dark transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="group relative overflow-hidden rounded-2xl aspect-video cursor-pointer">
            <img src="@/assets/project1.png" alt="Projet 1" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <span class="text-lic-orange text-xs font-bold tracking-wider uppercase mb-2">FinTech</span>
              <h3 class="text-white text-xl font-bold">Plateforme de Paiement</h3>
            </div>
          </div>
          <div class="group relative overflow-hidden rounded-2xl aspect-video cursor-pointer">
            <img src="@/assets/project2.png" alt="Projet 2" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <span class="text-lic-orange text-xs font-bold tracking-wider uppercase mb-2">E-Santé</span>
              <h3 class="text-white text-xl font-bold">Gestion Hospitalière</h3>
            </div>
          </div>
          <div class="group relative overflow-hidden rounded-2xl aspect-video cursor-pointer">
             <img src="@/assets/project3.png" alt="Projet 3" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <span class="text-lic-orange text-xs font-bold tracking-wider uppercase mb-2">Éducation</span>
              <h3 class="text-white text-xl font-bold">LMS Universitaire</h3>
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
  </div>
</template>
