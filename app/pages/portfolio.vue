<script setup>
import licShopImg from '~/assets/projects/lic-shop.png'
import gnawalmaImg from '~/assets/projects/gnawalma.png'
import licFitImg from '~/assets/projects/licfit.png'
</script>

<template>
  <div class="bg-white">
    <PageHeader
      tagline="Nos Réalisations"
      description="Découvrez comment nous avons aidé plus de 200 entreprises à transformer leur infrastructure digitale."
    >
      <template #title>Portfolio</template>
    </PageHeader>
    <!-- Modern Split Hero -->
<!--    <section class="relative bg-lic-dark text-white">-->
<!--        <div class="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-5rem)]">-->
<!--            <div class="relative h-96 lg:h-auto overflow-hidden">-->
<!--                <img-->
<!--                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2015&q=80"-->
<!--                    width="2015"-->
<!--                    height="1510"-->
<!--                    alt="Nos Réalisations"-->
<!--                    class="absolute inset-0 w-full h-full object-cover opacity-60 hover:scale-105 transition-transform duration-700"-->
<!--                />-->
<!--                <div-->
<!--                    class="absolute inset-0 bg-lic-blue/20 mix-blend-multiply"-->
<!--                ></div>-->
<!--            </div>-->
<!--            <div class="flex items-center p-10 lg:p-24 xl:p-32">-->
<!--                <div class="max-w-xl">-->
<!--                    <span-->
<!--                        class="text-lic-orange font-bold tracking-widest uppercase text-sm mb-4 block"-->
<!--                        >Nos Réalisations</span-->
<!--                    >-->
<!--                    <h1-->
<!--                        class="text-5xl md:text-6xl font-black mb-8 leading-tight"-->
<!--                    >-->
<!--                        Portfolio-->
<!--                    </h1>-->
<!--                    <p class="text-lg text-gray-300 leading-relaxed mb-8">-->
<!--                         Découvrez comment nous avons aidé plus de 200 entreprises à transformer leur infrastructure digitale.-->
<!--                    </p>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
<!--    </section>-->

    <!-- Case Studies -->
    <section class="py-24">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="space-y-16">
          <!-- Case Study 1 -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div class="h-80 rounded-lg border-l-4 border-lic-orange overflow-hidden shadow-xl">
              <img :src="licShopImg" width="800" height="600" alt="LIC Shop Case Study" class="w-full h-full object-cover transform hover:scale-105 transition duration-700" />
            </div>
            <div>
              <p class="text-sm font-bold text-lic-orange tracking-widest mb-2">ÉTUDE DE CAS</p>
              <h2 class="text-3xl font-black text-lic-dark mb-4">LIC Shop</h2>
              <p class="text-gray-600 mb-6 leading-relaxed">
                Plateforme e-commerce complète pour le marché sénégalais. Admin Laravel + app mobile Flutter, paiements Wave/OM/COD, notifications et suivi commandes.
              </p>
              <div class="grid grid-cols-2 gap-4 mb-8">
                <div>
                  <p class="text-sm text-gray-500 mb-1">Durée</p>
                  <p class="font-bold text-lic-dark">En cours (MVP)</p>
                </div>
                <div>
                  <p class="text-sm text-gray-500 mb-1">Équipe</p>
                  <p class="font-bold text-lic-dark">Équipe LIC</p>
                </div>
                <div>
                  <p class="text-sm text-gray-500 mb-1">Technos</p>
                  <p class="font-bold text-lic-dark">Laravel 12, Vue 3, Flutter</p>
                </div>
                <div>
                  <p class="text-sm text-gray-500 mb-1">Impact</p>
                  <p class="font-bold text-lic-dark">Paiements mobile money intégrés</p>
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
              <h2 class="text-3xl font-black text-lic-dark mb-4">Gnawalma</h2>
              <p class="text-gray-600 mb-6 leading-relaxed">
                Application mobile pour ateliers de couture, suivi projets/clients, stocks tissus, facturation, offline-first.
              </p>
              <div class="grid grid-cols-2 gap-4 mb-8">
                <div>
                  <p class="text-sm text-gray-500 mb-1">Durée</p>
                  <p class="font-bold text-lic-dark">MVP livré</p>
                </div>
                <div>
                  <p class="text-sm text-gray-500 mb-1">Équipe</p>
                  <p class="font-bold text-lic-dark">Équipe LIC</p>
                </div>
                <div>
                  <p class="text-sm text-gray-500 mb-1">Technos</p>
                  <p class="font-bold text-lic-dark">Flutter, Riverpod, Isar</p>
                </div>
                <div>
                  <p class="text-sm text-gray-500 mb-1">Impact</p>
                  <p class="font-bold text-lic-dark">Digitalisation des ateliers</p>
                </div>
              </div>
              <NuxtLink to="/contact" class="text-lic-blue hover:text-lic-orange font-bold transition">
                Demander une Démo →
              </NuxtLink>
            </div>
            <div class="h-80 rounded-lg border-l-4 border-lic-orange overflow-hidden shadow-xl order-2 md:order-1">
              <img :src="gnawalmaImg" width="800" height="600" alt="Gnawalma Case Study" class="w-full h-full object-cover transform hover:scale-105 transition duration-700" />
            </div>
          </div>

          <!-- Case Study 3 -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div class="h-80 rounded-lg border-l-4 border-lic-orange overflow-hidden shadow-xl">
              <img :src="licFitImg" width="800" height="600" alt="Lic'Fit Case Study" class="w-full h-full object-cover transform hover:scale-105 transition duration-700" />
            </div>
            <div>
              <p class="text-sm font-bold text-lic-orange tracking-widest mb-2">ÉTUDE DE CAS</p>
              <h2 class="text-3xl font-black text-lic-dark mb-4">Lic'Fit</h2>
              <p class="text-gray-600 mb-6 leading-relaxed">
                Gestion des abonnements, check-in QR, maintenance équipements, notifications, mode hors-ligne.
              </p>
              <div class="grid grid-cols-2 gap-4 mb-8">
                <div>
                  <p class="text-sm text-gray-500 mb-1">Durée</p>
                  <p class="font-bold text-lic-dark">Phase spécifications</p>
                </div>
                <div>
                  <p class="text-sm text-gray-500 mb-1">Équipe</p>
                  <p class="font-bold text-lic-dark">Équipe LIC</p>
                </div>
                <div>
                  <p class="text-sm text-gray-500 mb-1">Technos</p>
                  <p class="font-bold text-lic-dark">Mobile, Offline-first, QR</p>
                </div>
                <div>
                  <p class="text-sm text-gray-500 mb-1">Impact</p>
                  <p class="font-bold text-lic-dark">Prêt pour pilotes Dakar</p>
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
