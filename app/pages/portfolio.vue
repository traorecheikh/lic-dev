<script setup>
const projectImg1 = 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' // Finance/Mobile Banking
const projectImg2 = 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' // E-commerce
const projectImg3 = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' // Real Estate
</script>

<template>
  <div class="bg-white">
    <!-- Modern Split Hero -->
    <section class="relative bg-lic-dark text-white">
        <div class="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-5rem)]">
            <div class="relative h-96 lg:h-auto overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2015&q=80"
                    width="2015"
                    height="1510"
                    alt="Nos Réalisations"
                    class="absolute inset-0 w-full h-full object-cover opacity-60 hover:scale-105 transition-transform duration-700"
                />
                <div
                    class="absolute inset-0 bg-lic-blue/20 mix-blend-multiply"
                ></div>
            </div>
            <div class="flex items-center p-10 lg:p-24 xl:p-32">
                <div class="max-w-xl">
                    <span
                        class="text-lic-orange font-bold tracking-widest uppercase text-sm mb-4 block"
                        >Nos Réalisations</span
                    >
                    <h1
                        class="text-5xl md:text-6xl font-black mb-8 leading-tight"
                    >
                        Portfolio
                    </h1>
                    <p class="text-lg text-gray-300 leading-relaxed mb-8">
                         Découvrez comment nous avons aidé plus de 200 entreprises à transformer leur infrastructure digitale.
                    </p>
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
              <img :src="projectImg1" width="800" height="600" alt="Banque Africaine Case Study" class="w-full h-full object-cover transform hover:scale-105 transition duration-700" />
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
              <img :src="projectImg2" width="800" height="600" alt="E-commerce Sénégalais Case Study" class="w-full h-full object-cover transform hover:scale-105 transition duration-700" />
            </div>
          </div>

          <!-- Case Study 3 -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div class="h-80 rounded-lg border-l-4 border-lic-orange overflow-hidden shadow-xl">
              <img :src="projectImg3" width="800" height="600" alt="Startup PropTech Case Study" class="w-full h-full object-cover transform hover:scale-105 transition duration-700" />
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
