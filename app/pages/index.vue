<script setup>
const heroImg = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80'
</script>

<template>
  <div class="bg-white">
    <!-- Full Screen Hero -->
    <section class="relative h-screen flex flex-col justify-center items-center overflow-hidden bg-lic-dark">
        <!-- Background Image -->
        <div class="absolute inset-0 z-0">
             <img :src="heroImg" alt="Innovation Digitale" class="w-full h-full object-cover opacity-40" />
             <div class="absolute inset-0 bg-gradient-to-b from-lic-dark/90 via-lic-dark/40 to-lic-dark/90"></div>
        </div>

        <!-- Content -->
        <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center flex flex-col justify-center h-full pt-16">
            <h1 class="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight leading-tight">
                L'expertise IT au service de <br class="hidden md:block" />
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-lic-orange to-lic-blue">l'Afrique Digitale</span>
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
            <p class="text-6xl font-black text-lic-orange mb-4">200+</p>
            <p class="text-xl text-gray-300 font-medium uppercase tracking-wider">Projets Réalisés</p>
          </div>
          <div class="p-6 rounded-2xl hover:bg-white/5 transition duration-300">
            <p class="text-6xl font-black text-lic-orange mb-4">98%</p>
            <p class="text-xl text-gray-300 font-medium uppercase tracking-wider">Clients Satisfaits</p>
          </div>
          <div class="p-6 rounded-2xl hover:bg-white/5 transition duration-300">
            <p class="text-6xl font-black text-lic-orange mb-4">15+</p>
            <p class="text-xl text-gray-300 font-medium uppercase tracking-wider">Années d'Expertise</p>
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
    <section class="py-32 bg-gray-50 relative overflow-hidden">
      <!-- Decorative elements -->
      <div class="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-lic-blue/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-lic-orange/10 rounded-full blur-3xl"></div>

      <div class="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div class="text-center max-w-3xl mx-auto mb-20">
          <span class="text-lic-orange font-bold tracking-widest uppercase text-sm mb-4 block">Pourquoi Nous ?</span>
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
