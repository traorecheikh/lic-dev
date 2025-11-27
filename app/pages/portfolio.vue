<script setup>
const projectImg1 = 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' // Finance/Mobile Banking
const projectImg2 = 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' // E-commerce
const projectImg3 = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' // Real Estate
</script>

<template>
  <div class="bg-white">
    <!-- Hero -->
    <section class="py-20 bg-lic-light">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <h1 class="text-5xl md:text-6xl font-black text-lic-dark mb-6 tracking-tight">
          Portfolio
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl">
          Découvrez comment nous avons aidé plus de 200 entreprises à transformer leur infrastructure digitale.
        </p>
      </div>
    </section>

    <!-- Stats -->
    <section class="py-16 bg-lic-dark text-white">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <p class="text-5xl font-black text-lic-orange mb-2">200+</p>
            <p class="text-gray-300">Projets Réalisés</p>
          </div>
          <div>
            <p class="text-5xl font-black text-lic-orange mb-2">98%</p>
            <p class="text-gray-300">Clients Satisfaits</p>
          </div>
          <div>
            <p class="text-5xl font-black text-lic-orange mb-2">30 Mrd+ FCFA</p>
            <p class="text-gray-300">Valeur Créée</p>
          </div>
          <div>
            <p class="text-5xl font-black text-lic-orange mb-2">0</p>
            <p class="text-gray-300">Projets Échoués</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Case Studies -->
    <section class="py-24">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="space-y-16">
          <!-- Case Study 1 -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div class="h-80 rounded-lg border-l-4 border-lic-orange overflow-hidden shadow-xl">
              <img :src="projectImg1" alt="Banque Africaine Case Study" class="w-full h-full object-cover transform hover:scale-105 transition duration-700" />
            </div>
            <div>
              <p class="text-sm font-bold text-lic-orange tracking-widest mb-2">ÉTUDE DE CAS</p>
              <h2 class="text-3xl font-black text-lic-dark mb-4">Banque Africaine</h2>
              <p class="text-gray-600 mb-6 leading-relaxed">
                Migration complète de l'infrastructure on-premise vers AWS avec zéro downtime. Augmentation de performance de 300%, réduction des coûts de 40%.
              </p>
              <div class="grid grid-cols-2 gap-4 mb-8">
                <div>
                  <p class="text-sm text-gray-500 mb-1">Durée</p>
                  <p class="font-bold text-lic-dark">6 mois</p>
                </div>
                <div>
                  <p class="text-sm text-gray-500 mb-1">Équipe</p>
                  <p class="font-bold text-lic-dark">12 ingénieurs</p>
                </div>
                <div>
                  <p class="text-sm text-gray-500 mb-1">Technos</p>
                  <p class="font-bold text-lic-dark">AWS, Kubernetes</p>
                </div>
                <div>
                  <p class="text-sm text-gray-500 mb-1">Impact</p>
                  <p class="font-bold text-lic-dark">40% économie</p>
                </div>
              </div>
              <NuxtLink to="/contact" class="text-lic-blue hover:text-lic-orange font-bold transition">
                Demander une Démo →
              </NuxtLink>
            </div>
          </div>

          <!-- Case Study 2 -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p class="text-sm font-bold text-lic-orange tracking-widest mb-2">ÉTUDE DE CAS</p>
              <h2 class="text-3xl font-black text-lic-dark mb-4">E-commerce Sénégalais</h2>
              <p class="text-gray-600 mb-6 leading-relaxed">
                Développement de plateforme e-commerce full-stack avec paiement mobile. Augmentation du chiffre d'affaires de 250% en 12 mois.
              </p>
              <div class="grid grid-cols-2 gap-4 mb-8">
                <div>
                  <p class="text-sm text-gray-500 mb-1">Durée</p>
                  <p class="font-bold text-lic-dark">4 mois</p>
                </div>
                <div>
                  <p class="text-sm text-gray-500 mb-1">Équipe</p>
                  <p class="font-bold text-lic-dark">8 développeurs</p>
                </div>
                <div>
                  <p class="text-sm text-gray-500 mb-1">Technos</p>
                  <p class="font-bold text-lic-dark">React, Node.js</p>
                </div>
                <div>
                  <p class="text-sm text-gray-500 mb-1">Impact</p>
                  <p class="font-bold text-lic-dark">250% croissance</p>
                </div>
              </div>
              <NuxtLink to="/contact" class="text-lic-blue hover:text-lic-orange font-bold transition">
                Demander une Démo →
              </NuxtLink>
            </div>
            <div class="h-80 rounded-lg border-l-4 border-lic-orange overflow-hidden shadow-xl order-2 md:order-1">
              <img :src="projectImg2" alt="E-commerce Sénégalais Case Study" class="w-full h-full object-cover transform hover:scale-105 transition duration-700" />
            </div>
          </div>

          <!-- Case Study 3 -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div class="h-80 rounded-lg border-l-4 border-lic-orange overflow-hidden shadow-xl">
              <img :src="projectImg3" alt="Startup PropTech Case Study" class="w-full h-full object-cover transform hover:scale-105 transition duration-700" />
            </div>
            <div>
              <p class="text-sm font-bold text-lic-orange tracking-widest mb-2">ÉTUDE DE CAS</p>
              <h2 class="text-3xl font-black text-lic-dark mb-4">Startup PropTech</h2>
              <p class="text-gray-600 mb-6 leading-relaxed">
                Développement d'application mobile immobilière avec matching IA. Levée de fonds réussie de 1.2 Mrd FCFA, 50k utilisateurs actifs.
              </p>
              <div class="grid grid-cols-2 gap-4 mb-8">
                <div>
                  <p class="text-sm text-gray-500 mb-1">Durée</p>
                  <p class="font-bold text-lic-dark">5 mois</p>
                </div>
                <div>
                  <p class="text-sm text-gray-500 mb-1">Équipe</p>
                  <p class="font-bold text-lic-dark">10 ingénieurs</p>
                </div>
                <div>
                  <p class="text-sm text-gray-500 mb-1">Technos</p>
                  <p class="font-bold text-lic-dark">Flutter, Python</p>
                </div>
                <div>
                  <p class="text-sm text-gray-500 mb-1">Impact</p>
                  <p class="font-bold text-lic-dark">1.2 Mrd FCFA levés</p>
                </div>
              </div>
              <NuxtLink to="/contact" class="text-lic-blue hover:text-lic-orange font-bold transition">
                Demander une Démo →
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Showcased -->
    <section class="py-24 bg-lic-light">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 class="text-4xl font-black text-lic-dark mb-16 tracking-tight text-center">
          Services Utilisés dans Nos Projets
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="bg-white p-8 rounded-lg border-t-4 border-lic-blue text-center">
            <h3 class="font-black text-lic-dark mb-3">Formation</h3>
            <p class="text-gray-600 text-sm">Upskilling des équipes clients pour maintenance autonome.</p>
          </div>

          <div class="bg-white p-8 rounded-lg border-t-4 border-lic-blue text-center">
            <h3 class="font-black text-lic-dark mb-3">Développement</h3>
            <p class="text-gray-600 text-sm">Développement entier de solutions custom et innovantes.</p>
          </div>

          <div class="bg-white p-8 rounded-lg border-t-4 border-lic-blue text-center">
            <h3 class="font-black text-lic-dark mb-3">Cloud & DevOps</h3>
            <p class="text-gray-600 text-sm">Migration et infrastructure cloud hautement performante.</p>
          </div>

          <div class="bg-white p-8 rounded-lg border-t-4 border-lic-blue text-center">
            <h3 class="font-black text-lic-dark mb-3">Conseil</h3>
            <p class="text-gray-600 text-sm">Guidage stratégique et optimisation continue.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Industries -->
    <section class="py-24">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 class="text-4xl font-black text-lic-dark mb-16 tracking-tight text-center">
          Industries Servis
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-lic-light p-8 rounded-lg text-center">
            <h3 class="text-2xl font-black text-lic-dark mb-2">Finance</h3>
            <p class="text-gray-600">Banques, fintech, assurance avec compliance stricte</p>
          </div>

          <div class="bg-lic-light p-8 rounded-lg text-center">
            <h3 class="text-2xl font-black text-lic-dark mb-2">E-commerce</h3>
            <p class="text-gray-600">Retail en ligne, marketplaces, paiement mobile</p>
          </div>

          <div class="bg-lic-light p-8 rounded-lg text-center">
            <h3 class="text-2xl font-black text-lic-dark mb-2">Santé</h3>
            <p class="text-gray-600">Plateformes médicales, telemedicine, données patient</p>
          </div>

          <div class="bg-lic-light p-8 rounded-lg text-center">
            <h3 class="text-2xl font-black text-lic-dark mb-2">Éducation</h3>
            <p class="text-gray-600">Plateformes d'apprentissage, LMS, MOOC</p>
          </div>

          <div class="bg-lic-light p-8 rounded-lg text-center">
            <h3 class="text-2xl font-black text-lic-dark mb-2">Immobilier</h3>
            <p class="text-gray-600">PropTech, gestion immobilière, courtage</p>
          </div>

          <div class="bg-lic-light p-8 rounded-lg text-center">
            <h3 class="text-2xl font-black text-lic-dark mb-2">Logistique</h3>
            <p class="text-gray-600">Supply chain, tracking, management</p>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>
